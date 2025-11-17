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
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories } from "@/constant";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import {
    productFormSchema,
    ProductFormSchemaType,
} from "@/lib/zod-schema/productForm";

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
    const form = useForm<ProductFormSchemaType>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            title: product?.title || "",
            description: product?.description || "",
            category: product?.category || "",
            price: product?.price?.toString() || "",
            discountPercentage: product?.discountPercentage?.toString() || "",
            stock: product?.stock?.toString() || "",
            brand: product?.brand || "",
            sku: product?.sku || "",
            weight: product?.weight?.toString() || "",
            dimensions: {
                width: product?.dimensions?.width?.toString() || "",
                height: product?.dimensions?.height?.toString() || "",
                depth: product?.dimensions?.depth?.toString() || "",
            },
            thumbnail: product?.thumbnail || "",
            tags: product?.tags || [],
        },
    });

    const [tags, setTags] = useState<string[]>(product?.tags || []);
    const [currentTag, setCurrentTag] = useState("");
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    const handleAddTag = () => {
        if (currentTag && !tags.includes(currentTag)) {
            const newTags = [...tags, currentTag];
            setTags(newTags);
            form.setValue("tags", newTags);
            setCurrentTag("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        const newTags = tags.filter((tag) => tag !== tagToRemove);
        setTags(newTags);
        form.setValue("tags", newTags);
    };

    const handleFormSubmit = (data: ProductFormSchemaType) => {
        const productData: Partial<Product> = {
            title: data.title,
            description: data.description,
            category: data.category,
            brand: data.brand,
            sku: data.sku,
            price: parseFloat(data.price),
            discountPercentage: data.discountPercentage
                ? parseFloat(data.discountPercentage)
                : 0,
            stock: parseFloat(data.stock),
            weight: parseFloat(data.weight),
            dimensions: data.dimensions
                ? {
                      width: parseFloat(data.dimensions.width),
                      height: parseFloat(data.dimensions.height),
                      depth: parseFloat(data.dimensions.depth),
                  }
                : undefined,
            thumbnail: data.thumbnail || "",
            tags: tags,
        };

        if (product?.id) {
            productData.id = product.id;
        }

        onSubmit(productData);
    };

    const handleOnInputNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        if (!/^\d*\.?\d{0,2}$/.test(value)) {
            e.currentTarget.value = value.slice(0, -1);
        } else if (/^0\d/.test(value)) {
            e.currentTarget.value = value.replace(/^0+/, "0");
        }
    };

    return (
        <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-6"
        >
            <FieldGroup>
                {/* Basic Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Basic Information</h3>

                    <Controller
                        control={form.control}
                        name="title"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="title">
                                    Product Title *
                                </FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id="title"
                                    placeholder="Enter product title"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="description"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="description">
                                    Description *
                                </FieldLabel>
                                <Textarea
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id="description"
                                    placeholder="Enter product description"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <Controller
                            control={form.control}
                            name="category"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="category">
                                        Category *
                                    </FieldLabel>
                                    <Select
                                        {...field}
                                        onValueChange={(value) =>
                                            field.onChange(value)
                                        }
                                    >
                                        <SelectTrigger
                                            aria-invalid={fieldState.invalid}
                                        >
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem
                                                    key={cat}
                                                    value={cat}
                                                >
                                                    {cat}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name="brand"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="brand">
                                        Brand *
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        id="brand"
                                        placeholder="Enter brand name"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </div>

                    <Controller
                        control={form.control}
                        name="sku"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="sku">SKU *</FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id="sku"
                                    placeholder="Enter SKU"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </div>

                {/* Pricing & Stock */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Pricing & Stock</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Controller
                            control={form.control}
                            name="price"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="price">
                                        Price ($) *
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        id="price"
                                        placeholder="Enter price"
                                        inputMode="numeric"
                                        onInput={handleOnInputNumber}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            control={form.control}
                            name="discountPercentage"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="discount">
                                        Discount (%)
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        id="discount"
                                        placeholder="Enter discount"
                                        inputMode="numeric"
                                        onInput={handleOnInputNumber}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name="stock"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="stock">
                                        Stock
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        id="stock"
                                        placeholder="Enter stock"
                                        inputMode="numeric"
                                        onInput={handleOnInputNumber}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </div>
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Product Details</h3>

                    <Controller
                        control={form.control}
                        name="weight"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="weight">
                                    Weight (kg) *
                                </FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id="weight"
                                    placeholder="Enter weight"
                                    inputMode="numeric"
                                    onInput={handleOnInputNumber}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <div className="space-y-2">
                        <FieldLabel>Dimensions (cm)</FieldLabel>
                        <div className="grid grid-cols-3 gap-4">
                            <Controller
                                control={form.control}
                                name="dimensions.width"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel
                                            htmlFor="width"
                                            className="text-xs"
                                        >
                                            Width *
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            id="width"
                                            placeholder="Width"
                                            inputMode="numeric"
                                            onInput={handleOnInputNumber}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                control={form.control}
                                name="dimensions.height"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel
                                            htmlFor="height"
                                            className="text-xs"
                                        >
                                            Height *
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            id="height"
                                            placeholder="Height"
                                            inputMode="numeric"
                                            onInput={handleOnInputNumber}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                control={form.control}
                                name="dimensions.depth"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel
                                            htmlFor="depth"
                                            className="text-xs"
                                        >
                                            Depth *
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            id="depth"
                                            placeholder="Depth"
                                            inputMode="numeric"
                                            onInput={handleOnInputNumber}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>
                    </div>

                    <Controller
                        control={form.control}
                        name="thumbnail"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="thumbnail">
                                    Thumbnail URL
                                </FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id="thumbnail"
                                    placeholder="Enter image URL"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setImageError(false);
                                        setImageLoading(true);
                                    }}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}

                                {/* Image Preview */}
                                <div className="mt-3">
                                    <Label className="text-sm text-muted-foreground mb-2 block">
                                        Preview
                                    </Label>
                                    <div className="relative aspect-square w-full max-w-xs border rounded-lg overflow-hidden bg-muted">
                                        {field.value &&
                                        field.value !== "..." &&
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
                                                    src={field.value}
                                                    alt="Product preview"
                                                    className="object-cover w-full h-full"
                                                    onLoad={() =>
                                                        setImageLoading(false)
                                                    }
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
                                                            No image URL
                                                            provided
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    {field.value && !imageError && (
                                        <p className="text-xs text-muted-foreground mt-2">
                                            Image URL is valid ✓
                                        </p>
                                    )}
                                </div>
                            </Field>
                        )}
                    />

                    {/* Tags */}
                    <div className="space-y-2">
                        <FieldLabel>Tags</FieldLabel>
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
                                    <button
                                        className="w-3 h-3 cursor-pointer"
                                        onClick={() => handleRemoveTag(tag)}
                                    >
                                        <X size={10} />
                                    </button>
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
            </FieldGroup>
        </form>
    );
}
