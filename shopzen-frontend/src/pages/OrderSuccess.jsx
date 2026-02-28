import { Link, useLocation } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

export default function OrderSuccess() {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <PageWrapper>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          ✅ Order Placed!
        </h1>

        {orderId && (
          <p className="text-gray-600 mb-2">
            Order ID: <span className="font-semibold">{orderId.slice(-6)}</span>
          </p>
        )}

        <Link
          to="/orders"
          className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-lg"
        >
          View My Orders
        </Link>
      </div>
    </PageWrapper>
  );
}