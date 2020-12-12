/* When this file is executed, it will configure all the content it has, 
so at this moment the 'process' object for example will be available here */
require("./config/config");

const express = require("express");
const mongoose = require("mongoose");

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

app.use(require("./routes/user"));

mongoose.connect(
    process.env.URLDB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    (err) => {
        if (err) {
            throw err;
        }
        console.log("Database online");
    }
);

app.listen(process.env.PORT, () => {
    console.log(`Listening port ${process.env.PORT}`);
});
