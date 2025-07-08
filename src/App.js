import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import DamageClassifier from './components/DamageClassifier';
import ProductList from './components/ProductList';
import ClientView from './components/ClientView';

// function App() {
//   return (
//     <BrowserRouter>
//     <Header />
//       <div className="content-wrapper"></div>
//       <Routes>
//         <Route path="/" element={<DamageClassifier />} />
//         <Route path="/products" element={<ProductList />} />
//         <Route path="/client-view" element={<ClientView />} />
//       </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
function App() {
  return (
    <BrowserRouter basename="/">
      <Header />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<DamageClassifier />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/client-view" element={<ClientView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
