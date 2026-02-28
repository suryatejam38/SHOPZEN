import { useEffect, useState } from "react";
import API from "../../api/axios";
import toast from "react-hot-toast";
import PageWrapper from "../../components/PageWrapper";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders");
      setOrders(data);
    } catch {
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}/status`, { status });
      toast.success("Order updated ✅");
      fetchOrders();
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <PageWrapper>
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="bg-white p-5 rounded-xl shadow">
          <div className="flex justify-between mb-3">
            <p className="font-semibold">
              Order #{order._id.slice(-6)}
            </p>

            <select
              value={order.status}
              onChange={(e) =>
                updateStatus(order._id, e.target.value)
              }
              className="border p-1 rounded"
            >
              <option>Placed</option>
              <option>Packed</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>

          {order.items.map((item) => (
            <div key={item._id} className="flex justify-between py-1">
              <p>{item.name}</p>
              <p>
                ₹{item.price} × {item.quantity}
              </p>
            </div>
          ))}

          <p className="text-right font-bold mt-2">
            Total: ₹{order.totalAmount}
          </p>
        </div>
      ))}
    </div>
    </PageWrapper>
  );
}