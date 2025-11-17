import { getAuthUser } from "@/api/getAuthUser";
import { User } from "@/types";
import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai/vanilla";

const accessTokenStore =
    typeof window !== "undefined"
        ? localStorage.getItem("access-token") || undefined
        : undefined;
const refreshTokenStore =
    typeof window !== "undefined"
        ? localStorage.getItem("refresh-token") || undefined
        : undefined;

export const accessTokenAtom = atomWithStorage<string | undefined>(
    "access-token",
    accessTokenStore
);
export const refreshTokenAtom = atomWithStorage<string | undefined>(
    "refresh-token",
    refreshTokenStore
);

export const authedUser = atom(
    async () => {
        try {
            const user: User = await getAuthUser();
            return user;

        } catch (err) {
            console.error({ authInvalid: err });
            return { isAuthed: false };
        }
    }
);