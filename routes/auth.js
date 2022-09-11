const {Router} = require("express");
const {check} = require("express-validator");
const {login, googleSignIn} = require("../controllers/auth");
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

router.post(
    "/google",
    [
        check("id_token", "The Google token is required").not().isEmpty(),
        validateFields
    ],
    googleSignIn
);

module.exports = router;
