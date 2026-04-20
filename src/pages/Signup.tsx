import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import './Signup.css';

/**
 * Signup Page - Create a new TipidMoto account.
 */
const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
    } else {
      // Supabase by default requires email confirmation, 
      // but we redirect to marketplace or show success
      alert('Signup successful! Check your email for confirmation.');
      navigate('/login');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <header className="auth-header">
          <h1 className="auth-title">Create an account</h1>
          <p className="auth-subtitle">Join the first trusted parts marketplace.</p>
        </header>

        {error && (
          <div className="auth-error" role="alert">
            <span className="auth-error-icon" aria-hidden="true">✕</span>
            <span>{error}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSignup}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="rider@tipidmoto.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Create Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary auth-submit-btn" 
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Sign up'}
          </button>
        </form>

        <footer className="auth-footer">
          Already have an account? 
          <Link to="/login" className="auth-toggle-link">Log in</Link>
        </footer>
      </div>
    </div>
  );
};

export default Signup;
