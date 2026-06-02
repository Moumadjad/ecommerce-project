import { useState } from "react";
import AdminLayout from "../AdminLayout";

export default function OrderTracking() {
  const [orders] = useState([
    {
      id: "#1001",
      client: "Ali",
      date: "2025-01-20",
      total: 120,
      status: "Pending",
    },
    {
      id: "#1002",
      client: "Fatou",
      date: "2025-01-21",
      total: 75,
      status: "Processing",
    },
    {
      id: "#1003",
      client: "Abdu",
      date: "2025-01-22",
      total: 200,
      status: "Delivered",
    },
  ]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">
        Order Tracking
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.client}</td>
                <td className="p-3">{order.date}</td>
                <td className="p-3">${order.total}</td>

                <td className="p-3 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}