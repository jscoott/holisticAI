import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ refresh }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    axios.get('http://localhost:80/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('There was an error fetching the products!', error));
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  return (
    <div>
      <h2>Active Products</h2>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - ${product.price} - {product.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
