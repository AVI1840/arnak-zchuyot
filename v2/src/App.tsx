import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import Index from './pages/Index';
import { FeedbackModal } from './components/FeedbackModal';

function App() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <BrowserRouter basename="/arnak-zchuyot/v2">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<Index />} />
      </Routes>

      {/* Floating Feedback Button */}
      <button
        onClick={() => setFeedbackOpen(true)}
        className="feedback-fab"
        aria-label="משוב פיילוט"
      >
        <MessageCircle size={20} />
        <span className="feedback-fab__text">משוב פיילוט</span>
      </button>
      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </BrowserRouter>
  );
}

export default App;
