const express = require('express');
const router = express.Router();
const vulnerabilityController = require('../controllers/vulnerabilityController');
const { uploadMiddleware, uploadFile } = require('../controllers/uploadController');
const csrf = require('csurf');

const csrfProtection = csrf();

const validateOrigin = (req, res, next) => {
  const origin = req.get('Origin');
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:5000', 'http://127.0.0.1:3000'];

  if (origin && !allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: 'Origin invalid' });
  }
  next();
};

// Command Injection
router.post('/ping', vulnerabilityController.ping);

// CSRF - Transferencia
router.post('/transfer', validateOrigin, csrfProtection, vulnerabilityController.transfer);

router.get('/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Local File Inclusion
router.get('/file', vulnerabilityController.readFile);

// File Upload
router.post('/upload', uploadMiddleware, uploadFile);

module.exports = router;