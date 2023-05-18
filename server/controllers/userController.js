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
    res.json({ data: user });
  } catch (error) {
    res.status(500).json(error);
  }
};
const getListUser = (req, res) => {
  try {
    const { uniqueUserIds } = req.body;
    User.find({ _id: { $in: uniqueUserIds } })
      .then((result) => {
        return res.status(200).json({
          status: "Ok",
          message: "ok",
          data: result,
        });
      })
      .catch((err) => {});
  } catch (error) {}
};


const deleteUsers = async (req, res) => {
  try {
    const { selected } = req.body;
    // return res.json(selected);
    User.deleteMany({ _id: { $in: selected } })
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

module.exports = {
  getUser,
  getAllUser,
  updateCart,
  getListUser,
  deleteUsers
};
