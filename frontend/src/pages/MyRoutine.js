import React, { useState } from 'react';
import { Send, Sparkles, Edit2 } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import './MyRoutine.css';

const MyRoutine = () => {
  const [activeTab, setActiveTab] = useState('generator');
  const [message, setMessage] = useState('');

  const routines = [
    {
      title: 'Morning Routine',
      time: '07:00 AM',
      steps: [
        { number: 1, name: 'Cleanser', product: 'CeraVe Hydrating Cle' },
        { number: 2, name: 'Vitamin C Serum', product: 'The Ordinary Vitamin' },
        { number: 3, name: 'Moisturizer', product: 'Neutrogena Hydro Bo' },
        { number: 4, name: 'Sunscreen', product: 'La Roche-Posay Anth' },
      ],
    },
    {
      title: 'Evening Routine',
      time: '09:00 PM',
      steps: [
        { number: 1, name: 'Oil Cleanser', product: 'DHC Deep Cleansing' },
        { number: 2, name: 'Water Cleanser', product: 'CeraVe Hydrating Cle' },
        { number: 3, name: 'Retinol Serum', product: 'The Ordinary Retinol' },
        { number: 4, name: 'Night Cream', product: 'CeraVe PM Facial Mo' },
      ],
    },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

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
          <Sparkles size={18} />
          Smart Routine Generator
        </button>
      </div>

      {activeTab === 'generator' && (
        <Card padding="lg" className="ai-chat-container">
          <div className="ai-assistant">
            <div className="assistant-avatar">
              <Sparkles size={24} />
            </div>
            <div className="assistant-message">
              <h3>ComplexionAI Assistant</h3>
              <p>
                Hello! I'm your AI skincare assistant. I can help you create
                personalized routines based on your skin type, concerns, and goals.
              </p>
              <p className="assistant-prompt">
                What would you like help with today?
              </p>
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="chat-input-container">
            <input
              type="text"
              placeholder="Ask me anything about skincare routines..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="chat-input"
            />
            <Button type="submit" variant="primary" icon={<Send size={18} />}>
              Send
            </Button>
          </form>
        </Card>
      )}

      {activeTab === 'view' && (
        <div className="routines-list">
          {routines.map((routine, index) => (
            <Card key={index} padding="lg" className="routine-detail-card">
              <div className="routine-detail-header">
                <div>
                  <h2>{routine.title}</h2>
                  <p className="routine-time">{routine.time}</p>
                </div>
                <Button variant="outline" icon={<Edit2 size={18} />}>
                  Edit
                </Button>
              </div>

              <div className="routine-steps-list">
                {routine.steps.map((step) => (
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
                <Button variant="primary">Save</Button>
                <Button variant="ghost">Delete</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRoutine;
