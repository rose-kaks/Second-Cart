import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as tf from '@tensorflow/tfjs';
import './DamageClassifier.css';

const LABELS = ["Slight", "Severe"];
const CATEGORIES = ["Electronics", "Clothing", "Home & Garden", "Toys", "Books", "Other"];

export default function DamageClassifier() {
  const [model, setModel] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: '',
    category: '',
    price: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadModel = async () => {
      try {
        const modelPath = process.env.PUBLIC_URL + '/model/model.json';
        const loadedModel = await tf.loadLayersModel(modelPath);
        setModel(loadedModel);
        setError(null);
      } catch (error) {
        console.error("Error loading model:", error);
        setError("Failed to load the classification model. Please try again later.");
      }
    };
    loadModel();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageURL(url);
    setResult(null);
    setError(null);
    setShowModal(false);
    setProductDetails({ name: '', category: '', price: '' });
    setTimeout(() => classifyImage(url), 100);
  };

  const classifyImage = async (url) => {
    if (!model) {
      setError("Model not loaded. Please try again.");
      setLoading(false);
      return;
    }
    setLoading(true);

    const img = new Image();
    img.src = url;
    img.crossOrigin = "anonymous";
    img.onload = async () => {
      try {
        const tensor = tf.browser
          .fromPixels(img)
          .resizeNearestNeighbor([224, 224])
          .toFloat()
          .div(tf.scalar(255))
          .expandDims();

        const prediction = await model.predict(tensor).data();
        const maxIdx = prediction.indexOf(Math.max(...prediction));
        const confidence = (prediction[maxIdx] * 100).toFixed(2);
        const p_slight = LABELS[maxIdx] === "Slight" ? prediction[maxIdx] : 1 - prediction[maxIdx];
        const p_severe = 1 - p_slight;

        // Points logic: weighted average based on probabilities
        const points = Math.round(Math.min(Math.max(p_slight * 50 + p_severe * 500, 50), 500));

        setResult({
          label: LABELS[maxIdx],
          confidence,
          points,
          imageURL: url,
        });
        setError(null);
      } catch (error) {
        console.error("Error classifying image:", error);
        setError("Failed to classify the image. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    img.onerror = () => {
      setLoading(false);
      setError("Error loading image. Please upload a valid image.");
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    if (!result || !productDetails.name || !productDetails.category || !productDetails.price) {
      alert('Please fill out all product details.');
      return;
    }
    if (isNaN(productDetails.price) || productDetails.price <= 0) {
      alert('Please enter a valid price.');
      return;
    }

    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const newProduct = {
      id: Date.now(),
      imageURL: result.imageURL,
      label: result.label,
      confidence: result.confidence,
      points: result.points,
      name: productDetails.name,
      category: productDetails.category,
      price: parseFloat(productDetails.price).toFixed(2),
      timestamp: new Date().toISOString(),
    };
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    alert('Product added successfully!');
    setImageURL(null);
    setResult(null);
    setShowModal(false);
    setProductDetails({ name: '', category: '', price: '' });
  };

  return (
    <div className="damage-classifier-container">
      <div className="damage-classifier-card">
        <div className="header">
          <div className="header-content">
            <svg className="header-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"/>
            </svg>
            <h1 className="header-title">Walmart Damage Classifier</h1>
          </div>
          <div className="header-actions">
            <span className="header-subtitle">Powered by TEAM</span>
            <button
              onClick={() => navigate('/products')}
              className="view-products-button"
            >
              View Products
            </button>
          </div>
        </div>

        {error && (
          <div className="error-container fade-in">
            <p className="error-text">{error}</p>
          </div>
        )}

        <div className="upload-container">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="upload-input"
          />
          <div className="upload-content">
            <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V8m0 0L3 12m4-4l4 4m6 0v8m0 0l4-4m-4 4l-4-4" />
            </svg>
            <p className="upload-text">Upload an image of the product</p>
            <p className="upload-subtext">Supported formats: JPG, PNG</p>
          </div>
        </div>

        {imageURL && (
          <div className="preview-container fade-in">
            <h2 className="preview-title">Preview</h2>
            <img
              src={imageURL}
              alt="Uploaded preview"
              className="preview-image"
            />
          </div>
        )}

        {loading && (
          <div className="loading-container fade-in">
            <div className="spinner"></div>
            <p className="loading-text">Analyzing product condition...</p>
          </div>
        )}

        {result && (
          <div className="result-container fade-in">
            <h2 className="result-title">Analysis Result</h2>
            <div className="result-grid">
              <div>
                <p className="result-label">Damage Assessment</p>
                <p className={`result-value ${result.label === 'Slight' ? 'text-blue' : 'text-red'}`}>
                  {result.label}
                </p>
              </div>
              <div>
                <p className="result-label">Confidence</p>
                <div className="confidence-bar">
                  <div
                    className={`confidence-fill ${result.confidence > 70 ? 'bg-blue' : 'bg-yellow'}`}
                    style={{ width: `${result.confidence}%` }}
                  >
                    <span className="confidence-text">{result.confidence}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="discount-container">
              <span className="discount-text">
                Points Awarded: {result.points}
              </span>
            </div>
            <div className="action-container">
              <button
                onClick={() => setShowModal(true)}
                className="add-product-button"
              >
                Add Product
              </button>
              <button
                onClick={() => {
                  setImageURL(null);
                  setResult(null);
                  setShowModal(false);
                  setProductDetails({ name: '', category: '', price: '' });
                }}
                className="reset-button"
              >
                Upload Another Image
              </button>
            </div>
          </div>
        )}

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content fade-in">
              <h2 className="modal-title">Enter Product Details</h2>
              <div className="modal-form">
                <div className="form-group">
                  <label htmlFor="name">Product Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={productDetails.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={productDetails.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price ($)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={productDetails.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button
                  onClick={handleAddProduct}
                  className="modal-submit-button"
                >
                  Submit
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="modal-cancel-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}