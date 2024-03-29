const {response} = require("express");
const User = require("../models/user");
const bcryptjs = require("bcrypt");
const {generateJWT} = require("../helpers/generateJWT");
const {googleVerify} = require("../helpers/google-verify");
const {json} = require("body-parser");

const login = async (req, res = response) => {
    const {email, password} = req.body;

    try {
        //Verify if the email exist
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                msg: "User or password are not valid"
            });
        }
        //Verify if the user is active
        if (!user.state) {
            return res.status(400).json({
                msg: "The user is not active"
            });
        }
        //Verify the password
        //Aquí está comparando el password que viene por request con el password de la base de datos
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "User or password are not valid - password"
            });
        }
        //Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Please, contact the administrator"});
    }
};

const googleSignIn = async (req, res = response) => {
    const {id_token} = req.body;

    try {
        const {name, picture, email} = await googleVerify(id_token);

        let user = await User.findOne({email});

        //If the user doesn't exist I have to create it
        if (!user) {
            const data = {
                name,
                email,
                //Si se pone vacía falla la creación porque en el Schema se solicita que la password
                //sea requerida
                password: ":P",
                img: picture,
                google: true
            };

            user = new User(data);
            try {
                await user.save();
            } catch (error) {
                return res.status(401).json({msg: "Failed creating the user"});
            }
        }

        //If the user is not active
        if (!user.state) {
            return res.status(401).json({
                msg: "User blocked. Contact the administrator"
            });
        }

        //Generate the JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "The token couldn't be verified"
        });
    }
};

module.exports = {
    login,
    googleSignIn
};
