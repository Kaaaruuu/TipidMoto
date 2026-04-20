import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--ink-2)',
      padding: 'var(--space-12) 0 var(--space-8)',
      color: 'var(--stone)',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-12)',
        }}>
          {/* Logo & Tagline */}
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '20px',
              color: 'var(--white)',
              marginBottom: 'var(--space-4)',
            }}>
              Tipid<span style={{ color: 'var(--red-mid)' }}>Moto</span>
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 300,
              color: 'var(--stone)',
              maxWidth: '240px',
            }}>
              The first dedicated, trusted marketplace for second-hand motorcycle parts in the Philippines.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="label" style={{ color: 'var(--ash)', marginBottom: 'var(--space-6)' }}>Marketplace</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: 'var(--space-3)' }}>
                <Link to="/marketplace" className="footer-link">All Listings</Link>
              </li>
              <li style={{ marginBottom: 'var(--space-3)' }}>
                <Link to="/shop-by-bike" className="footer-link">Shop by Bike</Link>
              </li>
              <li>
                <Link to="/legit-partner" className="footer-link">Legit Partner</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="label" style={{ color: 'var(--ash)', marginBottom: 'var(--space-6)' }}>Support</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: 'var(--space-3)' }}>
                <Link to="/help" className="footer-link">Help Center</Link>
              </li>
              <li style={{ marginBottom: 'var(--space-3)' }}>
                <Link to="/safety" className="footer-link">Safety Tips</Link>
              </li>
              <li>
                <Link to="/terms" className="footer-link">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          marginTop: 'var(--space-12)',
          paddingTop: 'var(--space-8)',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          textAlign: 'center',
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          color: 'var(--stone)',
        }}>
          &copy; {new Date().getFullYear()} TipidMoto Philippines. Proudly built for the Filipino rider.
        </div>
      </div>

      <style>{`
        .footer-link {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 11px;
          color: var(--dust);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          transition: color var(--motion-fast);
        }
        .footer-link:hover {
          color: var(--white);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
