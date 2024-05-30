import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ProductForm from './components/ProductForm';

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const fetchProducts = () => {
    setRefresh(prev => !prev); // Toggle the refresh state to trigger re-fetch
  };

  return (
    <div>
      <h1>Retail App</h1>
      <ProductForm fetchProducts={fetchProducts} />
      <ProductSearch setProducts={fetchProducts} />
      <ProductList refresh={refresh} />
    </div>
  );
};

export default App;
