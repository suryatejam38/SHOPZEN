import { useEffect, useState } from "react";
import API from "../api/axios";
import PageWrapper from "../components/PageWrapper";
import toast from "react-hot-toast";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/orders/my");
        setOrders(data);
      } catch {
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ✅ Loading state
  if (loading)
    return (
      <PageWrapper>
        <p className="p-6 text-center">Loading orders...</p>
      </PageWrapper>
    );

  // ✅ Empty state
  if (!orders.length)
    return (
      <PageWrapper>
        <p className="p-6 text-center text-gray-500">
          No orders yet 📦
        </p>
      </PageWrapper>
    );

  return (
    <PageWrapper>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">My Orders</h1>

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow rounded-xl p-5"
          >
            <div className="flex justify-between mb-3">
              <p className="font-semibold">
                Order #{order._id.slice(-6)}
              </p>

              <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                {order.status}
              </span>
            </div>

            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex justify-between text-sm py-1"
              >
                <p>{item.name}</p>
                <p>
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
            ))}

            <p className="text-right font-bold mt-3">
              Total: ₹{order.totalAmount}
            </p>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}