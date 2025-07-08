import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DamageClassifier from './components/DamageClassifier';
import ProductList from './components/ProductList';
import ClientView from './components/ClientView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DamageClassifier />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/client-view" element={<ClientView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

