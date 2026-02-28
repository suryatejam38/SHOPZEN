import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import PageWrapper from "../components/PageWrapper";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchHighlights = async () => {
      const { data } = await API.get("/products");
      setProducts(data.slice(0, 4));
    };
    fetchHighlights();
  }, []);

  return (
    <PageWrapper>
      <div className="bg-gradient-to-b from-slate-50 to-slate-200 min-h-screen">
        <div className="text-center py-20">
          <h1 className="text-5xl font-bold mb-4">
            Shop Smart. Dress Better.
          </h1>

          <Link
            to="/products"
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl"
          >
            Explore Products
          </Link>
        </div>

        <div className="max-w-6xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-bold mb-6">🔥 Top Sales</h2>

          <div className="grid md:grid-cols-4 gap-6">
            {products.map((p) => (
              <Link
                key={p._id}
                to={`/product/${p._id}`}
                className="bg-white rounded-xl shadow p-4 hover:shadow-xl transition"
              >
                <h3>{p.name}</h3>
                <p className="text-indigo-600">₹{p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}