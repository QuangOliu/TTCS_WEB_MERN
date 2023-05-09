var express = require("express");
const router = express.Router();
const { addOrder , getOrder} = require("../controllers/orderController");
const { verifyToken, checkAdmin } = require("../middleware/authMiddleware");

/* READ */
router.post("/", verifyToken, addOrder);
router.get("/",checkAdmin, getOrder);
/* UPDATE */

module.exports = router;
