const {response} = require("express");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

const validateJWT = async (req, res = response, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({msg: "There isn't a token"});
    }

    try {
        //Verify the JWT with the secret key
        //If the token is not valid, then will be catched and return the 401 error
        const {uid} = jwt.verify(token, process.env.JWT_SECRET_KEY);
        //Get the user corresponding to the uid from the database
        const userAuth = await user.findById(uid);

        //Verify if the user exist
        if (!userAuth) {
            return res.status(401).json({
                msg: "The user does not exist"
            });
        }
        //Verify if the state of the userAuth is true
        if (!userAuth.state) {
            return res.status(401).json({
                msg: "The user is not active"
            });
        }

        //Add the uid to the request to be used in the userDelete method in the controller
        //All data that we add to the request will be accesed by any middleware that run after
        req.userAuth = userAuth;

        next();
    } catch (error) {
        console.log("Error", {error});
        res.status(401).json({
            msg: "Token not valid"
        });
    }
};

module.exports = {
    validateJWT
};
