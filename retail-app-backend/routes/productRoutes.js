const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');

router.get('/products', productController.listActiveProducts);
router.get('/products/search', productController.searchProducts);
router.post('/products', productController.createProduct);

module.exports = router;