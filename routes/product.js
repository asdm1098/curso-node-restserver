const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, isAdminRole, validateFields } = require('../middlewares');
const { 
    createProduct, 
    getProducts, 
    getProduct, 
    updateProduct,
    deleteProduct
} = require('../controllers/product');
const { isExistProduct, isExistCategory } = require('../helpers/db-validators');


const router = Router();

router.get('/', getProducts );

router.get('/:id', [
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom( isExistProduct ),
    validateFields
], getProduct );

router.post('/', [
    validateJWT,
    check('name', 'Name is required').notEmpty(),
    check('category', 'It is not a valid id').isMongoId(),
    check('category').custom( isExistCategory),
    validateFields
], createProduct);

router.put('/:id', [
    validateJWT,
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom( isExistProduct ),
    validateFields
], updateProduct );

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom( isExistProduct ),
    validateFields
], deleteProduct );


module.exports = router;
