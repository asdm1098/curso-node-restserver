
const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async(rol = '') => {
    const existRole = await Role.findOne({ rol });
    if ( !existRole ) {
        throw new Error(`Role ${rol} doesn't exist`)
    }
    
}

//verificar si el correo existe
const isEmailExists = async( email = '' ) => {
    const existEmail = await User.findOne({ email });
    if( existEmail ) {
        throw new Error(`The email is already registered`)
    };
}

const isExistUserById = async ( id ) => {
    const existUser = await User.findById(id);
    if( !existUser ) {
        throw new Error(`The Id ${id} doesn't exist`);
    };
}

module.exports = {
    isRoleValid,
    isEmailExists,
    isExistUserById,
}