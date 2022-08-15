const express = require("express");
const cors = require("cors");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = "/api/users";

        this.middlewares();

        this.routes();
    }

    //Middlewares: extra functions to run in the server
    middlewares() {
        //CORS
        // this.app.use(cors);

        //Body JSON reading and serialization
        this.app.use(express.json());

        //Public directory
        this.app.use(express.static("public"));
    }

    //Application routes
    routes() {
        //Here we are configuring the path "/api/users" endpoint
        //for user requests
        this.app.use(this.usersPath, require("../routes/user"));
    }

    listening() {
        this.app.listen(this.port, () => {
            console.log(`Listening port ${this.port}`);
        });
    }
}

module.exports = Server;
