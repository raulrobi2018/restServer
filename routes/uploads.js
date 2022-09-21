const {Router, response} = require("express");
const {check} = require("express-validator");
const {
    loadFile,
    showImage,
    updateImageCloudinary
} = require("../controllers/uploads");
const {allowedCollections} = require("../helpers/db-validators");
const {validateFiles} = require("../middlewares");
const {validateFields} = require("../middlewares/field-validator");

const router = Router();

router.post("/", validateFiles, loadFile);

router.put(
    "/:collection/:id",
    [
        validateFiles,
        check("id", "The id should be a Mongo id valid").isMongoId(),
        check("collection").custom((c) =>
            allowedCollections(c, ["users", "products"])
        ),
        validateFields
    ],
    updateImageCloudinary
);

router.get(
    "/:collection/:id",
    [
        check("id", "The id should be a Mongo id valid").isMongoId(),
        check("collection").custom((c) =>
            allowedCollections(c, ["users", "products"])
        ),
        validateFields
    ],
    showImage
);

module.exports = router;
