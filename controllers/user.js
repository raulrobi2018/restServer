const {response} = require("express");

const userGet = (req, res = response) => {
    const queryParams = req.query;

    res.json({msg: "get API - controller", queryParams});
};
const userPost = (req, res = response) => {
    const {name, age} = req.body;
    res.json({msg: "post API - controller", name, age});
};
const userPut = (req, res = response) => {
    const {id} = req.params;

    res.json({msg: "put API - controller", id});
};
const userDelete = (req, res = response) => {
    res.json({msg: "delete API - controller"});
};

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
};
