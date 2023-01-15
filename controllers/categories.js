const { response, request } = require("express");
const { Category } = require("../models");

// Obtener categorias - paginado - total -populate
const getCategories = async( req = request, res = response ) => {
    const { limit = 5, from } = req.query;
    const query = { status: true }

    const [ total, categories ] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
                .populate("user", "name")
                .skip( from )
                .limit( limit )
    ]);

    res.json({
        total,
        categories
    });

}
// Obtener categoria - populate {}
const getCategory = async(req, res = response) => {
    const { id } = req.params;
    const category = await Category.findById(id).populate("user", "name");
    res.json(category);
}


const createCategory = async( req, res = response ) => {

    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name });

    if ( categoryDB ) {
        return res.status(400).json({
            msg: `The ${ categoryDB.name } category already exists `
        })
    }

    // Generar la data a guardar
    const data = {
        name,
        user: req.user._id
    }

    const category = new Category( data );

    // Guardar DB
    await category.save();

    res.status(201).json(category);

}


const updateCategory = async( req, res = response ) => {

    const { id } = req.params;
    const { status, user, ...data } = req.body;
    
    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const categoryDB = await Category.findOne({ name: data.name });

    if ( categoryDB ) {
        return res.status(400).json({
            msg: `The ${ categoryDB.name } category already exists `
        })
    }

    const category = await Category.findByIdAndUpdate( id, data, { new: true });
    res.json(category);

}

// Eliminar  Categoria - estado: false
const deleteCategory = async( req, res = response ) => {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true });
    res.json( category );
}



module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}