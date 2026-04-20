import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateListing.css';

/**
 * Step configuration for the multi-step listing flow.
 */
const STEPS = [
  { id: 1, label: "Category" },
  { id: 2, label: "Details" },
  { id: 3, label: "Photos" },
  { id: 4, label: "Price" }
];

/**
 * CreateListing - A structured multi-step flow for posting a new part.
 * Adheres to Antigravity design principles: Focused, clean, and mobile-ready.
 */
const CreateListing: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    compatibility: '',
    title: '',
    description: '',
    condition: 'Used - Good',
    price: '',
    location: ''
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handlePublish = () => {
    // In a production environment, this would submit to Supabase.
    alert('Listing published successfully! Your part is now live.');
    navigate('/');
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="post-page">
      <div className="post-container">
        
        {/* Progress Stepper Header */}
        <nav className="stepper" aria-label="Creation progress">
          {STEPS.map(step => (
            <div 
              key={step.id} 
              className={`step-item ${currentStep === step.id ? 'is-active' : ''} ${currentStep > step.id ? 'is-completed' : ''}`}
            >
              <div className="step-dot" aria-hidden="true">
                {currentStep > step.id ? '✓' : step.id}
              </div>
              <span className="step-label">{step.label}</span>
            </div>
          ))}
        </nav>

        {/* Conditional Step Rendering */}
        <div className="post-form-card">
          
          {/* STEP 1: CATEGORY & FIT */}
          {currentStep === 1 && (
            <div className="form-step">
              <header className="step-header">
                <h2 className="step-title">What are you selling?</h2>
                <p className="step-description">Choose the right category to help buyers find you.</p>
              </header>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="category">Category</label>
                  <select 
                    id="category"
                    className="form-input"
                    value={formData.category}
                    onChange={(e) => updateField('category', e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option value="engine">Engine Parts</option>
                    <option value="tires">Tires & Rims</option>
                    <option value="brakes">Brakes & Suspension</option>
                    <option value="fairings">Body & Fairings</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="compatibility">Compatible Bike Models</label>
                  <input 
                    id="compatibility"
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Yamaha NMAX v1/v2, Honda Click"
                    value={formData.compatibility}
                    onChange={(e) => updateField('compatibility', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DETAILS */}
          {currentStep === 2 && (
            <div className="form-step">
              <header className="step-header">
                <h2 className="step-title">Describe the part</h2>
                <p className="step-description">Accuracy builds trust and reduces questions.</p>
              </header>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="title">Part Title</label>
                  <input 
                    id="title"
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Original NMAX v2 Exhaust System"
                    value={formData.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Condition</label>
                  <div className="condition-grid">
                    {['New', 'Used - Like New', 'Used - Good', 'For Parts'].map(cond => (
                      <button 
                        key={cond}
                        type="button"
                        className={`condition-option ${formData.condition === cond ? 'is-selected' : ''}`}
                        onClick={() => updateField('condition', cond)}
                        aria-pressed={formData.condition === cond}
                      >
                        <span className="condition-title">{cond}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="description">Description</label>
                  <textarea 
                    id="description"
                    className="form-textarea"
                    placeholder="Mention any scratches, mileage, or installation tips..."
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PHOTOS */}
          {currentStep === 3 && (
            <div className="form-step">
              <header className="step-header">
                <h2 className="step-title">Add Photos</h2>
                <p className="step-description">Take clear shots of any scratches or identifiers.</p>
              </header>
              <div className="upload-zone" aria-label="Upload listing photos">
                <span className="upload-icon" role="img" aria-label="placeholder">⚙️</span>
                <div className="upload-instructions">
                  <p className="body-md" style={{ fontWeight: 500 }}>Drag & drop or tap to upload</p>
                  <p className="body-sm" style={{ color: 'var(--stone)' }}>Minimum 1 photo required (Max 5)</p>
                </div>
                <button 
                  className="btn btn-sm" 
                  style={{ border: '1.5px solid var(--ash)', backgroundColor: 'var(--white)' }}
                  onClick={() => alert('File picker would open here.')}
                >
                   Select Images
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: PRICE & LOCATION */}
          {currentStep === 4 && (
            <div className="form-step">
              <header className="step-header">
                <h2 className="step-title">Price & Location</h2>
                <p className="step-description">The final orbit before your listing goes live.</p>
              </header>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="price">Asking Price</label>
                  <div className="price-input-wrapper">
                    <span className="price-prefix" aria-hidden="true">₱</span>
                    <input 
                      id="price"
                      type="number" 
                      className="form-input price-input"
                      placeholder="0"
                      value={formData.price}
                      onChange={(e) => updateField('price', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="location">Pick-up Location</label>
                  <select 
                    id="location"
                    className="form-input"
                    value={formData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                  >
                    <option value="">Select Location</option>
                    <option value="qc">Quezon City</option>
                    <option value="manila">Manila</option>
                    <option value="pasig">Pasig</option>
                    <option value="cavite">Cavite</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <footer className="form-nav">
            {currentStep > 1 ? (
              <button className="btn btn-ghost" onClick={prevStep}>
                Back
              </button>
            ) : <div />}
            
            {currentStep < 4 ? (
              <button 
                className="btn btn-primary btn-nav-next" 
                onClick={nextStep}
                disabled={currentStep === 1 && !formData.category} // Validation gate
              >
                Next Step
              </button>
            ) : (
              <button className="btn btn-primary btn-nav-next" onClick={handlePublish}>
                Publish Listing
              </button>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
