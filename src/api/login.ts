import { axiosInstance } from "@/lib/axios";

export type LoginParams = {
    username: string;
    password: string;
};

export const login = async (params: LoginParams) => {
    const response = await axiosInstance.post("/auth/login", params);
    return response.data;
};