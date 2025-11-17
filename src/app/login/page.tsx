"use client";

import { getAuthUser } from "@/api/getAuthUser";
import { authedUser } from "@/atom/auth";
import LoginPage from "@/components/pages/login";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai/react";

export default function Page() {
    const { data: authedUsers } = useQuery({
        queryKey: ["authUser"],
        queryFn: getAuthUser,
    });
    const user = useAtomValue(authedUser);
    console.log({ user });
    console.log({ authedUsers });
    return <LoginPage />;
}
