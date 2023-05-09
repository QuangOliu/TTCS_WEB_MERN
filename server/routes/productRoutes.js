const { likeProduct, getProductById, getFeedProduct, updateProduct, deleteProduct } = require("../controllers/productController.js");
const { verifyToken, checkAdmin } = require("../middleware/authMiddleware.js");
var express = require("express");
const router = express.Router();

/* READ */
router.get("/", getFeedProduct);
router.get("/:productId", getProductById);

router.patch("/:productId", checkAdmin, updateProduct);

/* UPDATE */
router.patch("/:id/like", verifyToken, likeProduct);

router.delete("/", checkAdmin, deleteProduct);

module.exports = router;
