const { response } = require("express");
const { isValidObjectId } = require("mongoose");

const { User, Category, Product } = require('../models');

const allowedCollections = [
    'users',
    'category',
    'products',
    'roles'
];


const searchUser = async( term = '', res = response ) => {

    const isMongoId = isValidObjectId(term);

    if ( isMongoId ) {
        const user = await User.findById({ _id: term, status: true})
        return res.json({
            results: (user) ? [ user ] : []
        });
    }

    const regex = new RegExp( term, 'i');

    const total = await User.count({ 
        $or: [{ name: regex }, { email: regex}],
        $and: [{ status: true }]
    });

    const users = await User.find({ 
        $or: [{ name: regex }, { email: regex}],
        $and: [{ status: true }]
    });

    res.json({
        total,
        results: users
    });

}

const searchCategory = async( term = '', res = response ) => {

    const isMongoId = isValidObjectId(term);

    if ( isMongoId ) {
        const category = await Category.findById({ _id: term, status: true})
        return res.json({
            results: (category) ? [ category ] : []
        });
    }

    const regex = new RegExp( term, 'i');

    const total = await Category.count({ name: regex, status: true });

    const categories = await Category.find({ name: regex, status: true });

    res.json({
        total,
        results: categories
    });

}

const searchProduct = async( term = '', res = response ) => {

    const isMongoId = isValidObjectId(term);

    if ( term.includes('*') ) {
        return res.status(400).json({
            msg: `${term} character not valid`
        })
    };

    if ( isMongoId ) {
        const product = await Product.findById({ _id: term, status: true})
                                    .populate('category', 'name');
        return res.json({
            results: (product) ? [ product ] : []
        });
    }

    const regex = new RegExp( term, 'i');

    const total = await Product.count({ name: regex, status: true });

    const products = await Product.find({ name: regex, status: true })
                                .populate('category', 'name');

    res.json({
        total,
        results: products
    });

}

const search = ( req, res = response ) => {

    const { collection, term } = req.params;
    if ( !allowedCollections.includes( collection )) {
        return res.status(400).json({
            msg: ` The permitted Collections are: ${ allowedCollections }`
        })
    }

    switch (collection) {
        case 'users':
            searchUser( term, res );
        break;

        case 'category':
            searchCategory( term, res );
        break;

        case 'products':
            searchProduct( term, res );
        break;

        default:
            res.status(500).json({
                msg: 'I forgot to do this search'
            });
    
    }

}


module.exports = {
    search
}