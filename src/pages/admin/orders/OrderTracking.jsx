import { useState } from "react";
import AdminLayout from "../AdminLayout";

export default function OrderTracking() {
    const [search, setSearch] = useState("");
    
    const [orders, setOrders] = useState([
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
        {
            id: "#1004",
            client: "Awa",
            date: "2025-01-23",
            total: 95,
            status: "Pending",
        },
        {
            id: "#1005",
            client: "Mamadou",
            date: "2025-01-24",
            total: 180,
            status: "Processing",
        },
        {
            id: "#1006",
            client: "Sophie",
            date: "2025-01-25",
            total: 60,
            status: "Cancelled",
        },
        {
            id: "#1007",
            client: "Omar",
            date: "2025-01-26",
            total: 250,
            status: "Delivered",
        },
        {
            id: "#1008",
            client: "Khady",
            date: "2025-01-27",
            total: 145,
            status: "Pending",
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

    const updateStatus = (id, newStatus) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === id
                    ? { ...order, status: newStatus }
                    : order
            )
        );
    };

    const filteredOrders = orders.filter((order) =>
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.client.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-6">
                Order Tracking
            </h1>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Order ID or Client..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/3 border px-3 py-2 rounded"
                />
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Order ID</th>
                            <th className="p-3 text-left">Client</th>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Total</th>
                            <th className="p-3 text-center">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order.id} className="border-t">
                                <td className="p-3">{order.id}</td>
                                <td className="p-3">{order.client}</td>
                                <td className="p-3">{order.date}</td>
                                <td className="p-3">${order.total}</td>

                                <td className="p-3 text-center">
                                    <span
                                        className={`px-3 py-1 rounded text-xs font-semibold ${getStatusStyle(
                                            order.status
                                        )}`}
                                    >
                                        {order.status}
                                    </span>
                                </td>

                                <td className="p-3 text-center">
                                    <select
                                        value={order.status}
                                        onChange={(e) =>
                                            updateStatus(order.id, e.target.value)
                                        }
                                        className="border rounded px-2 py-1 text-sm"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}