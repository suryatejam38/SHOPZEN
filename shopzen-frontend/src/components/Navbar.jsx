import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // get user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm px-6 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-indigo-600"
      >
        ShopZen
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6 font-medium">

        <Link to="/" className="hover:text-indigo-600 transition">
          Home
        </Link>

        <Link to="/products" className="hover:text-indigo-600 transition">
          Products
        </Link>

        {user && (
          <>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/wishlist">Wishlist</Link>
          </>
        )}

        {/* Admin Link */}
        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="text-indigo-600 font-semibold"
          >
            Dashboard
          </Link>
        )}

        {/* Auth Button */}
        {!user ? (
          <Link
            to="/login"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}