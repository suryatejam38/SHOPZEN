import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const linkStyle =
    "block px-4 py-2 rounded hover:bg-gray-800 transition";

  const activeStyle = "bg-gray-800";

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">ShopZen Admin</h2>

        <NavLink to="/admin" end
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }>
          Dashboard
        </NavLink>

        <NavLink to="/admin/orders"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }>
          Orders
        </NavLink>

        <NavLink to="/admin/returns"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }>
          Returns
        </NavLink>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}