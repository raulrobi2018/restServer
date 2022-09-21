const validateFields = require("../middlewares/field-validator");
const validateJWT = require("../middlewares/validate-JWT");
const validateRoles = require("../middlewares/validate_roles");
const validateFiles = require("./validate-files");

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
    ...validateFiles
};
