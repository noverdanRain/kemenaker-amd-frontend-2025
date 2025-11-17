import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product } from "@/types";
import { Package, Pencil, Star } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
    product: Product;
    onEditClick?: (productId: number) => void;
}

export function ProductCard({ product, onEditClick }: ProductCardProps) {
    const discountedPrice =
        product.price - (product.price * product.discountPercentage) / 100;
    const isLowStock = product.stock <= 10;
    const isOutOfStock = product.stock === 0;

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full pt-0">
            {/* Product Image */}
            <div className="relative aspect-square bg-muted">
                {product.thumbnail && product.thumbnail !== "..." ? (
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <Package className="w-16 h-16 text-muted-foreground" />
                    </div>
                )}

                {/* Discount Badge */}
                {product.discountPercentage > 0 && (
                    <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
                        -{product.discountPercentage.toFixed(0)}%
                    </Badge>
                )}

                {/* Stock Status Badge */}
                {isOutOfStock ? (
                    <Badge
                        variant="destructive"
                        className="absolute top-2 left-2"
                    >
                        Out of Stock
                    </Badge>
                ) : isLowStock ? (
                    <Badge
                        variant="secondary"
                        className="absolute top-2 left-2"
                    >
                        Low Stock
                    </Badge>
                ) : null}
            </div>

            {/* Product Info */}
            <div className="p-4 flex-1 flex flex-col">
                {/* Category & Brand */}
                <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                        {product.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                        {product.brand}
                    </span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {product.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
                    {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                        {product.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        ({product.reviews.length} reviews)
                    </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                    {product.tags.slice(0, 3).map((tag, index) => (
                        <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t">
                    <div className="flex flex-col">
                        {product.discountPercentage > 0 ? (
                            <>
                                <span className="text-sm text-muted-foreground line-through">
                                    ${product.price.toFixed(2)}
                                </span>
                                <span className="text-xl font-bold text-primary">
                                    ${discountedPrice.toFixed(2)}
                                </span>
                            </>
                        ) : (
                            <span className="text-xl font-bold text-primary">
                                ${product.price.toFixed(2)}
                            </span>
                        )}
                    </div>

                    <Button
                        onClick={() => onEditClick?.(product.id)}
                        size="sm"
                        className="gap-2"
                    >
                        <Pencil />
                        Edit
                    </Button>
                </div>

                {/* Additional Info */}
                <div className="mt-2 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                        <span>Stock: {product.stock}</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}
