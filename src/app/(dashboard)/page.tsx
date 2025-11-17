"use client";

import { useState } from "react";
import { ProductCard } from "@/components/common/ProductCard";
import { DeleteProductDialog } from "@/components/common/DeleteProductDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProductList } from "@/hooks/useProductList";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { toast } from "sonner";

export default function Home() {
    const { data: products } = useProductList();
    const router = useRouter();
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleEdit = (productId: number) => {
        router.push(`/edit-product?id=${productId}`);
    };

    const handleAddProduct = () => {
        router.push("/add-product");
    };

    const handleDeleteClick = (productId: number) => {
        const product = products?.products.find((p) => p.id === productId);
        if (product) {
            setProductToDelete(product);
            setIsDeleteDialogOpen(true);
        }
    };

    const handleDeleteConfirm = async (productId: number) => {
        setIsDeleting(true);
        
        try {
            // TODO: Replace with actual API call
            // const response = await fetch(`/api/products/${productId}`, {
            //     method: 'DELETE',
            //     headers: { 'Content-Type': 'application/json' },
            // });
            
            // if (!response.ok) throw new Error('Failed to delete product');
            
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            
            console.log("Deleted product ID:", productId);
            
            toast.success("Product deleted successfully!");
            setIsDeleteDialogOpen(false);
            setProductToDelete(null);
            
            // Refresh product list
            router.refresh();
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("Failed to delete product. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="font-bold text-3xl mb-2">
                            Product Catalog
                        </h1>
                        <Badge variant={"outline"}>
                            {products?.total} Products
                        </Badge>
                    </div>
                    <p className="text-muted-foreground">
                        Manage and monitor your product inventory
                    </p>
                </div>
                <Button onClick={handleAddProduct}>
                    <Plus />
                    Add New Product
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products?.products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onEditClick={handleEdit}
                        onDeleteClick={handleDeleteClick}
                    />
                ))}
            </div>
            
            {/* Delete Confirmation Dialog */}
            <DeleteProductDialog
                product={productToDelete}
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={handleDeleteConfirm}
                isDeleting={isDeleting}
            />
        </main>
    );
}