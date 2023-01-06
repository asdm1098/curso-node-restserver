const { response, request } =  require('express');


const getUsers = ( req = request, res = response ) => {

    const { q, name, page = 10 } = req.query;

    res.json({
        msg: "get Api - Controlador",
        q,
        name,
        page
    });
};

const putUser = ( req, res = response ) => {

    const { id } = req.params;

    res.json({
        msg: "put Api - Controlador",
        id
    });
};

const postUser = ( req, res = response ) => {

    const { name, age } = req.body;

    res.status(201).json({
        msg: "post Api - Controlador",
        name,
        age
    });
};

const deleteUser = ( req, res = response ) => {
    res.json({
        msg: "delete Api - Controlador"
    });
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