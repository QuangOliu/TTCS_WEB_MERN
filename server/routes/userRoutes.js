var express = require("express");
var router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { getUser, getAllUser } = require("../controllers/userController");

// READ
// router.get("/:id", verifyToken, getUser);
router.get("/:id", getUser);
router.get("/", getAllUser);

module.exports = router;
