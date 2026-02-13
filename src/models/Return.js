import mongoose from "mongoose";

const returnSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    type: {
      type: String,
      enum: ["return", "exchange"],
      required: true
    },

    reason: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["Requested", "Approved", "Picked", "Completed"],
      default: "Requested"
    },

    refundAmount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const ReturnRequest = mongoose.model("Return", returnSchema);

export default ReturnRequest;
