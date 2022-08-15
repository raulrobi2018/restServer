const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Valid roles for role attribute
let validRoles = {
    values: ["ADMIN_ROLE", "USER_ROLE"],
    message: "{VALUE} is not a valid role"
};

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        // Sets the name as required and a message
        required: [true, "The name is required"]
    },
    email: {
        type: String,
        required: [true, "The e-mail is required"],
        // Básicamente lo que hace es establecerlo como clave única
        unique: true
    },
    password: {
        type: String,
        required: [true, "The password is required"]
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: "USER_ROLE",
        // only valid predifined roles
        enum: validRoles
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Here we are adding a method to the schema
// In this case, we are deleting the password from
// the json object returned to the user
// NOTE: DO NOT USE AN ARROW FUNCTION BECAUSE THE this OBJECT
userSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
};

// Here we are using the unique-validator-mongoose plugin to set the
// message for the response when we are duplicating a register
// The PATH word must be between ' or ", not between `
userSchema.plugin(uniqueValidator, {message: "{PATH} must be unique"});

module.exports = mongoose.model("user", userSchema);
