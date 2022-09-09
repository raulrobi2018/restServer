const validateFields = require("../middlewares/field-validator");
const validateJWT = require("../middlewares/validate-JWT");
const validateRoles = require("../middlewares/validate_roles");

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles
};
