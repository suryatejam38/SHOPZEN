import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";
import PageWrapper from "../components/PageWrapper";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate(); // ✅ REQUIRED for redirect

  // Fetch cart
  const fetchCart = async () => {
    try {
      const { data } = await API.get("/cart");
      setCart(data);
    } catch {
      toast.error("Failed to load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update quantity
  const updateQty = async (itemId, quantity) => {
    if (quantity < 1) return;

    try {
      await API.put(`/cart/${itemId}`, { quantity });
      fetchCart();
    } catch {
      toast.error("Update failed");
    }
  };

  // Remove item
  const removeItem = async (itemId) => {
    try {
      await API.delete(`/cart/${itemId}`);
      toast.success("Item removed");
      fetchCart();
    } catch {
      toast.error("Remove failed");
    }
  };

  // ✅ Checkout
  const checkout = async () => {
  try {
    setPlacing(true);

    const items = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    }));

    const { data } = await API.post("/orders", { items });

    toast.success("Order placed successfully ✅");

    navigate("/order-success", {
      state: { orderId: data._id },
    });

  } catch (err) {
    toast.error(err.response?.data?.message || "Checkout failed");
  } finally {
    setPlacing(false);
  }
};

  // Empty cart view
  if (!cart || cart.items.length === 0)
    return (
      <PageWrapper>
        <p className="p-6 text-center text-lg">
          Your cart is empty 🛒
        </p>
      </PageWrapper>
    );

  return (
    <PageWrapper>
      <div className="p-6 max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Your Cart</h1>

        {cart.items.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">
                {item.product.name}
              </h2>
              <p className="text-gray-500">
                ₹{item.product.price}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateQty(item._id, item.quantity - 1)
                }
                className="px-2 bg-gray-200 rounded"
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() =>
                  updateQty(item._id, item.quantity + 1)
                }
                className="px-2 bg-gray-200 rounded"
              >
                +
              </button>

              <button
                onClick={() => removeItem(item._id)}
                className="ml-4 text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {/* Place Order */}
        <button
  onClick={checkout}
  disabled={placing}
  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 mt-6 disabled:bg-gray-400"
>
  {placing ? "Placing Order..." : "Place Order"}
</button>
      </div>
    </PageWrapper>
  );
}