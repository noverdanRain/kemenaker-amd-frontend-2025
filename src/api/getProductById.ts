import { axiosInstance } from "@/lib/axios"
import { Product } from "@/types";

export type GetProductByIdResponse = Product;
export type GetProductByIdParams = { id: string };

export const getProductById = async ({ id }: GetProductByIdParams) => {
    const response = await axiosInstance.get<GetProductByIdResponse>(`/products/${id}`);
    return response.data;
}