const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


const validateJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No token in request'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        //Leer el usuarioq ue corresponde al uid
        const user = await User.findById(uid);

        if ( !user ) {
            return res.status(401).json({
                msg: 'Token not valid - user not exist'
            }); 
        }


        //Verificar si el uid tiene estado true
        if (!user.status ) {
            return res.status(401).json({
                msg: 'Token not valid - user with status: false'
            }); 
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token not valid'
        });
    }


}

module.exports = {
    validateJWT
}