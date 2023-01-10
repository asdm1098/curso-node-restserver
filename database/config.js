const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.MONGODB_CNN );
        console.log('Online database !');
    } catch (error) {
        console.log('Este es el errorrr !!!',error);
        throw new Error('Error starting database');
    }
}

module.exports = {
    dbConnection
}