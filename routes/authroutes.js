const { Router } = require('express');
const router = Router();
const authControllers = require('../controllers/authControllers');

router.post('/signup', authControllers.signUp);
router.post('/signin', authControllers.signIn);
router.get('/logout', authControllers.logout);

module.exports = router;