import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Edit2 } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { chatRoutine } from '../lib/api';
import './MyRoutine.css';

const DEFAULT_ROUTINES = [
  {
    id: 1,
    title: 'Morning Routine',
    time: '07:00 AM',
    steps: [
      { number: 1, name: 'Cleanser', product: 'CeraVe Hydrating Cleanser' },
      { number: 2, name: 'Vitamin C Serum', product: 'The Ordinary Vitamin C 23%' },
      { number: 3, name: 'Moisturizer', product: 'Neutrogena Hydro Boost' },
      { number: 4, name: 'Sunscreen', product: 'La Roche-Posay Anthelios SPF 50' },
    ],
  },
  {
    id: 2,
    title: 'Evening Routine',
    time: '09:00 PM',
    steps: [
      { number: 1, name: 'Oil Cleanser', product: 'DHC Deep Cleansing Oil' },
      { number: 2, name: 'Water Cleanser', product: 'CeraVe Hydrating Cleanser' },
      { number: 3, name: 'Retinol Serum', product: 'The Ordinary Retinol 0.5%' },
      { number: 4, name: 'Night Cream', product: 'CeraVe PM Facial Moisturizer' },
    ],
  },
];

const STORAGE_KEY = 'complexionai_routines';

const INITIAL_MESSAGE = {
  role: 'assistant',
  text: "Hello! I'm your AI skincare assistant. I can help you create personalised routines based on your skin type, concerns, and goals. What would you like help with today?",
  routine: null,
};

export default function MyRoutine() {
  const [activeTab, setActiveTab] = useState('view');

  const [routines, setRoutines] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_ROUTINES;
    } catch {
      return DEFAULT_ROUTINES;
    }
  });

  const [savedId, setSavedId] = useState(null);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(routines));
  }, [routines]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function deleteRoutine(id) {
    setRoutines(prev => prev.filter(r => r.id !== id));
  }

  function saveRoutine(id) {
    setSavedId(id);
    setTimeout(() => setSavedId(null), 2000);
  }

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setLoading(true);

    try {
      const data = await chatRoutine(text);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: data.reply, routine: data.routine ?? null },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: 'Sorry, something went wrong. Please try again.', routine: null },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="my-routine">
      <div className="page-header">
        <div>
          <h1>My Routine</h1>
          <p className="page-subtitle">View your routines or generate new ones with AI</p>
        </div>
      </div>

      <div className="routine-tabs">
        <button
          className={`tab ${activeTab === 'view' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('view')}
        >
          View Made Routines
        </button>
        <button
          className={`tab ${activeTab === 'generator' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('generator')}
        >
          <Sparkles size={15} />
          Smart Routine Generator
        </button>
      </div>

      {activeTab === 'view' && (
        <div className="routines-list">
          {routines.length === 0 && (
            <p className="routines-empty">
              No routines yet. Use the Smart Routine Generator to create one.
            </p>
          )}
          {routines.map(routine => (
            <Card key={routine.id} padding="lg" className="routine-detail-card">
              <div className="routine-detail-header">
                <div>
                  <h2>{routine.title}</h2>
                  <p className="routine-time">{routine.time}</p>
                </div>
                <Button variant="outline" size="sm" icon={<Edit2 size={15} />}>
                  Edit
                </Button>
              </div>

              <div className="routine-steps-list">
                {routine.steps.map(step => (
                  <div key={step.number} className="routine-step">
                    <div className="step-number">{step.number}</div>
                    <div className="step-info">
                      <h4>{step.name}</h4>
                      <p>{step.product}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="routine-actions">
                <Button variant="primary" size="sm" onClick={() => saveRoutine(routine.id)}>
                  {savedId === routine.id ? 'Saved ✓' : 'Save'}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deleteRoutine(routine.id)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'generator' && (
        <Card padding="lg" className="ai-chat-container">
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message chat-message-${msg.role}`}>
                {msg.role === 'assistant' && (
                  <div className="chat-avatar"><Sparkles size={16} /></div>
                )}
                <div className="chat-bubble">
                  <p>{msg.text}</p>
                  {msg.routine && (
                    <div className="generated-routine">
                      <p className="generated-routine-title">{msg.routine.title}</p>
                      {msg.routine.steps.map(step => (
                        <div key={step.number} className="routine-step">
                          <div className="step-number">{step.number}</div>
                          <div className="step-info">
                            <h4>{step.name}</h4>
                            <p>{step.product_suggestion}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="chat-message chat-message-assistant">
                <div className="chat-avatar"><Sparkles size={16} /></div>
                <div className="chat-bubble chat-bubble-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSend} className="chat-input-container">
            <input
              type="text"
              placeholder="Ask me anything about skincare routines..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="chat-input"
              disabled={loading}
            />
            <Button type="submit" variant="primary" icon={<Send size={16} />} disabled={loading || !input.trim()}>
              Send
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
