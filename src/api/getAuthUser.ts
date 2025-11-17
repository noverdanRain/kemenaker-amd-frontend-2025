import { axiosInstance } from "@/lib/axios"

export const getAuthUser = async () => {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
}