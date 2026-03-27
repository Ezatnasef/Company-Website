const router = require('express').Router();
const { login, getMe, changePassword } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { authLimiter } = require('../middleware/rateLimiter.middleware');

router.post('/login', authLimiter, login);
router.get('/me', protect, getMe);
router.post('/change-password', protect, changePassword);

module.exports = router;
