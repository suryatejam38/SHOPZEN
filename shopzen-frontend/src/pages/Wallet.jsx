import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

import PageWrapper from "../components/PageWrapper";

export default function Wallet() {
  const [wallet, setWallet] = useState(null);

  const fetchWallet = async () => {
    try {
      const { data } = await API.get("/wallet");
      setWallet(data);
    } catch {
      toast.error("Failed to load wallet");
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  if (!wallet)
    return <p className="p-6 text-center">Loading wallet...</p>;

  return (
    <PageWrapper><div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Balance Card */}
      <div className="bg-indigo-600 text-white rounded-xl p-6 shadow">
        <h2 className="text-lg">Wallet Balance</h2>
        <p className="text-3xl font-bold mt-2">
          ₹{wallet.balance}
        </p>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="text-xl font-bold mb-4">
          Transactions
        </h3>

        {wallet.transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          wallet.transactions.map((t) => (
            <div
              key={t._id}
              className="flex justify-between border-b py-3"
            >
              <div>
                <p className="font-medium">{t.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(t.createdAt).toLocaleDateString()}
                </p>
              </div>

              <p
                className={
                  t.type === "credit"
                    ? "text-green-600 font-semibold"
                    : "text-red-500 font-semibold"
                }
              >
                {t.type === "credit" ? "+" : "-"}₹{t.amount}
              </p>
            </div>
          ))
        )}
      </div>
    </div></PageWrapper>
  );
}