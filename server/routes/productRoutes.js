const { likeProduct, getProductById, getFeedProduct } = require("../controllers/productController.js");
const { verifyToken } = require("../middleware/authMiddleware.js");
var express = require("express");
const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedProduct);
router.get("/:productId", verifyToken, getProductById);

/* UPDATE */
router.patch("/:id/like", verifyToken, likeProduct);

module.exports = router;
