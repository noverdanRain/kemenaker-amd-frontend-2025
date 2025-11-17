"use client";

import { ProductCard } from "@/components/common/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProductList } from "@/hooks/useProductList";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
    const { data } = useProductList();
    const router = useRouter();

    const handleEdit = (productId: number) => {
        router.push(`/edit-product?id=${productId}`);
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
                            {data?.total} Products
                        </Badge>
                    </div>
                    <p className="text-muted-foreground">
                        Manage and monitor your product inventory
                    </p>
                </div>
                <Button>
                    <Plus />
                    Add New Product
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data?.products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onEditClick={handleEdit}
                    />
                ))}
            </div>
        </main>
    );
}
