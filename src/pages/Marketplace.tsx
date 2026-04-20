import React, { useState, useEffect } from 'react';
import ListingCard, { ListingCardProps } from '../components/marketplace/ListingCard';
import { supabase } from '../lib/supabase';
import './Marketplace.css';

/**
 * MOCK_LISTINGS - High-quality mock data representing various states.
 * States: 'default', 'legit_partner', 'sold', 'new', 'hot'.
 */
const MOCK_LISTINGS: ListingCardProps[] = [
  {
    title: "NMAX v2 Stock Muffler",
    price: 3500,
    location: "Quezon City",
    category: "Engine Parts",
    bikeModel: "Yamaha NMAX v2",
    sellerName: "Juan Dela Cruz",
    sellerInitials: "JD",
    trustScore: 48,
    status: 'default',
    imageUrl: "https://images.unsplash.com/photo-1558981403-c5f97dbbe480?q=80&w=1470&auto=format&fit=crop"
  },
  {
    title: "RCB Brake Lever Set",
    price: 1800,
    location: "Caloocan",
    category: "Accessories",
    bikeModel: "Universal",
    sellerName: "Mark Anthony",
    sellerInitials: "MA",
    trustScore: 125,
    status: 'legit_partner',
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1470&auto=format&fit=crop"
  },
  {
    title: "Click 150i Fairings Set",
    price: 5200,
    location: "Manila",
    category: "Body Parts",
    bikeModel: "Honda Click 150i",
    sellerName: "Sari-Sari Moto",
    sellerInitials: "SM",
    trustScore: 15,
    status: 'sold',
    imageUrl: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1470&auto=format&fit=crop"
  },
  {
    title: "Brembo 4-Piston Caliper",
    price: 12500,
    location: "Pasig",
    category: "Brakes",
    bikeModel: "Forza 350",
    sellerName: "Moto Hub",
    sellerInitials: "MH",
    trustScore: 89,
    status: 'new',
    imageUrl: "https://images.unsplash.com/photo-1591438122442-0eeefef94121?q=80&w=1470&auto=format&fit=crop"
  },
  {
    title: "Pirelli Diablo Rosso Sport",
    price: 2800,
    location: "Makati",
    category: "Tires",
    bikeModel: "Sniper 155",
    sellerName: "Tire King",
    sellerInitials: "TK",
    trustScore: 210,
    status: 'hot',
    imageUrl: "https://images.unsplash.com/photo-1444491741275-3747c53c99b4?q=80&w=1374&auto=format&fit=crop"
  },
  {
    title: "Koso Digital Voltmeter",
    price: 750,
    location: "Marikina",
    category: "Electrical",
    bikeModel: "Universal",
    sellerName: "Gadgets Moto",
    sellerInitials: "GM",
    trustScore: 56,
    status: 'default',
    categoryEmoji: "⚡"
  },
  {
    title: "Ohlins Rear Suspension",
    price: 18500,
    location: "Mandaluyong",
    category: "Suspension",
    bikeModel: "XMAX 300",
    sellerName: "Premium Parts",
    sellerInitials: "PP",
    trustScore: 342,
    status: 'legit_partner',
    imageUrl: "https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?q=80&w=1470&auto=format&fit=crop"
  },
  {
    title: "LeoVince Exhaust System",
    price: 9200,
    location: "Cavite",
    category: "Engine Parts",
    bikeModel: "Raider 150 FI",
    sellerName: "Speed Shop",
    sellerInitials: "SS",
    trustScore: 112,
    status: 'hot',
    imageUrl: "https://images.unsplash.com/photo-1609345224364-79354e6378e9?q=80&w=1476&auto=format&fit=crop"
  }
];

/**
 * Marketplace Page - Responsive Marketplace Feed.
 * Features a mobile-optimized filter system and 44px tap targets.
 */
const Marketplace: React.FC = () => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [listings, setListings] = useState<ListingCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      // Fetch listings and join with seller profiles to get sellerName and trustScore
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          seller:profiles (
            display_name,
            trust_score,
            is_legit_partner
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const formattedListings: ListingCardProps[] = data.map(item => ({
          title: item.title,
          price: item.price,
          location: item.location,
          category: item.category,
          bikeModel: Array.isArray(item.bike_models) ? item.bike_models[0] : item.bike_models,
          sellerName: item.seller?.display_name || 'Unknown Seller',
          sellerInitials: (item.seller?.display_name || 'U').substring(0, 2).toUpperCase(),
          trustScore: item.seller?.trust_score || 0,
          status: item.seller?.is_legit_partner ? 'legit_partner' : (item.status === 'active' ? 'default' : item.status),
          imageUrl: item.images?.[0] || undefined
        }));
        setListings(formattedListings);
      }
    } catch (err) {
      console.error('Error fetching listings:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="marketplace-page">
      <div className="marketplace-container">
        
        {/* Mobile Filter Trigger */}
        <div className="mobile-filter-bar">
          <button 
            className="mobile-filter-btn" 
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            aria-expanded={isMobileFiltersOpen}
          >
            <span>⌕</span> {isMobileFiltersOpen ? 'Hide Filters' : 'Show Filter Parts'}
          </button>
        </div>

        {/* Filter Sidebar */}
        <aside className={`marketplace-sidebar ${isMobileFiltersOpen ? 'is-open' : ''}`}>
          <div className="filter-section">
            <h2 className="filter-section__label">Filter Parts</h2>
            {/* ... Filters unchanged ... */}
            <div className="filter-group">
              <label className="filter-group__label">Search Keyword</label>
              <div className="search-wrapper">
                <span className="search-icon" aria-hidden="true">⌕</span>
                <input 
                  type="text" 
                  placeholder="Search muffler, tires, etc..." 
                  className="filter-input search-input"
                  aria-label="Search listings"
                />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-group__label">Category</label>
              <select className="filter-input" aria-label="Filter by category">
                <option value="">All Categories</option>
                <option value="engine">Engine Parts</option>
                <option value="tires">Tires & Rims</option>
                <option value="electrical">Electrical</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-group__label">Location</label>
              <select className="filter-input" aria-label="Filter by location">
                <option value="">All Locations</option>
                <option value="qc">Quezon City</option>
                <option value="manila">Manila</option>
                <option value="pasig">Pasig</option>
                <option value="south">South (Cavite/Laguna)</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="legit-toggle">
                <input type="checkbox" />
                <div className="legit-toggle__switch" aria-hidden="true"></div>
                <span className="legit-toggle__text">Legit Partners Only</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="marketplace-main">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Fetching the latest listings...</p>
            </div>
          ) : listings.length > 0 ? (
            <div className="listing-grid">
              {listings.map((listing, index) => (
                <ListingCard key={index} {...listing} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-icon">🏍️</span>
              <h3>No listings found</h3>
              <p>Be the first to post a part for sale!</p>
              <button className="btn btn-primary" style={{ marginTop: 24 }}>Create Listing</button>
            </div>
          )}

          {/* Pagination */}
          <nav className="pagination" aria-label="Marketplace pagination">
            <button className="pg-btn" disabled aria-label="Go to previous page">
              Prev
            </button>
            <button className="pg-btn pg-btn--active" aria-current="page">1</button>
            {listings.length > 20 && <button className="pg-btn">2</button>}
            <button className="pg-btn" disabled={listings.length <= 20} aria-label="Go to next page">Next</button>
          </nav>
        </main>
      </div>
    </div>
  );
};

export default Marketplace;
