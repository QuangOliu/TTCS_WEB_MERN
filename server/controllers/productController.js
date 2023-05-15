const { json } = require("body-parser");
const Product = require("../models/Product");
const User = require("../models/User");
const bodyParser = require("body-parser");

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
    res.status(404).json({ message: error });
  }
};

// READ POSTS FOR FEED
const getFeedProduct = async (req, res) => {
  try {
    let products = await Product.find().sort([["createdAt", 1]]);

    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getListItem = async (req, res) => {
  try {
    const productIds = req.body;
    // Sử dụng phương thức find() của mongoose để tìm các sản phẩm với mã sản phẩm trong danh sách
    Product.find({ _id: { $in: productIds } })
      .then((result) => {
        return res.status(200).json({
          status: "ok",
          message: "fetch success",
          data: result,
        });
      })
      .catch((err) => {});
  } catch (error) {
    console.log(error);
    return null;
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

const deleteProducts = async (req, res) => {
  try {
    const { selected } = req.body;
    // return res.json(selected);
    Product.deleteMany({ _id: { $in: selected } })
      .then((result) => {
        res.json({
          data: result,
          status: "ok",
          message: "delete Success",
        });
      })
      .catch((err) => {
        res.json({
          data: "",
          status: "false",
          message: "Delete False",
        });
      });
  } catch (error) {
    res.json({
      data: "",
      status: "flase",
      message: "delete fails",
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    res.json(productId);
  } catch (error) {}
};

const updateQuantities = (req, res) => {
  // res.json(req.body);
  try {
    const { cart } = req.body;

    const updates = cart.map((item) => ({
      updateOne: {
        filter: { _id: item._id, quantity: { $gte: item.count } },
        update: { $inc: { quantity: -item.count, sales: item.count } },
      },
    }));

    Promise.all(updates)
      .then((operations) => {
        return Product.bulkWrite(operations);
      })
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  } catch (error) {
    res.json(error);
  }
};

const updateProduct = (req, res) => {
  const { productId } = req.params;
  Product.findOneAndUpdate(productId, req.body, { new: true })
    .then((result) => {
      return res.status(200).json({
        data: result,
        status: "ok",
        message: "update product success",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: 500,
        message: "Some thing wrong when update product",
        data: "",
      });
    });
};

module.exports = {
  createProduct,
  likeProduct,
  getProductById,
  getListItem,
  getFeedProduct,
  updateProduct,
  deleteProducts,
  updateQuantities,
  deleteProductById,
};
