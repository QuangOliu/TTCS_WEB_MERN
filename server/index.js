import { fileURLToPath } from "url";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const { register } = require("./controllers/authController");
const { createProduct } = require("./controllers/productController");
const { verifyToken } = require("./middleware/authMiddleware");

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MIDLEWARE
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(morgan("common"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
// const upload = multer({ storage });

const upload = multer({ dest: 'uploads/' })

upload.on('error', function(err) {
  console.log('Multer error:', err)
})

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/product", verifyToken, upload.array("product_image", 12), createProduct);

// ROUTES
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes);

// DATA BASE CONNECT
mongoose
  .connect(process.env.MONGO_URL)
  // .connect("mongodb://localhost:27017/social-media")
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Example app listening on port ${process.env.PORT}`);
      // User.insertMany(users);
      // Post.insertMany(posts);
    });
  })
  .catch((err) => {
    console.log(err);
  });
