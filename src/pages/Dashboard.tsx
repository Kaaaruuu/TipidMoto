import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ListingCard, { ListingCardProps } from '../components/marketplace/ListingCard';
import './Dashboard.css';

/**
 * MOCK_INVENTORY - Listings owned by the dashboard user.
 */
const MOCK_INVENTORY: ListingCardProps[] = [
  {
    title: "Stock NMAX v2 Exhaust",
    price: 3200,
    location: "Quezon City",
    category: "Engine Parts",
    bikeModel: "NMAX v2",
    sellerName: "MotoJuan",
    sellerInitials: "MJ",
    trustScore: 127,
    status: 'default',
    imageUrl: "https://images.unsplash.com/photo-1558981403-c5f97dbbe480?q=80&w=1470&auto=format&fit=crop"
  },
  {
    title: "RCB Brake Lever Set (Gold)",
    price: 1800,
    location: "Quezon City",
    category: "Accessories",
    bikeModel: "Universal",
    sellerName: "MotoJuan",
    sellerInitials: "MJ",
    trustScore: 127,
    status: 'hot',
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1470&auto=format&fit=crop"
  },
  {
    title: "Honda Click 150i Fairings",
    price: 4900,
    location: "Quezon City",
    category: "Body Parts",
    bikeModel: "Click 150i",
    sellerName: "MotoJuan",
    sellerInitials: "MJ",
    trustScore: 127,
    status: 'default',
    imageUrl: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1470&auto=format&fit=crop"
  }
];

/**
 * User Dashboard Page - Center for managing listings and trust.
 * Adheres to Antigravity Dashboard patterns.
 */
const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');

  return (
    <div className="dashboard-page">
      
      {/* Desktop Sidebar */}
      <aside className="dashboard-sidebar">
        <Link to="/dashboard" className="dashboard-nav-item is-active">
          Dashboard Home
        </Link>
        <Link to="/dashboard/listings" className="dashboard-nav-item">
          My Listings
        </Link>
        <Link to="/dashboard/inbox" className="dashboard-nav-item">
          Inbox
        </Link>
        <Link to="/dashboard/saved" className="dashboard-nav-item">
          Saved Searches
        </Link>
        <Link to="/dashboard/partner" className="dashboard-nav-item">
          Legit Partner
        </Link>
        <Link to="/settings" className="dashboard-nav-item">
          Settings
        </Link>
      </aside>

      {/* Mobile Sticky Navigation Tabs */}
      <nav className="dashboard-mobile-nav">
        <Link to="/dashboard" className="mobile-nav-link is-active">Home</Link>
        <Link to="/dashboard/listings" className="mobile-nav-link">Listings</Link>
        <Link to="/dashboard/inbox" className="mobile-nav-link">Messages</Link>
        <Link to="/dashboard/partner" className="mobile-nav-link">Partner</Link>
        <Link to="/settings" className="mobile-nav-link">Settings</Link>
      </nav>

      {/* Main Content Area */}
      <main className="dashboard-main">
        
        {/* Stat Cards Row */}
        <section className="stat-grid">
          <div className="stat-card">
            <span className="stat-card__label">Active Listings</span>
            <span className="stat-card__value">12</span>
            <span className="stat-card__sub" style={{ color: 'var(--green)' }}>↑ 2 this week</span>
          </div>

          <div className="stat-card">
            <span className="stat-card__label">Trust Score</span>
            <span className="stat-card__value">+48</span>
            <span className="stat-card__sub" style={{ color: 'var(--green)' }}>94% positive rating</span>
          </div>

          <div className="stat-card">
            <span className="stat-card__label">Unread Messages</span>
            <span className="stat-card__value">3</span>
            <span className="stat-card__sub" style={{ color: 'var(--red)' }}>2 with pending offers</span>
          </div>

          <div className="stat-card stat-card--gold">
            <span className="stat-card__label">Legit Partner</span>
            <span className="stat-card__value">Active</span>
            <span className="stat-card__sub">Renews in 18 days</span>
          </div>
        </section>

        {/* Inventory Management Section */}
        <section className="inventory-section">
          <header>
            <h2 className="section-label">Inventory Management</h2>
          </header>

          <div className="content-tabs">
            <button 
              className={`tab-btn ${activeTab === 'active' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('active')}
            >
              Active (12)
            </button>
            <button 
              className={`tab-btn ${activeTab === 'sold' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('sold')}
            >
              Sold (34)
            </button>
            <button 
              className={`tab-btn ${activeTab === 'expired' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('expired')}
            >
              Expired (5)
            </button>
          </div>

          <div className="dashboard-grid">
            {MOCK_INVENTORY.map((listing, index) => (
              <ListingCard key={index} {...listing} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default Dashboard;
