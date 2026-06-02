import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminLayout from "../AdminLayout";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";

const EMPTY_FORM = { title: "", price: "", category: "", stock: "" };

async function fetchProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.map((p) => ({ ...p, stock: p.rating?.count ?? 0 }));
}

export default function StockManagement() {
  const {
    data: apiProducts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [localProducts, setLocalProducts] = useState(null);
  const products = localProducts ?? apiProducts ?? [];

  if (apiProducts && localProducts === null) {
    setLocalProducts(apiProducts);
  }

  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setOpen(true);
  };

  const openEdit = (product) => {
    setForm({
      title: product.title,
      price: product.price,
      category: product.category,
      stock: product.stock,
    });
    setEditingId(product.id);
    setOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      setLocalProducts((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? {
                ...p,
                title: form.title,
                price: parseFloat(form.price),
                category: form.category,
                stock: parseInt(form.stock, 10),
              }
            : p,
        ),
      );
    } else {
      setLocalProducts((prev) => [
        {
          id: Date.now(),
          title: form.title,
          price: parseFloat(form.price),
          category: form.category,
          stock: parseInt(form.stock, 10),
          image: "https://via.placeholder.com/40",
        },
        ...prev,
      ]);
    }
    setOpen(false);
  };

  const handleDelete = (id) => {
    setLocalProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const lowStockProducts = products.filter((p) => p.stock <= 10);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Stock Management</h1>
        <ProductForm
          open={open}
          onOpenChange={setOpen}
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          editingId={editingId}
          onAddClick={openAdd}
        />
      </div>
{lowStockProducts.length > 0 && (
  <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
    <h3 className="font-semibold text-red-700">
      ⚠ Stock Alert
    </h3>

    <p className="text-sm text-red-600">
      {lowStockProducts.length} product(s) require restocking.
    </p>
  </div>
)}
      <ProductTable
        products={products}
        onEdit={openEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        isError={isError}
      />
    </AdminLayout>
  );
}
