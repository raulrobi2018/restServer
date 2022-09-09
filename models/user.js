const {Schema, model} = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Valid roles for role attribute
let validRoles = {
    values: ["ADMIN_ROLE", "USER_ROLE"],
    message: "{VALUE} is not a valid role"
};

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
        required: true,
        default: "USER_ROLE"
        // only valid predifined roles
        //enum: validRoles
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

// Here we are adding a method to the schema. Particulary we are overriding the toJSON method to
// return the attributes that I want to return
// In this case, we are deleting the password and the version from
// the json object returned to the user
// NOTE: DO NOT USE AN ARROW FUNCTION BECAUSE THE I NEED THE this object and the this
// I NEED THAT IT BE POINTING TO THE INTANCE CREATED
userSchema.methods.toJSON = function () {
    //Here I'm extracting the __v, the password and the _id. The rest of the attributes will be
    //part of the user attribute
    const {__v, password, _id, ...user} = this.toObject();
    //After extract the _id we set the uid attribute to the user with the _id value extracted from the database
    user.uid = _id;
    return user;
};

// Here we are using the unique-validator-mongoose plugin to set the
// message for the response when we are duplicating a register
// The PATH word must be between ' or ", not between `
userSchema.plugin(uniqueValidator, {message: "{PATH} must be unique"});

//Automatically Mongoose will convert User to Users when create the table in the database
module.exports = model("User", userSchema);
