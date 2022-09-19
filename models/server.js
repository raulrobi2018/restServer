const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const {dbConnection} = require("../database/config");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            //Path to the authentication
            authPath: "/api/auth",
            categiriesPath: "/api/categories",
            productsPath: "/api/products",
            searchPath: "/api/search",
            uploadsPath: "/api/uploads",
            usersPath: "/api/users"
        };

        //Database conection
        this.connectDatabase();

        //Middlewares
        this.middlewares();

        //Applications routes
        this.routes();
    }

    async connectDatabase() {
        await dbConnection();
    }

    //Middlewares: extra functions to run in the server
    middlewares() {
        //CORS
        this.app.use(cors());

        //Body JSON reading and serialization
        this.app.use(express.json());

        //Public directory
        this.app.use(express.static("public"));

        //Middleware to manage the express-fileupload
        this.app.use(
            fileUpload({
                useTempFiles: true,
                tempFileDir: "/tmp/"
            })
        );
    }

    //Application routes
    routes() {
        //Configuration path for authentication
        this.app.use(this.paths.authPath, require("../routes/auth"));
        //Here we are configuring the path "/api/users" endpoint
        //for user requests
        this.app.use(this.paths.usersPath, require("../routes/user"));
        this.app.use(
            this.paths.categiriesPath,
            require("../routes/categories")
        );
        this.app.use(this.paths.productsPath, require("../routes/products"));
        this.app.use(this.paths.searchPath, require("../routes/search"));
        this.app.use(this.paths.uploadsPath, require("../routes/uploads"));
    }

    listening() {
        this.app.listen(this.port, () => {
            console.log(`Listening port ${this.port}`);
        });
    }
}

module.exports = Server;
