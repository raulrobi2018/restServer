const Role = require("../models/role");
const user = require("../models/user");

const isValidRole = async (role = "") => {
    const existRole = await Role.findOne({role});
    if (!existRole) {
        throw new Error(`The ${role} is not a valid role`);
    }
};

const emailExist = async (email = "") => {
    //Verify the email
    const emailEx = await user.findOne({email});
    if (emailEx) {
        throw new Error(`The email ${email} is already registered`);
    }
};

const existUserById = async (id = "") => {
    //Verify if the user exist
    const userExist = await user.findById(id);
    if (!userExist) {
        throw new Error(`The id ${id} does not exist`);
    }
};

module.exports = {
    isValidRole,
    emailExist,
    existUserById
};
