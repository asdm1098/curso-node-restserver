const validateFields = require('../middlewares/validate-fields');
const validateRoles  = require('../middlewares/validate-roles');
const validateJWT    = require('../middlewares/validate-jwt');
const validateFileUpload = require('./validate-file');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
    ...validateFileUpload,    
}