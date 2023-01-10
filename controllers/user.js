const { response, request } =  require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = async( req = request, res = response ) => {
    const { limit = 5, from } = req.query;
    const query = { status: true };

    // const users = await User.find(query)
    //     .skip( from )
    //     .limit(Number(limit))

    // const total = await User.countDocuments(query);

    const [ total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( from )
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });
};

const putUser = async( req, res = response ) => {

    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    //Todo validar contra bd
    if ( password ) {
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.json(user);
};

const postUser = async( req, res = response ) => {

    const { name, email, password, rol } = req.body;
    const user = new User( { name, email, password, rol } );

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );
    //Guardar en BD
    await user.save();

    res.status(201).json({
        user
    });
};

const deleteUser = async( req, res = response ) => {

    const { id } = req.params;

    //Fisicamente lo borramos
    // const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, { status: false });


    res.json(user);
};

const patchUser = ( req, res = response ) => {
    res.json({
        msg: "patch Api - Controlador"
    });
};


module.exports = {
    getUsers,
    putUser,
    postUser,
    deleteUser,
    patchUser
}