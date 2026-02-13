import Wallet from "../models/Wallet.js";

// CUSTOMER: Get wallet balance & transactions
export const getWallet = async (req, res) => {
  try {
    let wallet = await Wallet.findOne({ user: req.user._id });

    if (!wallet) {
      wallet = await Wallet.create({ user: req.user._id });
    }

    res.json({
      balance: wallet.balance,
      transactions: wallet.transactions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
