const {Router} = require("express");
const {check} = require("express-validator");
const {login} = require("../controllers/auth");
const {validateFields} = require("../middlewares/field-validator");

const router = Router();

//We aren't passing the method "userGet", we are passing a reference to the method
router.post(
    "/login",
    [
        check("email", "The email is required").isEmail(),
        check("password", "The password is required ").not().isEmpty(),
        validateFields
    ],
    login
);

module.exports = router;
