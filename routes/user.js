const {Router} = require("express");
const {userGet, userPut, userPost, userDelete} = require("../controllers/user");

const router = Router();

//We aren't passing the method "userGet", we are passing a reference to the method
router.get("/", userGet);

router.put("/:id", userPut);

router.post("/", userPost);

router.delete("/", userDelete);

module.exports = router;
