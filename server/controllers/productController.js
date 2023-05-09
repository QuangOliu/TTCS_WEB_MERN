const { json } = require("body-parser");
const Product = require("../models/Product");
const User = require("../models/User");

// CREATE POST
const createProduct = async (req, res) => {
  try {
    const { category, name, shortDescription, longDescription, quantity, price, images } = req.body;
    let myArray = [];
    if (images.length <= 1) {
      myArray.push(images);
    } else {
      myArray = images.split(",");
    }
    // res.json([images]);
    const newProduct = new Product({
      category,
      name,
      shortDescription,
      longDescription,
      quantity,
      price,
      images: myArray,
      likes: {},
      comments: [],
    });
    await newProduct.save();

    res.status(200).json({
      status: "oke",
      message: "Add product success!!!",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: "false",
      message: "Add product false!!!",
      data: "",
    });
  }
};

// READ POSTS OF USER
const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ _id: productId });
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};

// READ POSTS FOR FEED
const getFeedProduct = async (req, res) => {
  try {
    const products = await Product.find().sort([["createdAt", 1]]);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE LIKE
const likeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const product = await Product.findById(id);
    const isLiked = product.likes.get(userId);

    if (isLiked) {
      product.likes.delete(userId);
    } else {
      product.likes.set(userId, true);
    }

    const updateProduct = await Product.findByIdAndUpdate(
      { _id: id },
      {
        likes: product.likes,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateProduct = (req, res) => {};

const deleteProduct = (req, res) => {
  try {
    const { selected } = req.body;
    console.log(req.body);

    res.json({
      data: req.bod,
      status: "ok",
      message: "delete Success",
    });
  } catch (error) {
    res.json({
      data: "",
      status: "flase",
      message: "delete fails",
    });
  }
};

module.exports = {
  createProduct,
  likeProduct,
  getProductById,
  getFeedProduct,
  updateProduct,
  deleteProduct,
};
