const {response} = require("express");
const {ObjectId} = require("mongoose").Types;
const {User, Category, Product} = require("../models");

const allowedCollections = ["categories", "products", "roles", "users"];

const searchUsers = async (term = "", res = response) => {
    //Chequea si lo que se envía en term es un id de Mongo o no
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const user = await User.findById(term);
        return res.json({results: user ? [user] : []});
    }

    //Que sea insensible a mayúsculas y minúsculas
    const regex = new RegExp(term, "i");

    const users = await User.find({
        //Condiciones de búsqueda
        $or: [{name: regex}, {email: regex}],
        $and: [{state: true}]
    });
    res.json({
        results: users
    });
};

const searchCategories = async (term = "", res = response) => {
    //Chequea si lo que se envía en term es un id de Mongo o no
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const category = await Category.findById(term);
        return res.json({results: category ? [category] : []});
    }

    //Que sea insensible a mayúsculas y minúsculas
    const regex = new RegExp(term, "i");

    const categories = await Category.find({
        //Condiciones de búsqueda
        name: regex,
        state: true
    });
    res.json({
        results: categories
    });
};
const searchProducts = async (term = "", res = response) => {
    //Chequea si lo que se envía en term es un id de Mongo o no
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const product = await Product.findById(term).populate(
            "category",
            "name"
        );
        return res.json({results: product ? [product] : []});
    }

    //Que sea insensible a mayúsculas y minúsculas
    const regex = new RegExp(term, "i");

    const products = await Product.find({
        //Condiciones de búsqueda
        name: regex,
        available: true,
        state: true
    }).populate("category", "name");
    res.json({
        results: products
    });
};

const search = (req, res = response) => {
    const {collection, term} = req.params;

    if (!allowedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `The collections allowed are ${allowedCollections}`
        });
    }

    switch (collection) {
        case "categories":
            searchCategories(term, res);
            break;
        case "products":
            searchProducts(term, res);
            break;
        case "users":
            searchUsers(term, res);
            break;
        default:
            res.status(500).json({
                msg: "This kind of search is not implemented"
            });
    }
};

module.exports = {
    search
};
