import { useState, useEffect } from "react";
import './FeedbackModal.css';

interface FeedbackModalProps { open: boolean; onClose: () => void; }

const STORAGE_KEY = "btl-arnak-zchuyot-v2-feedback";
const APP_NAME = "ארנק זכויות v2";
const SHEET_URL = "https://script.google.com/macros/s/AKfycbwD8CMFoP5XoOwRLwK_OxMMOFKF8fS2CRpbJkNdOHjbnJIepkOLzlGrg3GQNGRqbwB6bA/exec";
const NAME_KEY = "btl-arnak-zchuyot-v2-feedback-user-name";

type Category = "🐛 באג" | "💡 שיפור" | "📊 נתונים" | "🎨 עיצוב";
type Severity = "קריטי" | "שיפור" | "קטן";

interface FeedbackEntry {
  id: number; name: string; category: Category | ""; severity: Severity | "";
  text: string; timestamp: string; sent: boolean;
}

async function sendToSheet(entry: FeedbackEntry, page: string): Promise<boolean> {
  try {
    await fetch(SHEET_URL, {
      method: "POST", mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        app: APP_NAME, name: entry.name || "אנונימי",
        category: entry.category || "כללי", severity: entry.severity || "—",
        text: entry.text, page,
      }),
    });
    return true;
  } catch { return false; }
}

export function FeedbackModal({ open, onClose }: FeedbackModalProps) {
  const [name, setName] = useState(() => localStorage.getItem(NAME_KEY) || "");
  const [category, setCategory] = useState<Category | "">("");
  const [severity, setSeverity] = useState<Severity | "">("");
  const [text, setText] = useState("");
  const [items, setItems] = useState<FeedbackEntry[]>([]);
  const [sending, setSending] = useState(false);
  const [lastStatus, setLastStatus] = useState<"" | "ok" | "offline">("");

  useEffect(() => { const s = localStorage.getItem(STORAGE_KEY); if (s) setItems(JSON.parse(s)); }, [open]);

  useEffect(() => {
    if (!open) return;
    const unsent = items.filter((i) => !i.sent);
    if (!unsent.length) return;
    Promise.all(unsent.map((i) => sendToSheet(i, window.location.pathname))).then((r) => {
      save(items.map((item) => {
        const idx = unsent.findIndex((u) => u.id === item.id);
        return idx >= 0 && r[idx] ? { ...item, sent: true } : item;
      }));
    });
  }, [open]);

  const save = (u: FeedbackEntry[]) => { setItems(u); localStorage.setItem(STORAGE_KEY, JSON.stringify(u)); };

  const handleSubmit = async () => {
    if (!text.trim() || !name.trim()) return;
    localStorage.setItem(NAME_KEY, name.trim());
    setSending(true); setLastStatus("");
    const entry: FeedbackEntry = {
      id: Date.now(), name: name.trim(), category, severity,
      text: text.trim(), timestamp: new Date().toISOString(), sent: false,
    };
    const ok = await sendToSheet(entry, window.location.pathname);
    entry.sent = ok;
    save([entry, ...items]);
    setCategory(""); setSeverity(""); setText("");
    setSending(false); setLastStatus(ok ? "ok" : "offline");
    setTimeout(() => setLastStatus(""), 3000);
  };

  if (!open) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content feedback-modal" onClick={(e) => e.stopPropagation()} dir="rtl" role="dialog" aria-modal="true" aria-labelledby="feedback-title">
        <div className="feedback-modal__header">
          <h2 id="feedback-title">💬 משוב פיילוט</h2>
          <button className="feedback-modal__close" onClick={onClose} aria-label="סגור">✕</button>
        </div>

        <div className="feedback-modal__body">
          <div className="feedback-modal__field">
            <label htmlFor="feedback-name">שם</label>
            <input id="feedback-name" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="השם שלך" />
          </div>

          <div className="feedback-modal__field">
            <p className="feedback-modal__field-label">קטגוריה</p>
            <div className="feedback-modal__chips">
              {(["🐛 באג", "💡 שיפור", "📊 נתונים", "🎨 עיצוב"] as Category[]).map((c) => (
                <button key={c} onClick={() => setCategory(category === c ? "" : c)}
                  className={`feedback-modal__chip ${category === c ? 'feedback-modal__chip--active' : ''}`}>{c}</button>
              ))}
            </div>
          </div>

          <div className="feedback-modal__field">
            <p className="feedback-modal__field-label">חומרה</p>
            <div className="feedback-modal__chips">
              {(["קריטי", "שיפור", "קטן"] as Severity[]).map((s) => (
                <button key={s} onClick={() => setSeverity(severity === s ? "" : s)}
                  className={`feedback-modal__chip feedback-modal__chip--${s === 'קריטי' ? 'error' : s === 'שיפור' ? 'warning' : 'success'} ${severity === s ? 'feedback-modal__chip--active' : ''}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="feedback-modal__field">
            <label htmlFor="feedback-text">תיאור</label>
            <textarea id="feedback-text" className="textarea" value={text} onChange={(e) => setText(e.target.value)} placeholder="תאר את המשוב..." />
          </div>

          <button className="btn btn-primary feedback-modal__submit" onClick={handleSubmit} disabled={!text.trim() || !name.trim() || sending}>
            {sending ? "שולח..." : "שלח משוב"}
          </button>
          {lastStatus === "ok" && <p className="feedback-modal__status feedback-modal__status--ok">✅ נשלח בהצלחה</p>}
          {lastStatus === "offline" && <p className="feedback-modal__status feedback-modal__status--offline">📱 נשמר מקומית — יישלח כשיהיה חיבור</p>}

          {items.length > 0 && (
            <div className="feedback-modal__history">
              <div className="feedback-modal__history-header">
                <span>{items.length} משובים</span>
                <button className="feedback-modal__clear" onClick={() => save([])}>מחק הכל</button>
              </div>
              <div className="feedback-modal__history-list">
                {items.slice(0, 5).map((fb) => (
                  <div key={fb.id} className="feedback-modal__history-item">
                    <div className="feedback-modal__history-meta">
                      {fb.category && <span className="badge badge-primary">{fb.category}</span>}
                      {fb.sent ? <span className="badge badge-success">✅</span> : <span className="badge badge-warning">⏳</span>}
                      <span className="feedback-modal__history-date">{fb.name} · {new Date(fb.timestamp).toLocaleString("he-IL")}</span>
                    </div>
                    <p>{fb.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
