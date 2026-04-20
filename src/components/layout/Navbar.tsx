import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Session } from '@supabase/supabase-js';

const Navbar: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav style={{
      backgroundColor: 'var(--ink)',
      height: '62px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
    }}>
      <div className="container" style={{
        display: 'flex',
        justify-content: space-between,
        alignItems: 'center',
        width: '100%',
      }}>
        {/* Left side: Logo and Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
          <Link to="/" style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '19px',
            color: 'var(--white)',
            textDecoration: 'none',
          }}>
            Tipid<span style={{ color: 'var(--red-mid)' }}>Moto</span>
          </Link>
          
          <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'center' }}>
            <Link to="/marketplace" className="nav-link-custom">Browse</Link>
            <Link to="/shop-by-bike" className="nav-link-custom">Shop by Bike</Link>
          </div>
        </div>

        {/* Right side: Auth Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
          {!session ? (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">Log in</Link>
              <Link to="/signup" className="btn btn-primary btn-sm">Sign up</Link>
            </>
          ) : (
            <>
              <Link to="/inbox" className="nav-link-custom" style={{ position: 'relative' }}>
                Inbox
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-12px',
                  backgroundColor: 'var(--red)',
                  color: 'var(--white)',
                  borderRadius: 'var(--r-pill)',
                  height: '14px',
                  minWidth: '14px',
                  padding: '0 4px',
                  fontSize: '9px',
                  display: 'flex',
                  alignItems: 'center',
                  justify-content: 'center',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                }}>
                  3
                </span>
              </Link>
              <Link to="/post" className="btn btn-primary btn-sm">+ Post listing</Link>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'var(--red-light)',
                color: 'var(--red-dark)',
                borderRadius: 'var(--r-pill)',
                display: 'flex',
                alignItems: 'center',
                justify-content: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer',
              }}>
                {session.user.email?.[0].toUpperCase() || 'U'}
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        .nav-link-custom {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.04em;
          color: var(--dust);
          text-decoration: none;
          text-transform: uppercase;
          transition: color var(--motion-fast);
          padding: var(--space-2) var(--space-3);
          border-radius: var(--r-sm);
        }
        .nav-link-custom:hover {
          color: var(--white);
          background-color: rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
