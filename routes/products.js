const {Router, response} = require("express");
const {check} = require("express-validator");
const {
    newCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require("../controllers/category");
const {
    getProducts,
    getProductById,
    newProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/product");
const {existCategory, existProduct} = require("../helpers/db-validators");
const {validateJWT, isAdminRole} = require("../middlewares");
const {validateFields} = require("../middlewares/field-validator");

const router = Router();

//Get products
router.get("/", getProducts);

//Get product by id
router.get(
    "/:id",
    [
        //Check if the id is a valid Mongo Id
        check("id", "The ID is not valid").isMongoId(),
        //Check if the id exist
        check("id").custom(existProduct),
        validateFields
    ],
    getProductById
);

//New product
router.post(
    "/",
    [
        validateJWT,
        check("name", "The product name is required").not().isEmpty(),
        check("category", "The category ID is not valid").isMongoId(),
        check("category").custom(existCategory),
        validateFields
    ],
    newProduct
);

//Update product
router.put(
    "/:id",
    [
        validateJWT,
        //Check if the id is a valid Mongo Id
        check("id", "The ID is not valid").isMongoId(),
        check("category", "The category ID is not valid").isMongoId(),
        check("name", "The product name is required").not().isEmpty(),
        check("id").custom(existProduct),
        validateFields
    ],
    updateProduct
);

//Delete product
router.delete(
    "/:id",
    [
        //If this middleware fails, the rest will not continue
        validateJWT,
        //Check if the id is a valid Mongo Id
        check("id", "The ID is not valid").isMongoId(),
        //Check if the id exist
        check("id").custom(existProduct),
        isAdminRole,
        validateFields
    ],
    deleteProduct
);

module.exports = router;
