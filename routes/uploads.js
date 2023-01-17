const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFileC, updateImage, showImg, updateImageCloudinary } = require('../controllers/uploads');
const { allowedCollections } = require('../helpers/db-validators');
const { validateFields, validateFileUpload } = require('../middlewares');


const router = Router();

router.post('/',validateFileUpload, uploadFileC);

router.put('/:collection/:id', [
    validateFileUpload,
    check('id', 'Must be a mongo Id').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users', 'products'] ) ),
    validateFields
], updateImageCloudinary );
// updateImage );

router.get('/:collection/:id', [
    check('id', 'Must be a mongo Id').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users', 'products'] ) ),
    validateFields
], showImg );


module.exports = router;