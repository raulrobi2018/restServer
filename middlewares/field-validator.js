const {validationResult} = require("express-validator");

//A middleware receives a third param "next" that is used for
//move to the next middleware
const validateFields = (req, res, next) => {
    //Get the errors catching by the middleware express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    //Continue with the next middleware
    next();
};

module.exports = {
    validateFields
};
