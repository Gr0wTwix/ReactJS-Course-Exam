const authValidationMiddleware = require('../middleware/auth-middleware');
const shoesControllers = require('../services/shoes');
const router = require("express").Router();

router.get('/', shoesControllers.getAllShoePosts);
router.get('/:shoeId', shoesControllers.getShoeById);

// applying auth middleware to the routes below,so the middleware will check if the token is valid and authorize the users
router.use(authValidationMiddleware);

router.post('/', shoesControllers.createShoePost);
router.patch('/:shoeId', shoesControllers.editShoeById);
router.delete('/:shoeId', shoesControllers.deleteShoeById);

module.exports = router;