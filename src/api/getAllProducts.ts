import { axiosInstance } from "@/lib/axios"
import { Product } from "@/types";

type GetAllProductResponse = {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export const getAllProducts = async () => {
    const response = await axiosInstance.get<GetAllProductResponse>("/products");
    return response.data;
}