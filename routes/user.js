const { Router } = require('express');
const { check } = require('express-validator');
const { 
    getUsers, 
    putUser, 
    postUser, 
    deleteUser,
    patchUser 
} = require('../controllers/user');
const { isRoleValid, isEmailExists, isExistUserById } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', getUsers);

router.put('/:id',[
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom( isExistUserById ),
    check('rol').custom( isRoleValid ),
    validateFields
], putUser);

router.post('/',[
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'Password must be more than 6 characters').isLength({ min: 6 }),
    check('email', 'The email is not valid').isEmail(),
    check('email').custom( isEmailExists ),
    // check('rol', 'The email is not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( isRoleValid ),
    validateFields
], postUser);

router.delete('/:id', [
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom( isExistUserById ),
    validateFields
], deleteUser);

router.patch('/', patchUser )

module.exports = router;