const Order = require("../Models/orderModel");

class OrderController {
  async postNewOrder(req, res) {
    try {
      const user = req.cookies.user_id;
      const {
        status,
        totalAmount,
        chef,
        dishes,
        deliveryAddress,
        deliveryMethod,
      } = req.body;
      console.log({ ...req.body, user: user });
      // Create a new order instance
      const newOrder = new Order({
        status,
        totalAmount,
        user,
        chef,
        dishes,
        deliveryAddress,
        deliveryMethod,
      });

      // Save the order to the database
      const savedOrder = await newOrder.save();

      // Respond with the saved order
      res.status(201).json({
        message: "Order created successfully",
        order: savedOrder,
      });
    } catch (error) {
      console.error("Error creating new order:", error);
      res
        .status(500)
        .json({ message: "Failed to create order", error: error.message });
    }
  }
  async totalSales(req, res) {
    try {
      const totalSales = await Order.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$totalAmount" },
          },
        },
      ]);
      res.status(200).json({ totalSales: totalSales[0].total });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new OrderController();
