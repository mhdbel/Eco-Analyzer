const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/analyze', authMiddleware, productController.analyzeProduct);
router.get('/products', authMiddleware, productController.getProductHistory);

module.exports = router;