const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

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

app.listen(3000, () => {
    console.log(`Listening port ${port}`);
});
