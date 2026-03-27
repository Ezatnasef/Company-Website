const router = require('express').Router();
const { getPublic, getDashboard, update } = require('../controllers/stats.controller');
const { protect, adminOnly } = require('../middleware/auth.middleware');

router.get('/', getPublic);
router.get('/dashboard', protect, adminOnly, getDashboard);
router.put('/', protect, adminOnly, update);

module.exports = router;
