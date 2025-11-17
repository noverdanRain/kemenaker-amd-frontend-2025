"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Product } from "@/types";
import { AlertTriangle } from "lucide-react";

interface DeleteProductDialogProps {
    product: Product | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: (productId: number) => void;
    isDeleting?: boolean;
}

export function DeleteProductDialog({
    product,
    open,
    onOpenChange,
    onConfirm,
    isDeleting = false,
}: DeleteProductDialogProps) {
    if (!product) return null;

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        <AlertDialogTitle>Delete Product</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="space-y-2">
                        <div>
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-foreground">
                                {product.title}
                            </span>
                            ?
                        </div>
                        <p className="text-sm">
                            This action cannot be undone. This will permanently
                            delete the product from your catalog.
                        </p>

                        {/* Product Summary */}
                        <div className="mt-4 p-3 bg-muted rounded-md space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    SKU:
                                </span>
                                <span className="font-medium">
                                    {product.sku}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Category:
                                </span>
                                <span className="font-medium">
                                    {product.category}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Price:
                                </span>
                                <span className="font-medium">
                                    ${product.price.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Stock:
                                </span>
                                <span className="font-medium">
                                    {product.stock} units
                                </span>
                            </div>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            onConfirm(product.id);
                        }}
                        disabled={isDeleting}
                        className="bg-destructive hover:bg-destructive/90"
                    >
                        {isDeleting ? "Deleting..." : "Delete Product"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
