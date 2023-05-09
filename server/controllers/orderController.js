const Order = require("../models/Order");

const addOrder = async (req, res) => {
  try {
    const { name, phoneNumber, address, userId, items } = req.body;

    const order = new Order({
      name,
      phoneNumber,
      address,
      items,
      userId,
    });
    order
      .save()
      .then((result) => {
        return res.status(201).json({
          status: "OK",
          message: "Order Susses",
          data: result,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: "false",
          message: err.message,
          data: "",
        });
      });
  } catch (error) {
    res.status(500).json({
      status: "false",
      message: error,
      data: "",
    });
  }
};

const getOrder = async (req, res) => {
  try {
    await Order.find({})
      .then((result) => {
        return res.status(200).json({
          status: "ok",
          message: "Get Order Success",
          data: result,
        });
      })
      .catch((err) => {
        res.status(300).json({
          status: "false",
          message: "Something wrong",
          data: "",
        });
      });
  } catch (error) {
    res.status(500).json({
      status: "false",
      message: "Server wrong",
      data: "",
    });
  }
};

module.exports = {
  addOrder,
  getOrder,
};
