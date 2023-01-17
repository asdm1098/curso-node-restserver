const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { response } = require("express");

const { uploadFile } = require("../helpers/upload-file");
const { User, Product } = require("../models");

const uploadFileC = async(req, res = response) => {

    try {
        // const name = await uploadFile( req.files, ['txt', 'md'], 'imagenes' );
        const name = await uploadFile( req.files, undefined, 'imagenes' );
    
        res.json({ 
            name 
        });
    } catch (msg) {
        res.status(400).json({ msg });
    }
}

const updateImage = async( req, res = response ) => {

    const { id, collection } = req.params;

    let model;

    switch ( collection ) {
        case 'users':
            model = await User.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `No user exists with id ${id}`
                })
            }    
        break;

        case 'products':
            model = await Product.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `No Product exists with id ${id}`
                })
            }    
        break;

        default:
            return res.status(500).json({ msg: 'I forget add this'});
    }

    // Limpiar imágenes previas
    if ( model.img ) {
        // Hay que borrar la imágen del servidor
        const pathImg = path.join( __dirname, '../uploads', collection, model.img );
        if ( fs.existsSync(pathImg) ) {
            fs.unlinkSync( pathImg );
        }
    }

    model.img = await uploadFile( req.files, undefined, collection );
    await model.save();
    res.json(model);
};

const updateImageCloudinary = async( req, res = response ) => {

    const { id, collection } = req.params;

    let model;

    switch ( collection ) {
        case 'users':
            model = await User.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `No user exists with id ${id}`
                })
            }    
        break;

        case 'products':
            model = await Product.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `No Product exists with id ${id}`
                })
            }    
        break;

        default:
            return res.status(500).json({ msg: 'I forget add this'});
    }

    // Limpiar imágenes previas
    if ( model.img ) {
        // Hay que borrar la imágen del servidor
        // const nameArr = model.img.split('/');
        // const name = nameArr[ nameArr.length - 1 ];
        // const [ public_id ] = name.split('.');
        const public_id = model.img.split('/').pop().split('.').shift();
        cloudinary.uploader.destroy( `node-Cafe/${collection}/${public_id}` );
        
    }

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath, { folder: `node-Cafe/${collection}`} );

    model.img = secure_url;
    await model.save();

    res.json(model);
};

const showImg = async( req, res = response ) => {

    const { id, collection } = req.params;

    let model;

    switch ( collection ) {
        case 'users':
            model = await User.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `No user exists with id ${id}`
                })
            }    
        break;

        case 'products':
            model = await Product.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `No Product exists with id ${id}`
                })
            }    
        break;

        default:
            return res.status(500).json({ msg: 'I forget add this'});
    }

    // Limpiar imágenes previas
    if ( model.img ) {
        // Hay que borrar la imágen del servidor
        const pathImg = path.join( __dirname, '../uploads', collection, model.img );
        if ( fs.existsSync(pathImg) ) {
            return res.sendFile( pathImg )
        } 
    }
    const pathNoImg = path.join( __dirname, '../assets/no-image.jpg');
    res.sendFile(pathNoImg);
};

module.exports = {
    uploadFileC,
    updateImage,
    showImg,
    updateImageCloudinary
}