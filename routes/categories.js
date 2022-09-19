const {Router, response} = require("express");
const {check} = require("express-validator");
const {
    newCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require("../controllers/category");
const {existCategory} = require("../helpers/db-validators");
const {validateJWT, isAdminRole} = require("../middlewares");
const {validateFields} = require("../middlewares/field-validator");

const router = Router();

//Get categories
router.get("/", getCategories);

//Get category by id
router.get(
    "/:id",
    [
        //Check if the id is a valid Mongo Id
        check("id", "The ID is not valid").isMongoId(),
        //Check if the id exist
        check("id").custom(existCategory),
        validateFields
    ],
    getCategoryById
);

//New category
router.post(
    "/",
    [
        validateJWT,
        check("name", "The name is required").not().isEmpty(),
        validateFields
    ],
    newCategory
);

//Update category
router.put(
    "/:id",
    [
        validateJWT,
        //Check if the id is a valid Mongo Id
        check("id", "The ID is not valid").isMongoId(),
        check("name", "The name is required").not().isEmpty(),
        check("id").custom(existCategory),
        validateFields
    ],
    updateCategory
);

//Delete category
router.delete(
    "/:id",
    [
        //If this middleware fails, the rest will not continue
        validateJWT,
        //Check if the id is a valid Mongo Id
        check("id", "The ID is not valid").isMongoId(),
        //Check if the id exist
        check("id").custom(existCategory),
        isAdminRole,
        validateFields
    ],
    deleteCategory
);

module.exports = router;
