const { Product } = require('../models');
const { analyzeProduct } = require('../services/aiService');

exports.analyzeProduct = async (req, res) => {
  try {
    const productData = req.body;
    const analysisResult = await analyzeProduct(productData);
    
    const product = await Product.create({
      ...productData,
      impactScore: analysisResult.impactScore,
      userId: req.user.id
    });
    
    res.status(200).json({
      product: product.toJSON(),
      recommendations: analysisResult.recommendations
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductHistory = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { userId: req.user.id },
      order: [['analyzedAt', 'DESC']]
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};