"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/types";
import { ImageOff, Package, X } from "lucide-react";
import { useState } from "react";

interface ProductFormProps {
    product?: Product;
    onSubmit: (data: Partial<Product>) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export function ProductForm({
    product,
    onSubmit,
    onCancel,
    isLoading = false,
}: ProductFormProps) {
    const [formData, setFormData] = useState<Partial<Product>>({
        title: product?.title || "",
        description: product?.description || "",
        category: product?.category || "",
        price: product?.price || 0,
        discountPercentage: product?.discountPercentage || 0,
        stock: product?.stock || 0,
        brand: product?.brand || "",
        sku: product?.sku || "",
        weight: product?.weight || 0,
        dimensions: product?.dimensions || { width: 0, height: 0, depth: 0 },
        thumbnail: product?.thumbnail || "",
    });

    const [tags, setTags] = useState<string[]>(product?.tags || []);
    const [currentTag, setCurrentTag] = useState("");
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    const handleChange = (field: keyof Product, value: string | number) => {
        if (field === "thumbnail") {
            setImageError(false);
            setImageLoading(true);
        }

        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleDimensionChange = (
        dimension: "width" | "height" | "depth",
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            dimensions: {
                ...prev.dimensions!,
                [dimension]: parseFloat(value) || 0,
            },
        }));
    };

    const handleAddTag = () => {
        if (currentTag && !tags.includes(currentTag)) {
            setTags([...tags, currentTag]);
            setCurrentTag("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            tags,
        });
    };

    const categories = [
        "beauty",
        "fragrances",
        "furniture",
        "groceries",
        "home-decoration",
        "kitchen-accessories",
        "laptops",
        "mens-shirts",
        "mens-shoes",
        "mens-watches",
        "mobile-accessories",
        "motorcycle",
        "skin-care",
        "smartphones",
        "sports-accessories",
        "sunglasses",
        "tablets",
        "tops",
        "vehicle",
        "womens-bags",
        "womens-dresses",
        "womens-jewellery",
        "womens-shoes",
        "womens-watches",
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>

                <div className="space-y-2">
                    <Label htmlFor="title">Product Title *</Label>
                    <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        required
                        placeholder="Enter product title"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                            handleChange("description", e.target.value)
                        }
                        required
                        rows={4}
                        placeholder="Enter product description"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select
                            value={formData.category}
                            onValueChange={(value) =>
                                handleChange("category", value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="brand">Brand *</Label>
                        <Input
                            id="brand"
                            value={formData.brand}
                            onChange={(e) =>
                                handleChange("brand", e.target.value)
                            }
                            required
                            placeholder="Enter brand name"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="sku">SKU *</Label>
                    <Input
                        id="sku"
                        value={formData.sku}
                        onChange={(e) => handleChange("sku", e.target.value)}
                        required
                        placeholder="Enter SKU"
                    />
                </div>
            </div>

            {/* Pricing & Stock */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Pricing & Stock</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="price">Price ($) *</Label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={formData.price}
                            onChange={(e) =>
                                handleChange(
                                    "price",
                                    parseFloat(e.target.value)
                                )
                            }
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="discount">Discount (%)</Label>
                        <Input
                            id="discount"
                            type="number"
                            step="0.01"
                            min="0"
                            max="100"
                            value={formData.discountPercentage}
                            onChange={(e) =>
                                handleChange(
                                    "discountPercentage",
                                    parseFloat(e.target.value) || 0
                                )
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="stock">Stock *</Label>
                        <Input
                            id="stock"
                            type="number"
                            min="0"
                            value={formData.stock}
                            onChange={(e) =>
                                handleChange("stock", parseInt(e.target.value))
                            }
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Product Details</h3>

                <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                        id="weight"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.weight}
                        onChange={(e) =>
                            handleChange(
                                "weight",
                                parseFloat(e.target.value) || 0
                            )
                        }
                    />
                </div>

                <div className="space-y-2">
                    <Label>Dimensions (cm)</Label>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="width" className="text-xs">
                                Width
                            </Label>
                            <Input
                                id="width"
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.dimensions?.width}
                                onChange={(e) =>
                                    handleDimensionChange(
                                        "width",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="height" className="text-xs">
                                Height
                            </Label>
                            <Input
                                id="height"
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.dimensions?.height}
                                onChange={(e) =>
                                    handleDimensionChange(
                                        "height",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="depth" className="text-xs">
                                Depth
                            </Label>
                            <Input
                                id="depth"
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.dimensions?.depth}
                                onChange={(e) =>
                                    handleDimensionChange(
                                        "depth",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="thumbnail">Thumbnail URL</Label>
                    <Input
                        id="thumbnail"
                        value={formData.thumbnail}
                        onChange={(e) =>
                            handleChange("thumbnail", e.target.value)
                        }
                        placeholder="Enter image URL"
                    />

                    {/* Image Preview */}
                    <div className="mt-3">
                        <Label className="text-sm text-muted-foreground mb-2 block">
                            Preview
                        </Label>
                        <div className="relative aspect-square w-full max-w-xs border rounded-lg overflow-hidden bg-muted">
                            {formData.thumbnail &&
                            formData.thumbnail !== "..." &&
                            !imageError ? (
                                <>
                                    {imageLoading && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-muted">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                                <span className="text-xs text-muted-foreground">
                                                    Loading image...
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={formData.thumbnail}
                                        alt="Product preview"
                                        className="object-cover"
                                        onLoad={() => setImageLoading(false)}
                                        onError={() => {
                                            setImageError(true);
                                            setImageLoading(false);
                                        }}
                                    />
                                </>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                                    {imageError ? (
                                        <>
                                            <ImageOff className="w-12 h-12" />
                                            <p className="text-xs text-center px-4">
                                                Failed to load image
                                            </p>
                                            <p className="text-xs text-center px-4 text-destructive">
                                                Please check the URL
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <Package className="w-12 h-12" />
                                            <p className="text-xs text-center px-4">
                                                No image URL provided
                                            </p>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                        {formData.thumbnail && !imageError && (
                            <p className="text-xs text-muted-foreground mt-2">
                                Image URL is valid ✓
                            </p>
                        )}
                    </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex gap-2">
                        <Input
                            value={currentTag}
                            onChange={(e) => setCurrentTag(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddTag();
                                }
                            }}
                            placeholder="Add a tag"
                        />
                        <Button
                            type="button"
                            onClick={handleAddTag}
                            variant="secondary"
                        >
                            Add
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="gap-1"
                            >
                                {tag}
                                <X
                                    className="w-3 h-3 cursor-pointer"
                                    onClick={() => handleRemoveTag(tag)}
                                />
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading
                        ? "Saving..."
                        : product
                        ? "Update Product"
                        : "Create Product"}
                </Button>
            </div>
        </form>
    );
}
