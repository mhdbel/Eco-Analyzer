const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const xss = require('xss-clean');
const hpp = require('hpp');
const morgan = require('morgan');
const winston = require('./config/logger');
const sequelize = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Security Middlewares
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'trusted-cdn.com'],
      styleSrc: ["'self'", 'fonts.googleapis.com']
    }
  }
}));
app.use(cors({
  origin: ['https://yourdomain.com ', 'https://staging.yourdomain.com '],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(xss());
app.use(hpp());
app.use(compression());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later'
}));
app.use(express.json({ limit: '10kb' }));
app.use(morgan('combined', { stream: { write: (msg) => winston.info(msg) } }));

// Database connection
sequelize.authenticate()
  .then(() => winston.info('Database connected'))
  .catch((err) => winston.error('Database connection failed:', err));

// Routes
app.use('/api', productRoutes);
app.use('/api', authRoutes);

// Error handling
app.use((err, req, res, next) => {
  winston.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

module.exports = app;