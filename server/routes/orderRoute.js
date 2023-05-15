var express = require("express");
const router = express.Router();
const { addOrder, getOrders, getOrder, updateStatus, deleteMany } = require("../controllers/orderController");
const { verifyToken, checkAdmin } = require("../middleware/authMiddleware");
// Create
router.post("/", verifyToken, addOrder);
/* READ */
router.get("/", verifyToken, getOrders);
/* UPDATE */
router.patch("/updatestatus", checkAdmin, updateStatus);
// Delete
router.delete("/deletemany", checkAdmin, deleteMany);

router.get("/:id", verifyToken, getOrder);
module.exports = router;
