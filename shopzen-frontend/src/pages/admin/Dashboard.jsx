import { useEffect, useState } from "react";
import API from "../../api/axios";
import PageWrapper from "../../components/PageWrapper";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get("/analytics");
        setStats(data);
      } catch {
        toast.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // ✅ Loading
  if (loading)
    return (
      <PageWrapper>
        <p className="p-6">Loading dashboard...</p>
      </PageWrapper>
    );

  const Card = ({ title, value }) => (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );

  return (
    <PageWrapper>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Total Orders" value={stats?.totalOrders || 0} />
          <Card title="Total Revenue" value={`₹${stats?.totalRevenue || 0}`} />
          <Card title="Total Users" value={stats?.totalUsers || 0} />
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold mb-3">Quick Actions</h2>

          <div className="flex gap-4">
            <a
              href="/admin/orders"
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Manage Orders
            </a>

            <a
              href="/admin/returns"
              className="bg-gray-900 text-white px-4 py-2 rounded"
            >
              Handle Returns
            </a>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}