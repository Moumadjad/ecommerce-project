import Card from "../../components/admin/Card";
import AdminLayout from "./AdminLayout";

export default function AdminDashboard() {
  const products = [
    { id: 1, name: "Sneakers", stock: 10 },
    { id: 2, name: "T-shirt", stock: 20 },
  ];

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card title="Products" value={products.length} />
        <Card
          title="Stock total"
          value={products.reduce((a, b) => a + b.stock, 0)}
        />
        <Card title="Revenue" value="1200 €" />
      </div>
    </AdminLayout>
  );
}