import { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 10;

export default function ProductTable({ products, onEdit, onDelete, isLoading, isError }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = products.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-4">
      {isLoading && <p className="text-gray-500">Loading products…</p>}
      {isError && (
        <p className="text-red-500">Failed to load products. Please retry.</p>
      )}

      {!isLoading && (
        <>
          <div className="bg-white rounded-lg ring-1 ring-gray-200 overflow-hidden h-[calc(100vh-160px)] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead className="w-14">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-center">Stock</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="text-gray-400">{product.id}</TableCell>
                    <TableCell>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-10 h-10 object-contain"
                      />
                    </TableCell>
                    <TableCell className="max-w-xs truncate font-medium">
                      {product.title}
                    </TableCell>
                    <TableCell className="capitalize text-gray-500">
                      {product.category}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      ${Number(product.price).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                          product.stock > 50
                            ? "bg-green-100 text-green-700"
                            : product.stock > 10
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => onEdit(product)}>
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => onDelete(product.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {paginated.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-400 py-8">
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              Showing {products.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}–
              {Math.min(safePage * PAGE_SIZE, products.length)} of {products.length} products
            </span>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="outline"
                disabled={safePage === 1}
                onClick={() => setPage(1)}
              >
                «
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={safePage === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                ‹
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  size="sm"
                  variant={p === safePage ? "default" : "outline"}
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              ))}

              <Button
                size="sm"
                variant="outline"
                disabled={safePage === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                ›
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={safePage === totalPages}
                onClick={() => setPage(totalPages)}
              >
                »
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
