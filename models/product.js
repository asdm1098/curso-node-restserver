const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: { type: String },
    avaliable: { type: Boolean, default: true }

});

//Quitar el id que se retorna en mongo
ProductSchema.methods.toJSON = function() {
    const { __v, status, ...data } = this.toObject();
    return data;
};


module.exports = model( 'Product', ProductSchema );