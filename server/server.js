/* When this file is executed, it will configure all the content it has, 
so at this moment the 'process' object for example will be available here */
require("./config/config");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

/* ********************************************* */
/* These both 'use' sentences are middleweares. 
Every time a request is send to the server, the middleweares are executed*/

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());
/* ********************************************* */

app.get("/", (req, res) => {
    res.json("Hello World");
});

app.post("/user", (req, res) => {
    let body = req.body;

    if (body.name === undefined) {
        res.status(400).json({
            ok: false,
            message: "The name is required"
        });
    } else {
        res.json({
            body
        });
    }
});

app.put("/user/:id", (req, res) => {
    let id = req.params.id;
    res.json({
        id
    });
});

app.delete("/user", (req, res) => {
    res.json("Delete user");
});

app.listen(process.env.PORT, () => {
    console.log(`Listening port ${process.env.PORT}`);
});
