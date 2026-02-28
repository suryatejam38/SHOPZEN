import { useEffect, useState } from "react";
import API from "../../api/axios";
import PageWrapper from "../../components/PageWrapper";
import toast from "react-hot-toast";

export default function AdminReturns() {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReturns = async () => {
    try {
      const { data } = await API.get("/returns");
      setReturns(data);
    } catch {
      toast.error("Failed to load returns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  // ✅ loading state
  if (loading)
    return (
      <PageWrapper>
        <p className="p-6">Loading returns...</p>
      </PageWrapper>
    );

  // ✅ empty state
  if (!returns.length)
    return (
      <PageWrapper>
        <p className="p-6 text-center text-gray-500">
          No return requests 📦
        </p>
      </PageWrapper>
    );

  return (
    <PageWrapper>
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Return Requests</h1>

        {returns.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow p-5"
          >
            {/* ✅ FIX HERE */}
            <p className="font-semibold mb-2">
              Order #{order._id.slice(-6)}
            </p>

            <p>Status: {order.status}</p>

            <button
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
              onClick={() =>
                toast.success("Return marked completed")
              }
            >
              Complete Return
            </button>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}