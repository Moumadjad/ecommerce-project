import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProductForm({
  open,
  onOpenChange,
  form,
  onChange,
  onSubmit,
  editingId,
  onAddClick,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={onAddClick}>+ Add Product</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editingId ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4 mt-2">
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={form.title}
              onChange={onChange}
              placeholder="Product title"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={onChange}
              placeholder="0.00"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={form.category}
              onChange={onChange}
              placeholder="e.g. electronics"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={onChange}
              placeholder="0"
              required
            />
          </div>

          <DialogFooter className="pt-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              {editingId ? "Save Changes" : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
