import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

interface FlaggedItem {
  id: string;
  title: string;
  seller: string;
  isLegit: boolean;
  reason: string;
  date: string;
}

const MOCK_FLAGGED: FlaggedItem[] = [
  { id: '1', title: 'Suspiciously Cheap NMAX', seller: 'BadRider99', isLegit: false, reason: 'Possible Scam', date: 'Oct 12, 10:20 AM' },
  { id: '2', title: 'Honda Click Fairings', seller: 'MotoJuan', isLegit: true, reason: 'Incorrect Category', date: 'Oct 12, 09:15 AM' },
  { id: '3', title: 'Stolen Engine Case?', seller: 'SketchyParts', isLegit: false, reason: 'Illicit Item', date: 'Oct 11, 04:45 PM' },
  { id: '4', title: 'Broken Brake Lever', seller: 'BaryoMoto', isLegit: false, reason: 'Double Post', date: 'Oct 11, 02:00 PM' },
];

/**
 * Admin Moderation Panel - Internal command center for TipidMoto admins.
 */
const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('flagged');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FlaggedItem | null>(null);

  const handleRemoveClick = (item: FlaggedItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const confirmRemoval = () => {
    // In a real app, this would call Supabase to archive/delete the listing
    alert(`Listing "${selectedItem?.title}" has been removed.`);
    setShowModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="admin-page">
      
      {/* LEFT: Admin Sidebar */}
      <aside className="admin-sidebar">
        <Link to="/admin" className="admin-nav-item">
          Overview
        </Link>
        <Link to="/admin/mod" className="admin-nav-item is-active">
          <span>Flagged Listings</span>
          <span className="admin-pill">7</span>
        </Link>
        <Link to="/admin/users" className="admin-nav-item">
          Users
        </Link>
        <Link to="/admin/subs" className="admin-nav-item">
          Subscriptions
        </Link>
        <Link to="/admin/blocks" className="admin-nav-item">
          Blocklist
        </Link>
      </aside>

      {/* Mobile Nav Tabs */}
      <nav className="admin-mobile-nav">
        <Link to="/admin" className="nav-link">Overview</Link>
        <Link to="/admin/mod" className="nav-link is-active">Flagged (7)</Link>
        <Link to="/admin/users" className="nav-link">Users</Link>
      </nav>

      {/* MAIN Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h1 className="admin-title">Flagged Content Moderation</h1>
          <p className="body-md" style={{ color: 'var(--stone)', marginTop: 4 }}>
            Review reported listings and enforce marketplace safety.
          </p>
        </header>

        <section className="table-wrapper">
          <table className="mod-table">
            <thead>
              <tr>
                <th>Listing</th>
                <th>Seller</th>
                <th>Reason</th>
                <th>Reported On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_FLAGGED.map(item => (
                <tr key={item.id}>
                  <td>
                    <div className="listing-cell">
                      <div className="listing-cell__thumb">⚙️</div>
                      <span style={{ fontWeight: 700 }}>{item.title}</span>
                    </div>
                  </td>
                  <td>
                    {item.seller}
                    {item.isLegit && <span className="seller-badge" title="Legit Partner">⬡</span>}
                  </td>
                  <td style={{ color: 'var(--red)' }}>{item.reason}</td>
                  <td style={{ color: 'var(--stone)' }}>{item.date}</td>
                  <td>
                    <div className="actions-cell">
                      <button className="btn btn-sm btn-ghost" style={{ border: '1px solid var(--ash)' }}>Review</button>
                      <button className="btn btn-sm btn-ghost">Dismiss</button>
                      <button 
                        className="btn btn-sm btn-outline-red"
                        onClick={() => handleRemoveClick(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* REMOVAL CONFIRMATION MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <header className="modal-header">
              <h2 className="modal-title">Confirm Removal?</h2>
              <p className="modal-desc">
                You are about to remove <strong>"{selectedItem?.title}"</strong>. 
                This action is irreversible and the seller will be notified of the violation.
              </p>
            </header>
            <footer className="modal-footer">
              <button className="btn-confirm-delete" onClick={confirmRemoval}>
                Confirm Removal
              </button>
              <button 
                className="btn btn-ghost" 
                onClick={() => setShowModal(false)}
                style={{ height: 48 }}
              >
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;
