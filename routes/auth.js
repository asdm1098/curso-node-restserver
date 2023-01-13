const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');

const { login, googleSignIn } = require('../controllers/auth');


const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
    validateFields
],login );

router.post('/google', [
    check('id_token', 'Id_token is required').notEmpty(),
    validateFields
], googleSignIn );


module.exports = router;