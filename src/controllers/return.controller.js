import ReturnRequest from "../models/Return.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Wallet from "../models/Wallet.js";

// CUSTOMER: Request return / exchange
export const requestReturn = async (req, res) => {
  try {
    const { orderId, productId, type, reason } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "Delivered") {
      return res.status(400).json({
        message: "Return allowed only after delivery"
      });
    }

    const returnRequest = await ReturnRequest.create({
      order: orderId,
      product: productId,
      user: req.user._id,
      type,
      reason
    });

    res.status(201).json(returnRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN: Get all return requests
export const getAllReturns = async (req, res) => {
  try {
    const returns = await ReturnRequest.find()
      .populate("user", "name email")
      .populate("order")
      .populate("product");

    res.json(returns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN: Approve & complete return
export const completeReturn = async (req, res) => {
  try {
    const { status } = req.body;

    const returnReq = await ReturnRequest.findById(req.params.id);
    if (!returnReq) {
      return res.status(404).json({ message: "Return request not found" });
    }

    returnReq.status = status;

    // If completed → refund + stock update
    if (status === "Completed") {
      const order = await Order.findById(returnReq.order);
      const product = await Product.findById(returnReq.product);

      const item = order.items.find(
        (i) => i.product.toString() === product._id.toString()
      );

      const refundAmount = item.quantity * item.price;
      returnReq.refundAmount = refundAmount;

      // Increase stock
      product.stock += item.quantity;
      await product.save();

      // Wallet refund
      let wallet = await Wallet.findOne({ user: returnReq.user });
      if (!wallet) {
        wallet = await Wallet.create({ user: returnReq.user });
      }

      wallet.balance += refundAmount;
      wallet.transactions.push({
        amount: refundAmount,
        type: "credit",
        description: "Refund for returned product"
      });

      await wallet.save();
    }

    await returnReq.save();
    res.json(returnReq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
