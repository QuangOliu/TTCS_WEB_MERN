var express = require("express");
var router = express.Router();

const { checkAdmin , verifyToken} = require("../middleware/authMiddleware");
const { getUser, getAllUser, updateCart } = require("../controllers/userController");

// READ
// router.get("/:id", verifyToken, getUser);
// router.get("/:id", checkAdmin, getUser);
// router.get("/", checkAdmin, getAllUser);

router.get("/:id", getUser);
router.get("/", getAllUser);

// Update Cart 
router.patch("/cart/update",verifyToken, updateCart)

module.exports = router;
