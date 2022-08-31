const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);

        console.log("Database online");
    } catch (error) {
        console.log(error);
        throw new Error("Error initializing the dabatase");
    }
};

module.exports = {dbConnection};
