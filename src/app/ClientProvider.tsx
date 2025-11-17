"use client";

import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";

const queryClient = new QueryClient();

export default function ClientProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={<LoadingOverlay />}>{children}</Suspense>
            <Toaster />
        </QueryClientProvider>
    );
}
