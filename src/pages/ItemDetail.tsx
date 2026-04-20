import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './ItemDetail.css';

/**
 * ItemDetail Page - Comprehensive view of a single listing.
 * Adheres to Antigravity design principles: Price is the Anchor.
 */
const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data for demonstration
  const item = {
    title: "Rear Brake Caliper Assembly - Honda CB150R",
    price: 2450,
    location: "Quezon City",
    category: "Brakes & Suspension",
    postedAt: "2 days ago",
    description: "Selling my stock CB150R rear brake caliper. In very good condition, pads are at 80% life. \n\nBolt-on replacement for CB150R or CBR150R models. No issues, no leaks, cleaned and ready to install. \n\nReason for selling: Upgraded to Brembo. Lowballers will be ignored.",
    seller: {
      name: "MotoJuan",
      initials: "MJ",
      trustScore: 127,
      isLegitPartner: true
    }
  };

  return (
    <div className="item-detail-page">
      <div className="item-detail-container">
        
        {/* Navigation Breadcrumb */}
        <Link to="/" className="back-link">
          <span>‹</span> Back to Marketplace
        </Link>

        <div className="item-layout">
          
          {/* Left Column: Media & Primary Info */}
          <div className="item-content">
            
            {/* Gallery Section */}
            <section className="gallery">
              <div className="gallery__main" aria-label="Main listing image">
                <span role="img" aria-label="Engine parts icon">⚙️</span>
              </div>
              <div className="gallery__thumbnails">
                <div className="gallery__thumb">⚙️</div>
                <div className="gallery__thumb">⚙️</div>
                <div className="gallery__thumb">⚙️</div>
              </div>
            </section>

            {/* Title & Meta Block (Important on Mobile) */}
            <header className="item-info">
              <h1 className="item-title">{item.title}</h1>
              <div className="item-meta">
                {item.location} &middot; {item.category} &middot; Posted {item.postedAt}
              </div>
            </header>

            {/* Description Block */}
            <section className="description-block">
              <h2 className="section-label">Description</h2>
              <div className="description-text">
                {item.description}
              </div>
            </section>

            {/* Seller profile on Mobile only (below description) */}
            <div className="mobile-seller-block hide-desktop">
               <SellerCard seller={item.seller} />
            </div>
          </div>

          {/* Right Column: Sticky Action Panel */}
          <aside className="action-panel-sticky">
            
            {/* Anchor: Price and CTAs */}
            <div className="action-card">
              <div className="price-box">
                <span className="price-label">Current Price</span>
                <p className="price-value">₱ {item.price.toLocaleString()}</p>
              </div>

              <div className="cta-group">
                <button className="cta-btn cta-btn--primary" aria-label="Message seller">
                  Message Seller
                </button>
                <button className="cta-btn cta-btn--outline" aria-label="Submit an offer">
                  Make an Offer
                </button>
              </div>
            </div>

            {/* Seller Info (Desktop only inside sticky side) */}
            <div className="hide-mobile">
              <SellerCard seller={item.seller} />
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

/**
 * SellerCard - Reusable component for the seller profile block.
 */
const SellerCard: React.FC<{ seller: any }> = ({ seller }) => {
  return (
    <div className={`seller-card ${seller.isLegitPartner ? 'is-legit-partner-box' : ''}`}>
      <div className="seller-header">
        <div className="seller-avatar">
          {seller.initials}
        </div>
        <div className="seller-info-text">
          <span className="seller-name">{seller.name}</span>
          <span className="trust-badge">+{seller.trustScore} Trust Score</span>
        </div>
      </div>

      {seller.isLegitPartner && (
        <div className="legit-badge" title="Identity confirmed and verified by TipidMoto">
          <span>⬡</span> Legit Partner
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
