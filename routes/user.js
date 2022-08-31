const {Router} = require("express");
const {userGet, userPut, userPost, userDelete} = require("../controllers/user");
const {check} = require("express-validator");
const {
    isValidRole,
    emailExist,
    existUserById
} = require("../helpers/db-validators");
const {validateFields} = require("../middlewares/field-validator");

const router = Router();

//We aren't passing the method "userGet", we are passing a reference to the method
router.get("/", userGet);

router.put(
    "/:id",
    [
        //Check if the id is a valid Mongo Id
        check("id", "The ID is not valid").isMongoId(),
        //Check if the id exist
        check("id").custom(existUserById),
        check("role").custom(isValidRole),
        validateFields
    ],

    userPut
);

//We can send a middleware as a second param,
router.post(
    "/",
    [
        check("name", "The name is required").not().isEmpty(),
        check("password", "The password is required").not().isEmpty(),
        check(
            "password",
            "The password should have at least 8 characters"
        ).isLength({min: 8}),
        check("email", "The email is not valid").isEmail(),
        check("role", "The role is required").not().isEmpty(),
        //check("role", "The role is not valid").isIn(["ADMIN_ROLE", "USER_ROLE"])
        //Here we are returning a callback like that: (role) => isValidRole(role), but when
        //the name param is the same, we can omit them and only return the function name
        check("role").custom(isValidRole),
        check("email").custom(emailExist)
    ],
    userPost
);

router.delete(
    "/:id",
    [
        //Check if the id is a valid Mongo Id
        check("id", "The ID is not valid").isMongoId(),
        //Check if the id exist
        check("id").custom(existUserById),
        validateFields
    ],
    userDelete
);

module.exports = router;
