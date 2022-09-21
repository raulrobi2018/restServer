const {Role, User, Category, Product} = require("../models");

const isValidRole = async (role = "") => {
    const existRole = await Role.findOne({role});
    if (!existRole) {
        throw new Error(`The ${role} is not a valid role`);
    }
};

const emailExist = async (email = "") => {
    //Verify the email
    const emailEx = await User.findOne({email});
    if (emailEx) {
        throw new Error(`The email ${email} is already registered`);
    }
};

const existUserById = async (id = "") => {
    //Verify if the user exist
    const userExist = await User.findById(id);
    if (!userExist) {
        throw new Error(`The id ${id} does not exist`);
    }
};

const existCategory = async (id = "") => {
    //Verify if the category exist
    const catExist = await Category.findById(id);
    if (!catExist) {
        throw new Error(`The category with id ${id} does not exist`);
    }
};

const existProduct = async (id = "") => {
    //Verify if the product exist
    const prodExist = await Product.findById(id);
    if (!prodExist) {
        throw new Error(`The product with id ${id} does not exist`);
    }
};

const allowedCollections = (collection = "", collections = []) => {
    const collectionIncluded = collections.includes(collection);

    if (!collectionIncluded) {
        throw new Error(
            `The collection ${collection} is not allowed. Collections allowed ${collections}`
        );
    }

    return true;
};

module.exports = {
    isValidRole,
    emailExist,
    existUserById,
    existCategory,
    existProduct,
    allowedCollections
};
