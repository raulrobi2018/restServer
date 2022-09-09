const {response} = require("express");
const User = require("../models/user");
const bcryptjs = require("bcrypt");
const {generateJWT} = require("../helpers/generateJWT");

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

module.exports = {
    login
};
