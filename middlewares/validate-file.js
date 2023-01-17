const { response } = require("express");

const validateFileUpload = ( req, res = response, next ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json({ msg: 'No files were uploaded.' });
        return;
    }

    next();
}

module.exports = {
    validateFileUpload,
}