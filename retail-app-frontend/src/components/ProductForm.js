import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ fetchProducts }) => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    status: 'active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:80/api/products', productData)
      .then(response => {
        fetchProducts(); // Trigger a re-fetch of the product list
      })
      .catch(error => console.error('There was an error creating the product!', error));
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
