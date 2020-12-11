const express = require("express");
const app = express();

const bcrypt = require("bcrypt");
const _ = require("underscore");

const User = require("../models/user");

app.get("/user", (req, res) => {
    let from = req.query.from || 0;
    let limit = req.query.limit || 5;

    from = Number(from);
    limit = Number(limit);

    User.find({})
        .skip(from)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                users
            });
        });
});

app.post("/user", (req, res) => {
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    // The err and userDb params are the response after mongoose saves the object
    user.save((err, userDb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDb
        });
    });
});

app.put("/user/:id", (req, res) => {
    let id = req.params.id;
    // The pick function of underscore plugin, takes only the params we specify
    // in the array, so the rest of the params will not be updated
    let body = _.pick(req.body, ["name", "email", "img", "role", "estado"]);

    User.findByIdAndUpdate(
        id,
        body,
        // new: permit return the new object updated
        // runValidators: controls the validator defined in the user model. In this case, the roles permmited
        {new: true, runValidators: true},
        (err, userDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                user: userDB
            });
        }
    );
});

app.delete("/user", (req, res) => {
    res.json("Delete user");
});

module.exports = app;
