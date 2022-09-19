const {Router, response} = require("express");
const {check} = require("express-validator");
const {loadFile} = require("../controllers/uploads");
const {validateJWT, isAdminRole} = require("../middlewares");
const {validateFields} = require("../middlewares/field-validator");

const router = Router();

router.post("/", loadFile);

module.exports = router;
