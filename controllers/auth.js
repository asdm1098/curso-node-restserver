const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require("../models/user");

const { generateJWT } = require("../helpers/generateJWT");
const { googleVerify } = require("../helpers/google-verify");



const login = async( req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verificar si el email existe
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                msg: "User / Email are invalid - email"
            })
        }

        //Si el usuario está activo
        if ( !user.status ) {
            return res.status(400).json({
                msg: "User / Email are invalid - status: false"
            });
        };

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: "User / Email are invalid - password"
            })
        }

        //Generar el JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contact the administrator'
        })
    }
    
}


const googleSignIn = async( req, res = response ) => {
    const { id_token } = req.body;

    try {
        const { name, email, img } = await googleVerify( id_token );
        let user = await User.findOne({ email });

        if (!user) {
            const data = {
                name,
                email,
                password: ':p',
                img,
                google: true,
                rol: 'USER_ROLE',
            };

            user = new User( data );
            await user.save();
        }

        // Si el usuario esta en BD
        if ( !user.status ) {
            res.status(401).json({
                msg: 'Contact admin'
            })
        }

        // Generar JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Token could not be verified'
        });
    }
    
}

module.exports = {
    login,
    googleSignIn
}