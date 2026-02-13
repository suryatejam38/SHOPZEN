import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      enum: ["Men", "Women", "Kids", "Accessories"],
      required: true
    },

    brand: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    discount: {
      type: Number,
      default: 0
    },

    sizes: [
      {
        type: String
      }
    ],

    colors: [
      {
        type: String
      }
    ],

    stock: {
      type: Number,
      required: true
    },

    images: [
      {
        type: String
      }
    ],

    isOutOfStock: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Auto mark out of stock
productSchema.pre("save", function (next) {
  if (this.stock <= 0) {
    this.isOutOfStock = true;
  } else {
    this.isOutOfStock = false;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
