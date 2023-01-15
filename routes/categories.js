const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory,
        getCategories,
        getCategory,
        updateCategory,
        deleteCategory
    } = require('../controllers/categories');

    const { validateJWT, isAdminRole } = require('../middlewares');
    const { validateFields } = require('../middlewares/validate-fields');
    
    const { isExistCategory } = require('../helpers/db-validators');

const router = Router();

// Obtener todas las categorias - publico
router.get('/', getCategories);

// Obtener una categoriaa por Id - publico
router.get('/:id', [
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom( isExistCategory ),
    validateFields
], getCategory );

// Crear categoriaa privado - cualquiera con token valido
router.post('/',[
    validateJWT,
    check('name', 'Name is required').notEmpty(),
    validateFields
], createCategory );

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validateJWT,
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom( isExistCategory ),
    check('name', 'Name is required').notEmpty(),
    validateFields
], updateCategory );

// Borrar una categoriaa por Id - dmin
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom( isExistCategory ),
    validateFields
], deleteCategory );



module.exports = router;