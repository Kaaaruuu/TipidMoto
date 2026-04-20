import React from 'react';
import './ListingCard.css';

/**
 * ListingStatus defines the visual state and badges of the card.
 */
export type ListingStatus = 'default' | 'legit_partner' | 'sold' | 'new' | 'hot';

/**
 * ListingCardProps interface adhering to TipidMoto's marketplace requirements.
 */
export interface ListingCardProps {
  /** The name of the part or item. */
  title: string;
  /** Numerical price value. */
  price: number;
  /** General location of the seller (e.g., "Quezon City"). */
  location: string;
  /** Category of the item (e.g., "Engine", "Tires"). */
  category: string;
  /** Specific bike model compatibility (e.g., "NMAX v2"). */
  bikeModel: string;
  /** Full name of the seller. */
  sellerName: string;
  /** Initials for the avatar placeholder. */
  sellerInitials: string;
  /** trustScore displayed in the footer pill. */
  trustScore: number;
  /** Optional URL for the listing image. */
  imageUrl?: string;
  /** Status determines badges and visual styling. */
  status: ListingStatus;
  /** Optional emoji for the placeholder state. */
  categoryEmoji?: string;
}

/**
 * ListingCard - A premium marketplace item card for the TipidMoto platform.
 * Follows the Antigravity design system (Modern Utilitarian).
 */
const ListingCard: React.FC<ListingCardProps> = ({
  title,
  price,
  location,
  category,
  bikeModel,
  sellerName,
  sellerInitials,
  trustScore,
  imageUrl,
  status,
  categoryEmoji = '⚙️'
}) => {
  const isSold = status === 'sold';
  const isLegit = status === 'legit_partner';

  const formatPrice = (amount: number) => {
    return `₱ ${amount.toLocaleString()}`;
  };

  const renderBadge = () => {
    switch (status) {
      case 'legit_partner':
        return (
          <div 
            className="listing-card__badge listing-card__badge--legit" 
            title="Verified seller — identity confirmed"
          >
            <span aria-hidden="true">⬡</span> LEGIT PARTNER
          </div>
        );
      case 'sold':
        return (
          <div className="listing-card__badge listing-card__badge--sold">
            <span aria-hidden="true">✓</span> SOLD
          </div>
        );
      case 'new':
        return (
          <div className="listing-card__badge listing-card__badge--new">
            NEW
          </div>
        );
      case 'hot':
        return (
          <div className="listing-card__badge listing-card__badge--hot">
            <span aria-hidden="true">↑</span> HOT
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={`listing-card ${isSold ? 'is-sold' : ''} ${isLegit ? 'is-legit-partner' : ''}`}
      aria-label={`${title} listing by ${sellerName}`}
    >
      <div className="listing-card__image-wrapper">
        {renderBadge()}
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={`${title} for ${bikeModel}`} 
            className="listing-card__image" 
            loading="lazy"
          />
        ) : (
          <div className="listing-card__placeholder-emoji" aria-hidden="true">
            {categoryEmoji}
          </div>
        )}
      </div>

      <div className="listing-card__body">
        <h3 className="listing-card__title" title={title}>
          {title}
        </h3>
        <p className="listing-card__meta">
          {bikeModel} &middot; {category} &middot; {location}
        </p>
        <div className={`listing-card__price ${isSold ? 'is-sold' : ''}`}>
          {formatPrice(price)}
        </div>
      </div>

      <footer className="listing-card__footer">
        <div className="listing-card__seller">
          <div className="listing-card__avatar">
            {sellerInitials}
          </div>
          <span className="listing-card__seller-name" title={sellerName}>
            {sellerName}
          </span>
        </div>
        <div className="listing-card__trust-score" aria-label={`Trust score: ${trustScore}`}>
          +{trustScore}
        </div>
      </footer>
    </div>
  );
};

export default ListingCard;
