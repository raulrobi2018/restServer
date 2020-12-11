const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        // Sets the name as required and a message
        required: [true, "The name is required"]
    },
    email: {
        type: String,
        required: [true, "The e-mail is required"]
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
        default: "USER_ROLE"
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

module.exports = mongoose.model("user", userSchema);
