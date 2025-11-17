import { login } from "@/api/login";
import { accessTokenAtom } from "@/atom/auth";
import { MutationConfig } from "@/lib/reactQuery";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSetAtom } from "jotai/react";
import { toast } from "sonner";

type UseLoginParams = {
    mutationConfig?: MutationConfig<typeof login>;
};

export const useLogin = (params: UseLoginParams = {}) => {
    const toastId = "login-toast";
    const setAccessToken = useSetAtom(accessTokenAtom);

    return useMutation({
        ...params.mutationConfig,
        mutationFn: login,
        onMutate: () => {
            toast.loading("Logging in...", {
                id: toastId,
                description: "Please wait while we log you in.",
            });
        },
        onSuccess: (data, variables, onMutateResult, context) => {
            setAccessToken(data.accessToken);
            window.location.replace("/");
            console.log({ data });
            toast.success("Login successful!", {
                id: toastId,
                description: "You are now logged in.",
            });
            params.mutationConfig?.onSuccess?.(
                data,
                variables,
                onMutateResult,
                context
            );
        },
        onError: (error, variables, onMutateResult, context) => {
            const err = error as AxiosError;
            const status = err.response?.status;
            if (typeof status === "number" && status >= 400 && status < 500) {
                toast.error("Invalid credentials!", {
                    id: toastId,
                    description: "Please check your email and password.",
                });
                return;
            }
            toast.error("Login failed!", {
                id: toastId,
                description:
                    "Something went wrong during login. Please try again.",
            });
            params.mutationConfig?.onError?.(
                error,
                variables,
                onMutateResult,
                context
            );
        },
    });
};
