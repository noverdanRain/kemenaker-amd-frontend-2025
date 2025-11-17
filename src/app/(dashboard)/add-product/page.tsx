"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductForm } from "@/components/common/ProductForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/types";

export default function AddProductPage() {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (data: Partial<Product>) => {
        setIsSaving(true);
        
        try {
            // TODO: Replace with actual API call
            // const response = await fetch('/api/products', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data),
            // });
            
            // if (!response.ok) throw new Error('Failed to create product');
            
            // const newProduct = await response.json();
            
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            
            console.log("New product data:", data);
            
            toast.success("Product created successfully!");
            router.push("/");
        } catch (error) {
            console.error("Error creating product:", error);
            toast.error("Failed to create product. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        router.push("/");
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Button
                    variant="ghost"
                    onClick={handleCancel}
                    className="mb-4"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Products
                </Button>
                
                <h1 className="text-3xl font-bold">Add New Product</h1>
                <p className="text-muted-foreground">
                    Fill in the product information below to add a new product to your catalog
                </p>
            </div>

            <Card className="p-6">
                <ProductForm
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isSaving}
                />
            </Card>
        </div>
    );
}
