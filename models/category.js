const {Schema, model} = require("mongoose");

let CategorySchema = new Schema({
    name: {
        type: String,
        // Sets the name as required and a message
        required: [true, "The name is required"],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

//Quito la propiedad __v
CategorySchema.methods.toJSON = function () {
    const {__v, ...data} = this.toObject();
    return data;
};

//Automatically Mongoose will convert User to Users when create the table in the database
module.exports = model("Category", CategorySchema);
