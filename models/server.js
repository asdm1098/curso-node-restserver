const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            categories: '/api/categories',
            products:   '/api/products',
            search:     '/api/search',
            users:      '/api/users',
        }

        //Conectar a base de datos
        this.connectDB();

        // Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    async connectDB() {
        //Se podria crear varias conexiones y leer de process.env y saber si estamos en 
        //produccion o en desarrollo y elegir cual utilizar.
        await dbConnection();
    }


    middlewares() {

        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body (POST-PUT)
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public') );
    }


    routes() {
        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.search, require('../routes/search') );
        this.app.use( this.paths.categories, require('../routes/categories') );
        this.app.use( this.paths.users, require('../routes/user') );
        this.app.use( this.paths.products, require('../routes/product') );

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Sevidor corriendo en puerto:', this.port);
        });
    }
}

module.exports = Server;