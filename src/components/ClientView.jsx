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
          <h1 className="heading-text">Save More with Eco-Saver Mode</h1>
          <h3 className="heading-caption">
            Discover great deals on gently used products. Earn points with every purchase!
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