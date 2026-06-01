import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Products", path: "/admin/products" },
    { name: "Orders", path: "/admin/orders" },
  ];

  return (
    <div className="w-64 h-screen bg-black text-white p-5">
      <h1 className="text-xl font-bold mb-8">Admin</h1>

      <div className="space-y-2">
        {menu.map((item) => (
          <Link key={item.path} to={item.path}>
            <div
              className={`p-2 rounded cursor-pointer transition ${
                location.pathname === item.path
                  ? "bg-white text-black"
                  : "hover:bg-gray-800"
              }`}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}