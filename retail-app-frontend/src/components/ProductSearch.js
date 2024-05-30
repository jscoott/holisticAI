import React, { useState } from 'react';
import axios from 'axios';

const ProductSearch = () => {
  const [searchParams, setSearchParams] = useState({
    productName: '',
    minPrice: '',
    maxPrice: '',
    minPostedDate: '',
    maxPostedDate: ''
  });

  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams(searchParams).toString();
    axios.get(`http://localhost:80/api/products/search?${queryParams}`)
      .then(response => setSearchResults(response.data))
      .catch(error => console.error('There was an error searching the products!', error));
  };

  const handleClear = () => {
    setSearchParams({
      productName: '',
      minPrice: '',
      maxPrice: '',
      minPostedDate: '',
      maxPostedDate: ''
    });
    setSearchResults([]);
  };

  return (
    <div>
      <h2>Search Products</h2>
      <input type="text" name="productName" placeholder="Product Name" value={searchParams.productName} onChange={handleChange} />
      <input type="number" name="minPrice" placeholder="Min Price" value={searchParams.minPrice} onChange={handleChange} />
      <input type="number" name="maxPrice" placeholder="Max Price" value={searchParams.maxPrice} onChange={handleChange} />
      <input type="date" name="minPostedDate" placeholder="Min Posted Date" value={searchParams.minPostedDate} onChange={handleChange} />
      <input type="date" name="maxPostedDate" placeholder="Max Posted Date" value={searchParams.maxPostedDate} onChange={handleChange} />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleClear}>Clear</button>

      <h3>Search Results</h3>
      <ul>
        {searchResults.map(product => (
          <li key={product._id}>
            {product.name} - ${product.price} - {product.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductSearch;