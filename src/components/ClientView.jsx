import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClientView.css';

export default function ClientView() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(storedProducts);
  }, []);

  return (
    <div className="client-view-container">
      <main className="client-view-main">
        <div className="headings">
          <h1 className="heading-text">♻️ Welcome to SecondCart: Smart. Sustainable. Savvy.</h1>
          <h3 className="heading-caption">
            Why pay more for perfection? Rescue quality items with minor flaws, unlock exclusive discounts, and earn rewards for shopping sustainably.  
            Join the reCommerce revolution — where every dent tells a story worth saving.
          </h3>

        </div>
        <hr />
        {products.length === 0 ? (
          <div className="empty-state">
            <p className="empty-text">No products available yet.</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="card">
                <div className="points-button">{product.points} pts</div>
                <img
                  src={product.imageURL}
                  alt={product.name}
                  className="product-image"
                />
                <div className="card-content">
                  <div className="cost">${product.price}</div>
                  <div className="name">{product.name}</div>
                  <div className="category">{product.category}</div>
                  <hr />
                  <div className="details">
                    <p>Damage: {product.label}</p>
                    <p>Confidence: {product.confidence}%</p>
                  </div>
                  <button className="add-to-cart-button">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}