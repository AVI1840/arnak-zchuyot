import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Shield, ArrowRight, FileText, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CrossMinistrySearch } from '@/components/CrossMinistrySearch';
import { getEligibleRights, BenefitType, BENEFIT_LABELS, DOMAIN_LABELS, RightWithScore } from '@/data/rightsDatabase';
import { UserMetrics, DEFAULT_METRICS } from '@/types/userProfile';
import { Link } from 'react-router-dom';

interface Message {
  id: number;
  role: 'user' | 'agent';
  text: string;
  timestamp: Date;
}

interface DetectedProfile {
  benefits: BenefitType[];
  metrics: UserMetrics;
  description: string;
}

// Simple NLP-like pattern matching to detect benefits from free text
function detectProfileFromText(text: string): DetectedProfile {
  const lower = text.toLowerCase();
  const benefits: BenefitType[] = [];
  const metrics: UserMetrics = { ...DEFAULT_METRICS };

  // Detect benefits
  if (lower.includes('זקנה') || lower.includes('אזרח ותיק') || lower.includes('פנסי') || /בן\s*[67]\d|בת\s*[67]\d|גיל\s*[67]\d/.test(lower)) {
    benefits.push('old_age');
  }
  if (lower.includes('השלמת הכנסה') || lower.includes('השלמה')) {
    benefits.push('old_age_income_support');
    metrics.is_income_support = true;
  }
  if (lower.includes('נכות כללית') || lower.includes('נכות') || lower.includes('נכה')) {
    benefits.push('general_disability');
  }
  if (lower.includes('סיעוד') || lower.includes('סיעודי')) {
    benefits.push('nursing');
  }
  if (lower.includes('ניידות') || lower.includes('כיסא גלגלים') || lower.includes('מוגבל בניידות')) {
    benefits.push('mobility');
  }
  if (lower.includes('שירותים מיוחדים')) {
    benefits.push('special_services');
  }
  if (lower.includes('ילד נכה') || lower.includes('ילד עם מוגבלות')) {
    benefits.push('child_disability');
  }
  if (lower.includes('נכות מעבודה') || lower.includes('תאונת עבודה') || lower.includes('פגיעה בעבודה')) {
    benefits.push('work_injury');
  }
  if (lower.includes('שארים') || lower.includes('אלמנ')) {
    benefits.push('survivors');
  }
  if (lower.includes('איבה') || lower.includes('טרור') || lower.includes('נפגע')) {
    benefits.push('terror_victim');
  }
  if (lower.includes('הבטחת הכנסה')) {
    benefits.push('income_support');
    metrics.is_income_support = true;
  }
  if (lower.includes('מזונות')) {
    benefits.push('alimony');
  }

  // Detect metrics from text
  const disabilityMatch = lower.match(/(\d+)\s*%\s*נכות|נכות\s*(?:רפואית\s*)?(\d+)|(\d+)\s*אחוז/);
  if (disabilityMatch) {
    const pct = parseInt(disabilityMatch[1] || disabilityMatch[2] || disabilityMatch[3]);
    if (pct > 0) {
      metrics.medical_disability_pct = pct;
      if (pct >= 75) metrics.incapacity_pct = 75;
    }
  }

  const ageMatch = lower.match(/בן\s*(\d+)|בת\s*(\d+)|גיל\s*(\d+)/);
  if (ageMatch) {
    metrics.age = parseInt(ageMatch[1] || ageMatch[2] || ageMatch[3]);
  }

  // Default: if nothing detected, add general_disability
  if (benefits.length === 0) {
    benefits.push('general_disability');
  }

  const description = benefits.map(b => BENEFIT_LABELS[b]).join(', ');

  return { benefits, metrics, description };
}

function generateFollowUpQuestion(profile: DetectedProfile): string | null {
  if (profile.benefits.includes('general_disability') && profile.metrics.medical_disability_pct === 0) {
    return 'מהו אחוז הנכות הרפואית שנקבע לך?';
  }
  if (profile.benefits.includes('old_age') && !profile.metrics.is_income_support) {
    return 'האם אתה מקבל השלמת הכנסה?';
  }
  if (profile.benefits.includes('nursing') && profile.metrics.nursing_level === 0) {
    return 'מהי רמת גמלת הסיעוד שנקבעה לך? (1-6)';
  }
  return null;
}

function processFollowUp(text: string, profile: DetectedProfile): DetectedProfile {
  const lower = text.toLowerCase();
  const updated = { ...profile, metrics: { ...profile.metrics } };

  // Check for disability percentage
  const pctMatch = lower.match(/(\d+)/);
  if (pctMatch) {
    const num = parseInt(pctMatch[1]);
    if (num >= 40 && num <= 100) {
      updated.metrics.medical_disability_pct = num;
      if (num >= 75) updated.metrics.incapacity_pct = 75;
    }
    if (num >= 1 && num <= 6) {
      updated.metrics.nursing_level = num;
    }
  }

  if (lower.includes('כן') || lower.includes('מקבל')) {
    updated.metrics.is_income_support = true;
    if (!updated.benefits.includes('old_age_income_support') && updated.benefits.includes('old_age')) {
      updated.benefits.push('old_age_income_support');
    }
  }

  return updated;
}

export default function AgentDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [profile, setProfile] = useState<DetectedProfile | null>(null);
  const [showScan, setShowScan] = useState(false);
  const [results, setResults] = useState<RightWithScore[]>([]);
  const [awaitingFollowUp, setAwaitingFollowUp] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    setTimeout(() => {
      setMessages([{
        id: 1,
        role: 'agent',
        text: 'שלום! אני סוכן מיצוי הזכויות של ביטוח לאומי. ספר לי על המצב שלך — אילו קצבאות אתה מקבל, מה הגיל, אחוזי נכות — ואמצא לך את כל הזכויות שמגיעות לך.',
        timestamp: new Date(),
      }]);
    }, 500);
  }, []);

  const addAgentMessage = useCallback((text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: 'agent',
        text,
        timestamp: new Date(),
      }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      text: input.trim(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    const userText = input.trim();
    setInput('');

    if (awaitingFollowUp && profile) {
      // Process follow-up answer
      const updated = processFollowUp(userText, profile);
      setProfile(updated);
      setAwaitingFollowUp(false);

      // Check if more questions needed
      const nextQ = generateFollowUpQuestion(updated);
      if (nextQ) {
        addAgentMessage(nextQ);
        setAwaitingFollowUp(true);
      } else {
        addAgentMessage(`מצוין! זיהיתי: ${updated.benefits.map(b => BENEFIT_LABELS[b]).join(', ')}. מתחיל סריקה רוחבית בין משרדי ממשלה...`);
        setTimeout(() => setShowScan(true), 2000);
      }
    } else {
      // First message — detect profile
      const detected = detectProfileFromText(userText);
      setProfile(detected);

      const followUp = generateFollowUpQuestion(detected);
      if (followUp) {
        addAgentMessage(`זיהיתי: ${detected.description}. שאלה אחת נוספת: ${followUp}`);
        setAwaitingFollowUp(true);
      } else {
        addAgentMessage(`זיהיתי: ${detected.description}. מתחיל סריקה רוחבית...`);
        setTimeout(() => setShowScan(true), 2000);
      }
    }
  };

  const handleScanComplete = () => {
    setShowScan(false);
    if (profile) {
      const rights = getEligibleRights(profile.benefits, profile.metrics);
      setResults(rights);
      addAgentMessage(`נמצאו ${rights.length} זכויות עבורך! ${rights.filter(r => r.is_automatic).length} מתוכן אוטומטיות — ניתנות ללא פנייה.`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Demo scenario
  const runDemo = () => {
    setMessages([]);
    setResults([]);
    setProfile(null);
    setShowScan(false);
    setAwaitingFollowUp(false);

    setTimeout(() => {
      setMessages([{
        id: 1, role: 'agent',
        text: 'שלום! אני סוכן מיצוי הזכויות. ספר לי על המצב שלך.',
        timestamp: new Date(),
      }]);
    }, 300);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: 2, role: 'user',
        text: 'אני בן 70, מקבל קצבת זקנה, יש לי 80% נכות רפואית, גר בדירה שכורה',
        timestamp: new Date(),
      }]);
    }, 1500);

    setTimeout(() => {
      const detected = detectProfileFromText('אני בן 70, מקבל קצבת זקנה, יש לי 80% נכות רפואית, גר בדירה שכורה');
      setProfile(detected);
      setMessages(prev => [...prev, {
        id: 3, role: 'agent',
        text: 'זיהיתי: אזרח ותיק + נכות כללית (80%). שאלה אחת: האם אתה מקבל השלמת הכנסה?',
        timestamp: new Date(),
      }]);
      setAwaitingFollowUp(true);
    }, 3000);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: 4, role: 'user',
        text: 'כן, מקבל השלמת הכנסה',
        timestamp: new Date(),
      }]);
    }, 5000);

    setTimeout(() => {
      const finalProfile: DetectedProfile = {
        benefits: ['old_age', 'old_age_income_support', 'general_disability'],
        metrics: { ...DEFAULT_METRICS, age: 70, medical_disability_pct: 80, incapacity_pct: 75, is_income_support: true },
        description: 'אזרח ותיק + השלמת הכנסה + נכות כללית',
      };
      setProfile(finalProfile);
      setAwaitingFollowUp(false);
      setMessages(prev => [...prev, {
        id: 5, role: 'agent',
        text: 'מצוין! מתחיל סריקה רוחבית בין משרדי ממשלה, רשויות מקומיות, קופות חולים...',
        timestamp: new Date(),
      }]);
    }, 6500);

    setTimeout(() => setShowScan(true), 8000);
  };

  if (showScan) {
    return (
      <div className="min-h-screen bg-background">
        <CrossMinistrySearch onComplete={handleScanComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1B3A5C] text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold">סוכן מיצוי 360</p>
              <p className="text-xs opacity-80">One Gov AI Agent</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={runDemo} variant="outline" size="sm" className="text-white border-white/40 bg-white/10 hover:bg-white/20 hover:text-white gap-1">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">הרץ דמו</span>
            </Button>
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 gap-1">
                <ArrowRight className="w-4 h-4" />
                <span className="hidden sm:inline">כלי הזכויות</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-3xl mx-auto w-full">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'agent' ? 'bg-secondary text-white' : 'bg-muted text-muted-foreground'
              }`}>
                {msg.role === 'agent' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === 'agent'
                  ? 'bg-card border border-border shadow-sm'
                  : 'bg-secondary text-white'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-card border border-border rounded-2xl px-4 py-3 shadow-sm">
              <motion.div className="flex gap-1" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <span className="w-2 h-2 bg-muted-foreground rounded-full" />
                <span className="w-2 h-2 bg-muted-foreground rounded-full" />
                <span className="w-2 h-2 bg-muted-foreground rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-card border rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-secondary">{results.length}</p>
                <p className="text-xs text-muted-foreground">זכויות נמצאו</p>
              </div>
              <div className="bg-card border rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-emerald-600">{results.filter(r => r.is_automatic).length}</p>
                <p className="text-xs text-muted-foreground">אוטומטיות</p>
              </div>
              <div className="bg-card border rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-amber-600">{results.filter(r => !r.is_automatic).length}</p>
                <p className="text-xs text-muted-foreground">דורשות פנייה</p>
              </div>
              <div className="bg-card border rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-primary">~₪{Math.round(results.reduce((s, r) => s + (r.estimated_value || 0), 0) / 1000)}K</p>
                <p className="text-xs text-muted-foreground">חיסכון שנתי</p>
              </div>
            </div>

            <div className="space-y-2">
              {results.slice(0, 10).map((right) => (
                <motion.div
                  key={right.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card border border-border rounded-xl p-4 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-sm text-foreground">{right.title}</h4>
                    <Badge variant="outline" className={`shrink-0 text-xs ${right.is_automatic ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-amber-50 text-amber-700 border-amber-300'}`}>
                      {right.is_automatic ? '✓ אוטומטית' : '📝 דורשת הגשה'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{right.provider} • {DOMAIN_LABELS[right.domain]}</p>
                  {/* Explainability */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-700">
                      <span className="font-medium">למה נמצאה:</span> {right.eligibility_details.split('\n')[0].slice(0, 80)}
                    </p>
                  </div>
                  {!right.is_automatic && (
                    <div className="flex items-center gap-2 pt-1">
                      <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">נדרש: {right.how_to_apply.split('\n')[0].slice(0, 60)}...</p>
                    </div>
                  )}
                </motion.div>
              ))}
              {results.length > 10 && (
                <p className="text-center text-sm text-muted-foreground pt-2">
                  + עוד {results.length - 10} זכויות נוספות
                </p>
              )}
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {results.length === 0 && (
        <div className="sticky bottom-0 bg-background border-t border-border p-4">
          <div className="max-w-3xl mx-auto flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ספר לי על המצב שלך..."
              className="flex-1 rounded-full border border-border bg-card px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary text-right"
              dir="rtl"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              size="icon"
              className="rounded-full w-11 h-11 bg-secondary hover:bg-secondary/90"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
