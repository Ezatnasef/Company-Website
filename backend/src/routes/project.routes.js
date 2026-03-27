const router = require('express').Router();
const { getAll, getOne, create, update, remove } = require('../controllers/project.controller');
const { protect, adminOnly } = require('../middleware/auth.middleware');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', protect, adminOnly, create);
router.put('/:id', protect, adminOnly, update);
router.delete('/:id', protect, adminOnly, remove);

module.exports = router;
