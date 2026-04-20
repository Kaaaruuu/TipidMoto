import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import './LegitPartner.css';

/**
 * Benefits of becoming a Legit Partner.
 */
const BENEFITS = [
  {
    title: "The Gold Badge",
    desc: "Stand out from the crowd with a premium ⬡ symbol on every listing.",
    icon: "⬡"
  },
  {
    title: "Instant Buyer Trust",
    desc: "Verified status reduces negotiation friction and builds immediate credibility.",
    icon: "🛡️"
  },
  {
    title: "Priority Placement",
    desc: "Your listings appear higher in search results and category feeds.",
    icon: "⚡"
  },
  {
    title: "Direct Chat",
    desc: "Get instant notifications and direct message access to active buyers.",
    icon: "💬"
  }
];

/**
 * LegitPartner Page - The exclusive monetization hub for TipidMoto.
 * Handles the ₱100 setup and conversion to verified status.
 */
const LegitPartner: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState('');

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    setStatus('processing');
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('paymongo-checkout/create-link');
      
      if (functionError) throw functionError;
      
      if (data?.checkoutUrl) {
        // Redirect user to PayMongo hosted checkout
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('Failed to generate payment link. Please try again.');
      }
    } catch (err: any) {
      console.error("Payment initiation failed:", err);
      setError(err.message || 'An unexpected error occurred.');
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <div className="legit-page">
        <div className="legit-container">
          <div className="success-alert">
            <div className="success-icon">✓</div>
            <h2 className="success-title">Payment Successful!</h2>
            <p className="success-message">
              You are now a **Legit Partner**. Your gold badge is active on all your current and future listings.
            </p>
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/dashboard')}
              style={{ minWidth: 200 }}
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="legit-page">
      <div className="legit-container">
        
        {/* Pitch Section */}
        <section className="legit-hero">
          <div className="legit-badge-large" aria-hidden="true">⬡</div>
          <h1 className="legit-title">Become a Legit Partner</h1>
          <p className="legit-subtitle">
            Join the elite circle of trusted sellers and accelerate your sales with premium verification.
          </p>
        </section>

        {/* Benefits Grid */}
        <section className="benefits-list">
          {BENEFITS.map((benefit, i) => (
            <div key={i} className="benefit-item">
              <div className="benefit-icon">{benefit.icon}</div>
              <div className="benefit-text">
                <span className="benefit-title">{benefit.title}</span>
                <span className="benefit-desc">{benefit.desc}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Pricing Block */}
        <section className="pricing-info">
          <div className="price-item">
            <span className="price-label">One-time Setup</span>
            <span className="price-value">₱ 100</span>
          </div>
          <div style={{ width: 1, backgroundColor: 'var(--ash)', alignSelf: 'stretch' }} />
          <div className="price-item">
            <span className="price-label">Monthly Renewal</span>
            <span className="price-value">₱ 30</span>
          </div>
        </section>

        {/* Simulated Checkout Area */}
        <div className="checkout-card">
          <header className="checkout-header">
            <h2 className="checkout-title">Secure Checkout</h2>
            <p className="body-xs" style={{ color: 'var(--gold-dark)' }}>
              Payment processed via PayMongo
            </p>
          </header>

          {error && (
            <div className="auth-error" style={{ marginBottom: 'var(--space-4)' }}>
              <span className="auth-error-icon">✕</span>
              <span>{error}</span>
            </div>
          )}

          <form className="checkout-form" onSubmit={handlePayment}>
            <div className="checkout-input-group">
              <label className="checkout-label" htmlFor="phone">GCash Mobile Number</label>
              <div className="gcash-input-wrapper">
                <span className="gcash-prefix">+63</span>
                <input 
                  id="phone"
                  type="tel" 
                  className="gcash-input"
                  placeholder="9XX XXX XXXX"
                  pattern="[0-9]{10}"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  disabled={status === 'processing'}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-gold-massive"
              disabled={status === 'processing' || !phone}
            >
              {status === 'processing' ? 'Connecting to GCash...' : 'Pay ₱100 via GCash'}
            </button>
          </form>

          <p className="body-xs" style={{ textAlign: 'center', color: 'var(--stone)', marginTop: -8 }}>
            By paying, you agree to our Partner Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegitPartner;
