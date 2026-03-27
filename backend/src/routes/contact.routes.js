const router = require('express').Router();
const { create, getAll, updateStatus, remove } = require('../controllers/contact.controller');
const { protect, adminOnly } = require('../middleware/auth.middleware');
const { contactLimiter } = require('../middleware/rateLimiter.middleware');

router.post('/', contactLimiter, create);
router.get('/', protect, adminOnly, getAll);
router.patch('/:id', protect, adminOnly, updateStatus);
router.delete('/:id', protect, adminOnly, remove);

module.exports = router;
