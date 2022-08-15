const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const app = express();

app.post("/login", (req, res) => {
    let body = req.body;

    User.findOne({email: body.email}, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {message: "User or password incorrect"}
            });
        }

        // Compares the incoming password with the database one
        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {message: "Password incorrect"}
            });
        }

        let token = jwt.sign(
            {
                user: userDB
                // expires in 30 days (seconds * min * hours * days )
            },
            process.env.SEED,
            {expiresIn: process.env.EXPIRE_DATE}
        );

        res.json({
            ok: true,
            userDB,
            token
        });
    });
});

module.exports = app;
