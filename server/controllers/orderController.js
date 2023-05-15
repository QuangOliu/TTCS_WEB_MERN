const Order = require("../models/Order");

const addOrder = async (req, res) => {
  try {
    const { name, phoneNumber, address, userId, items } = req.body;

    await Order.create({
      name,
      phoneNumber,
      address,
      items,
      userId,
      status: 1,
      statusHistory: [{ status: 1, timestamp: Date.now() }],
    })
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

const getOrders = async (req, res) => {
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

const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    Order.findById(id)
      .then((result) => {
        return res.status(200).json({
          status: "ok",
          message: "Get order success",
          data: result,
        });
      })
      .catch((err) => {
        return res.status(200).json({
          status: "false",
          message: "Get order false",
          data: "",
        });
      });
  } catch (error) {
    return res.status(200).json({
      status: "false",
      message: "Server error",
      data: "",
    });
  }
};
const updateStatus = (req, res) => {
  try {
    const { selected } = req.body.data;

    const updatePromises = selected.map(async (orderId) => {
      const order = await Order.findById(orderId);
      if (order) {
        order.status += 1;
        order.statusHistory.push({ status: order.status, timestamp: Date.now() });
        await order.save();
      }
    });

    Promise.all(updatePromises)
      .then((result) => {
        return res.status(200).json({
          data: result,
          message: "Update status success",
          status: "ok",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(300).json({
          data: "",
          message: "Update status false",
          status: "false",
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: "",
      message: "Server false",
      status: "false",
    });
  }
};

const deleteMany = (req, res) => {
  try {
    const { selected } = req.body;
    Order.deleteMany({ _id: { $in: selected } })
      .then((result) => {
        return res.status(200).json({
          data: result,
          message: "Delete success",
          status: "ok",
        });
      })
      .catch((err) => {
        return res.status(300).json({
          data: "",
          message: "Delete fail",
          status: "false",
        });
      });
  } catch (error) {
    return res.status(500).json({
      data: "",
      message: "Server false",
      status: "false",
    });
  }
};

module.exports = {
  addOrder,
  getOrders,
  getOrder,
  updateStatus,
  deleteMany,
};
