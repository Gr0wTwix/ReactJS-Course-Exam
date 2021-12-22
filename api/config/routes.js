const router = require("express").Router();

const shoesController = require('../controllers/shoesController');
const userController = require('../controllers/userController');

router.use('/api/user', userController);
router.use('/api/shoes', shoesController);

module.exports = router;