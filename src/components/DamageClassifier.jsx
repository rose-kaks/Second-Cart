import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as tf from '@tensorflow/tfjs';
import './DamageClassifier.css';

const LABELS = ["Slight", "Severe"];

export default function DamageClassifier() {
  const [model, setModel] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel("/model/model.json");
        setModel(loadedModel);
      } catch (error) {
        console.error("Error loading model:", error);
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
    setTimeout(() => classifyImage(url), 100);
  };

  const classifyImage = async (url) => {
    if (!model) return;
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

        // Dynamic discount logic: weighted average based on probabilities
        const discount = (p_slight * 5 + p_severe * 50).toFixed(2);

        setResult({
          label: LABELS[maxIdx],
          confidence,
          discount: `${discount}%`,
          imageURL: url,
        });
      } catch (error) {
        console.error("Error classifying image:", error);
      } finally {
        setLoading(false);
      }
    };
    img.onerror = () => {
      setLoading(false);
      console.error("Error loading image");
    };
  };

  const handleAddProduct = () => {
    if (!result) return;
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const newProduct = {
      id: Date.now(),
      imageURL: result.imageURL,
      label: result.label,
      confidence: result.confidence,
      discount: result.discount,
      timestamp: new Date().toISOString(),
    };
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    alert('Product added successfully!');
    setImageURL(null);
    setResult(null);
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
                Suggested Discount: {result.discount}
              </span>
            </div>
            <div className="action-container">
              <button
                onClick={handleAddProduct}
                className="add-product-button"
              >
                Add Product
              </button>
              <button
                onClick={() => setImageURL(null)}
                className="reset-button"
              >
                Upload Another Image
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}