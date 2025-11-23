const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const authController = require('../controllers/authController');

const dynamicLoginLimiter = (req, res, next) => {
    // Guardamos el limitador en 'app.locals' que se limpia al reiniciar la app
    if (!req.app.locals.loginLimiter) {
        req.app.locals.loginLimiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutos
            max: 5, // 5 intentos
            message: {
                error: 'Demasiados intentos de login. Por favor intenta nuevamente en 15 minutos.'
            },
            standardHeaders: true,
            legacyHeaders: false,
            handler: (req, res) => {
                res.status(429).json({
                    error: 'Demasiados intentos de login desde esta IP. Por favor intenta más tarde.'
                });
            },
            keyGenerator: (req) => req.ip || req.connection.remoteAddress
        });
    }
    return req.app.locals.loginLimiter(req, res, next);
};

// Rutas
router.post('/login', dynamicLoginLimiter, authController.login);
router.post('/register', authController.register);
router.post('/auth/verify', authController.verifyToken);
router.post('/check-username', authController.checkUsername);

module.exports = router;