"use client";

import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { ProductForm } from "@/components/common/ProductForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProductDetail } from "@/hooks/useProductDetail";
import { Product } from "@/types";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function EditProductPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get("id");

    const {data: product, ...getProduct} = useProductDetail({
        id: productId || "",
    });

    console.log({product});

    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (data: Partial<Product>) => {
        setIsSaving(true);

        try {
            // Simulate API call
            // const response = await fetch(`/api/products/${productId}`, {
            //     method: 'PATCH',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data),
            // });

            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log("Updated product data:", {
                id: productId,
                ...data,
            });

            toast.success("Product updated successfully!");
            router.push("/");
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error("Failed to update product. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        router.push("/");
    };

    if (getProduct.isLoading) {
        return <LoadingOverlay />;
    }

    if (getProduct.error || !product) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card className="p-6 text-center">
                    <h2 className="text-xl font-semibold mb-2">
                        Product Not Found
                    </h2>
                    <p className="text-muted-foreground mb-4">
                        The product you&apos;re looking for doesn&apos;t exist.
                    </p>
                    <Button onClick={handleCancel}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Products
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Button variant="ghost" onClick={handleCancel} className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Products
                </Button>

                <h1 className="text-3xl font-bold">Edit Product</h1>
                <p className="text-muted-foreground">
                    Update the product information below
                </p>
            </div>

            <Card className="p-6">
                <ProductForm
                    product={product}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isSaving}
                />
            </Card>
        </div>
    );
}
