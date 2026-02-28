import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

import PageWrapper from "../components/PageWrapper";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const { data } = await API.get("/wishlist");
      setWishlist(data.items || []);
    } catch {
      toast.error("Failed to load wishlist");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeItem = async (productId) => {
    try {
      await API.delete(`/wishlist/${productId}`);
      toast.success("Removed from wishlist");
      fetchWishlist();
    } catch {
      toast.error("Remove failed");
    }
  };

  if (!wishlist.length)
    return <p className="p-6 text-center">Wishlist is empty ❤️</p>;

  return (
    <PageWrapper><div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {wishlist.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-xl shadow p-5"
        >
          <h2 className="font-bold">{item.name}</h2>
          <p className="text-indigo-600 font-semibold mt-2">
            ₹{item.price}
          </p>

          <button
            onClick={() => removeItem(item._id)}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      ))}
    </div></PageWrapper>
  );
}