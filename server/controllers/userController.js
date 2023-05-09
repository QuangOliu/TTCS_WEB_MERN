const User = require("../models/User");

//READ USER
const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (!user) return res.status(404).json({ message: "User not found!!!" });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(_id, { cart: [...req.body.cart] })
      .then((result) => {
        res.status(200).json({
          status: "ok",
          message: "Update Sucess",
          data: result,
        });
      })
      .catch((err) => {
        res.status(200).json({
          status: "false",
          message: "Update fails",
          data: "",
        });
      });
  } catch (error) {}
};

//GET ALL USER
const getAllUser = async (req, res) => {
  try {
    const user = await User.find({});
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getUser,
  getAllUser,
  updateCart,
};
