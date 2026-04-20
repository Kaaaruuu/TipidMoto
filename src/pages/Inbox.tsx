import React, { useState } from 'react';
import './Inbox.css';

interface Message {
  id: string;
  sender: 'me' | 'them';
  content: string;
  timestamp: string;
  type?: 'text' | 'offer';
  offerAmount?: number;
}

interface Thread {
  id: string;
  userName: string;
  userAvatar: string;
  userTrust: number;
  lastMessage: string;
  timestamp: string;
  isUnread: boolean;
  listingTitle: string;
  listingPrice: number;
  listingImage: string;
  messages: Message[];
}

/**
 * MOCK_THREADS - Seed data for the Inbox.
 */
const MOCK_THREADS: Thread[] = [
  {
    id: '1',
    userName: 'Rico "The Rider"',
    userAvatar: 'RR',
    userTrust: 142,
    lastMessage: 'Is the price negotiable?',
    timestamp: '9:41 AM',
    isUnread: true,
    listingTitle: 'Stock NMAX v2 Exhaust',
    listingPrice: 3200,
    listingImage: '⚙️',
    messages: [
      { id: 'm1', sender: 'them', content: 'Boss, available pa filter?', timestamp: '9:30 AM' },
      { id: 'm2', sender: 'me', content: 'Yes boss, available pa po. PM is key.', timestamp: '9:32 AM' },
      { id: 'm3', sender: 'them', content: 'Is the price negotiable?', timestamp: '9:41 AM', type: 'text' },
      { id: 'm4', sender: 'them', content: 'Sent an offer', timestamp: '9:42 AM', type: 'offer', offerAmount: 2800 }
    ]
  },
  {
    id: '2',
    userName: 'Vince Moto',
    userAvatar: 'VM',
    userTrust: 89,
    lastMessage: 'Got the item. Thanks!',
    timestamp: 'Yesterday',
    isUnread: false,
    listingTitle: 'Original RCB Lever',
    listingPrice: 1800,
    listingImage: '⚙️',
    messages: [
      { id: 'm1', sender: 'me', content: 'Arrived at the meetup spot.', timestamp: 'Yesterday' },
      { id: 'm2', sender: 'them', content: 'Got the item. Thanks!', timestamp: 'Yesterday' }
    ]
  }
];

/**
 * Inbox & Chat Page - Real-time communication for negotiations and trust.
 */
const Inbox: React.FC = () => {
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('All');
  const [inputText, setInputText] = useState('');

  const selectedThread = MOCK_THREADS.find(t => t.id === selectedThreadId);

  return (
    <div className="inbox-page">
      
      {/* LEFT: Conversation List */}
      <aside className="inbox-list">
        <div className="inbox-list__header">
          <h1 className="inbox-title">Inbox</h1>
          <nav className="inbox-tabs">
            {['All', 'Buying', 'Selling'].map(tab => (
              <button 
                key={tab}
                className={`inbox-tab ${activeTab === tab ? 'is-active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="inbox-threads">
          {MOCK_THREADS.map(thread => (
            <div 
              key={thread.id}
              className={`thread-item ${selectedThreadId === thread.id ? 'is-selected' : ''} ${thread.isUnread ? 'is-unread' : ''}`}
              onClick={() => setSelectedThreadId(thread.id)}
            >
              <div className="thread-avatar">{thread.userAvatar}</div>
              <div className="thread-content">
                <div className="thread-top">
                  <span className="thread-name">{thread.userName}</span>
                  <span className="thread-time">{thread.timestamp}</span>
                </div>
                <div className="thread-preview">
                  {thread.lastMessage}
                  {thread.isUnread && <span className="unread-dot" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* RIGHT: Active Chat Thread */}
      <section className={`chat-window ${selectedThread ? 'is-open' : ''}`}>
        {selectedThread ? (
          <>
            {/* Chat Header */}
            <header className="chat-header">
              <button className="chat-header__back" onClick={() => setSelectedThreadId(null)}>‹</button>
              <div className="chat-avatar" style={{ 
                width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--ash)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontBold: 700 
              }}>
                {selectedThread.userAvatar}
              </div>
              <div className="chat-header__info">
                <div>
                  <div className="chat-header__name">{selectedThread.userName}</div>
                  <div className="body-xs" style={{ color: 'var(--green)', fontWeight: 700 }}>
                    TRUST SCORE: +{selectedThread.userTrust}
                  </div>
                </div>
              </div>
            </header>

            {/* Listing Context Card */}
            <div className="listing-context">
              <div className="listing-context__thumb">{selectedThread.listingImage}</div>
              <div className="listing-context__info">
                <div className="listing-context__title">{selectedThread.listingTitle}</div>
                <div className="listing-context__price">₱{selectedThread.listingPrice.toLocaleString()}</div>
              </div>
              <button className="btn btn-sm btn-ghost" style={{ fontSize: 11 }}>View Listing</button>
            </div>

            {/* Message History */}
            <div className="chat-messages">
              {selectedThread.messages.map(msg => (
                <React.Fragment key={msg.id}>
                  {msg.type === 'offer' ? (
                    <div className="offer-bubble">
                      <span className="offer-header">Incoming Offer</span>
                      <div className="offer-amount">₱{msg.offerAmount?.toLocaleString()}</div>
                      <div className="offer-actions">
                        <button className="btn btn-sm btn-primary">Accept</button>
                        <button className="btn btn-sm btn-ghost" style={{ border: '1px solid var(--ash)' }}>Decline</button>
                      </div>
                    </div>
                  ) : (
                    <div className={`message-group ${msg.sender === 'me' ? 'sent' : ''}`}>
                      <div className={`bubble bubble-${msg.sender === 'me' ? 'sent' : 'received'}`}>
                        {msg.content}
                        <div className="message-time">{msg.timestamp}</div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Composer Footer */}
            <footer className="chat-footer">
              <div className="quick-replies">
                {['Is this available?', 'Last price?', 'Where meet up?', 'Legit Partner?'].map(reply => (
                  <button 
                    key={reply} 
                    className="reply-pill"
                    onClick={() => setInputText(reply)}
                  >
                    {reply}
                  </button>
                ))}
              </div>
              <div className="composer">
                <input 
                  type="text" 
                  className="composer-input" 
                  placeholder="Type a message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <button className="btn btn-primary composer-send">Send</button>
              </div>
            </footer>
          </>
        ) : (
          <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--stone)' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: 48, display: 'block', marginBottom: 16 }}>💬</span>
              <p className="body-md">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Inbox;
