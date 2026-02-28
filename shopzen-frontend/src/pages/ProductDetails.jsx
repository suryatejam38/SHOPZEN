import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";
import PageWrapper from "../components/PageWrapper";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
      } catch {
        toast.error("Failed to load product");
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      await API.post("/cart", {
        productId: product._id,
        quantity: 1,
        size: "M",
        color: "Black",
      });
      toast.success("Added to cart 🛒");
    } catch {
      toast.error("Failed to add");
    }
  };

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <PageWrapper>
      <div className="p-6 max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="bg-gray-100 h-80 rounded-xl flex items-center justify-center">
          <p className="text-gray-400">Product Image</p>
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500 mt-2">{product.brand}</p>

          <p className="text-2xl text-indigo-600 font-semibold mt-4">
            ₹{product.price}
          </p>

          <button
            onClick={addToCart}
            className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}