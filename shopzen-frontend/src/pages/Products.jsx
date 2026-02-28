import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";
import PageWrapper from "../components/PageWrapper";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(10000);

  // Fetch products
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

  // Add to cart
  const addToCart = async (productId) => {
    try {
      await API.post("/cart", {
        productId,
        quantity: 1,
        size: "M",
        color: "Black",
      });
      toast.success("Added to cart 🛒");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  // Get unique categories
  const categories = [
    "All",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  // Filtering logic
  const filteredProducts = products.filter((p) => {
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || p.category === category) &&
      p.price <= maxPrice
    );
  });

  if (loading)
  return (
    <PageWrapper>
      <p className="p-6 text-center">Loading products...</p>
    </PageWrapper>
  );
  
  return (
    <PageWrapper>
      <div className="p-6 max-w-7xl mx-auto">

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow mb-6 grid md:grid-cols-3 gap-4">

          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded-lg"
          />

          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded-lg"
          >
            {categories.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>

          {/* Price Filter */}
          <div>
            <label className="text-sm text-gray-500">
              Max Price: ₹{maxPrice}
            </label>
            <input
              type="range"
              min="0"
              max="10000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow p-5 hover:shadow-2xl hover:-translate-y-1 transition duration-300"
            >
              <Link to={`/product/${p._id}`}>
                <h2 className="text-lg font-bold hover:text-indigo-600">
                  {p.name}
                </h2>
              </Link>

              <p className="text-gray-500">{p.brand}</p>

              <p className="text-indigo-600 font-semibold mt-2 text-lg">
                ₹{p.price}
              </p>

              <button
                onClick={() => addToCart(p._id)}
                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 active:scale-95 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

      </div>
    </PageWrapper>
  );
}