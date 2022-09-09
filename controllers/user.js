const {response, request} = require("express");
const bcryptjs = require("bcrypt");

//Es una convención instanciar con mayúscula para cuando cree el modelo en Mongo
const User = require("../models/user");
const {validateFields} = require("../middlewares/field-validator");
const user = require("../models/user");

const userGet = async (req = request, res = response) => {
    //const queryParams = req.query;
    const {limit = 5, from = 0} = req.query;
    const condition = {state: true};

    const [total, users] = await Promise.all([
        User.countDocuments(condition),
        //En esta línea primero buscamos los usuarios con el estado en true, luego le indicamos
        //desde que registro traer y por último le decimos el límite que queremos de registros
        User.find(condition).skip(Number(from)).limit(Number(limit))
    ]);

    res.json({total, users});
};
const userPost = async (req, res = response) => {
    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});

    validateFields(req, res);

    //Encript the password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
    res.json(user);
};
const userPut = async (req, res = response) => {
    const {id} = req.params;
    const {_id, password, google, email, ...otherData} = req.body;
    //Update password
    if (password) {
        //Encript the password
        const salt = bcryptjs.genSaltSync();
        otherData.password = bcryptjs.hashSync(password, salt);
    }

    const userDb = await User.findByIdAndUpdate(id, otherData);
    res.json({msg: "put API - userPut", id, userDb});
};

const userDelete = async (req, res = response) => {
    const {id} = req.params;

    //Borrado físico
    //const user = await User.findByIdAndDelete(id);

    //Borrado lógico
    const user = await User.findByIdAndUpdate(id, {state: false});
    res.json(user);
};

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
};
