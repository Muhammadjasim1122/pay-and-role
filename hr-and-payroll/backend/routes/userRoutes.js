const express = require('express');
const router = express.Router();
const { signup, googleSignup, login } = require('../controllers/userController');

// Route: POST /api/auth/signup
router.post('/signup', signup);

// Route: POST /api/auth/google-signup
router.post('/google-signup', googleSignup);

// Route: POST /api/auth/login
router.post('/login', login);

module.exports = router; 