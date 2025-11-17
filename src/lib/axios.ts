import axios from "axios";

const token = typeof window !== "undefined" ? (localStorage.getItem("access-token") || "").replace(/^"|"$/g, '') : "";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
});