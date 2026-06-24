import React, { useState, useRef } from 'react';
import { Upload, Sparkles, ImagePlus } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { scanProduct } from '../lib/api';
import './ProductAnalyzer.css';

const RATING_STYLES = {
  Safe: { className: 'rating-safe', label: 'Safe' },
  Caution: { className: 'rating-caution', label: 'Caution' },
  Avoid: { className: 'rating-avoid', label: 'Avoid' },
};

const ProductAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const applyFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  };

  const handleFileSelect = (e) => applyFile(e.target.files[0]);

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    applyFile(e.dataTransfer.files[0]);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);
    try {
      const data = await scanProduct(selectedFile);
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to analyze product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="product-analyzer">
      <div className="page-header">
        <div>
          <h1>Product Analyzer</h1>
          <p className="page-subtitle">Upload a product label to analyze ingredients with AI</p>
        </div>
      </div>

      <Card padding="lg" className="analyzer-container">
        {!result ? (
          <>
            <div className="ai-assistant">
              <div className="assistant-avatar">
                <Sparkles size={20} />
              </div>
              <div className="assistant-message">
                <h3>Product Analyzer AI</h3>
                <p>
                  Upload a photo of your product's ingredient list and I'll analyze it based on
                  your skin profile — flagging allergens, matched concerns, and giving you a
                  personalised safety rating.
                </p>
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="file-input-hidden"
            />

            {!selectedFile ? (
              <div
                className={`upload-zone ${dragging ? 'upload-zone-active' : ''}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="upload-zone-icon">
                  <ImagePlus size={28} />
                </div>
                <p className="upload-zone-title">Drop your image here</p>
                <p className="upload-zone-subtitle">or click to browse · JPG, PNG, WEBP up to 5 MB</p>
              </div>
            ) : (
              <div className="image-preview-container">
                <img src={preview} alt="Product label preview" className="image-preview" />
              </div>
            )}

            {error && <p className="analyzer-error">{error}</p>}

            <div className="analyzer-actions">
              {selectedFile && (
                <Button
                  variant="outline"
                  icon={<Upload size={16} />}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Change Image
                </Button>
              )}

              {selectedFile && (
                <Button
                  variant="primary"
                  icon={<Sparkles size={16} />}
                  onClick={handleAnalyze}
                  disabled={loading}
                >
                  {loading ? 'Analyzing...' : 'Analyze Product'}
                </Button>
              )}
            </div>
          </>
        ) : (
          <div className="result-container">
            <div className="result-header">
              <div>
                <h2 className="result-product-name">{result.product_name || 'Unknown Product'}</h2>
                {result.brand && <p className="result-brand">{result.brand}</p>}
              </div>
              <span className={`rating-badge ${RATING_STYLES[result.rating]?.className || 'rating-safe'}`}>
                {result.rating}
              </span>
            </div>

            <div className="result-explanation">
              <p>{result.explanation}</p>
            </div>

            {result.concerns_matched?.length > 0 && (
              <div className="result-section">
                <h4>Concerns Matched</h4>
                <div className="tag-list">
                  {result.concerns_matched.map((c, i) => (
                    <span key={i} className="tag tag-concern">{c}</span>
                  ))}
                </div>
              </div>
            )}

            {result.allergens_found?.length > 0 && (
              <div className="result-section">
                <h4>Allergens Found</h4>
                <div className="tag-list">
                  {result.allergens_found.map((a, i) => (
                    <span key={i} className="tag tag-allergen">{a}</span>
                  ))}
                </div>
              </div>
            )}

            {result.ingredients?.length > 0 && (
              <div className="result-section">
                <h4>Full Ingredient List ({result.ingredients.length})</h4>
                <div className="ingredients-list">
                  {result.ingredients.map((ing, i) => (
                    <span key={i} className="ingredient-item">{ing}</span>
                  ))}
                </div>
              </div>
            )}

            <Button variant="outline" onClick={handleReset}>
              Analyze Another Product
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductAnalyzer;
