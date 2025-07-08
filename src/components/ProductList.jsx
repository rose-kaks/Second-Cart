import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(storedProducts);
  }, []);

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <div className="product-list-container">
      <div className="product-list-card">
        <div className="header">
          <div className="header-content">
            <svg className="header-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"/>
            </svg>
            <h1 className="header-title">Walmart Classified Products</h1>
          </div>
          <button
            onClick={() => navigate('/')}
            className="back-button"
          >
            Back to Classifier
          </button>
        </div>

        {products.length === 0 ? (
          <div className="empty-state">
            <p className="empty-text">No products classified yet.</p>
          </div>
        ) : (
          <>
            <div className="table-container">
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price ($)</th>
                    <th>Damage</th>
                    <th>Confidence</th>
                    <th>Points</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td>
                        <img
                          src={product.imageURL}
                          alt={product.name}
                          className="product-image"
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.price}</td>
                      <td>{product.label}</td>
                      <td>{product.confidence}%</td>
                      <td>{product.points}</td>
                      <td>{new Date(product.timestamp).toLocaleDateString()}</td>
                      <td>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="client-view-button-container">
              <button
                onClick={() => navigate('/client-view')}
                className="client-view-button"
              >
                Show Client View
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}