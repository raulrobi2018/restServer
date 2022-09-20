const dbValidators = require("./db-validators");
const generateJWT = require("./generateJWT");
const googleVerify = require("./google-verify");
const fileUpload = require("./file-upload");

//Exparsimos todas las propiedades
module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...googleVerify,
    ...fileUpload
};
