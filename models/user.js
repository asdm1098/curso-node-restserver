
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String, 
        required: [true, 'Name is required']
    },
    email: {
        type: String, 
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String, 
        required: [true, 'Password is required'],
    },
    img: {
        type: String, 
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//Quitar el id que se retorna en mongo
UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
};

module.exports = model( 'User', UserSchema );
