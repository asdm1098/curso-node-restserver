const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.usersPath = '/api/users';
        // Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
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
        this.app.use( this.usersPath, require('../routes/user') );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Sevidor corriendo en puerto:', this.port);
        });
    }
}

module.exports = Server;
