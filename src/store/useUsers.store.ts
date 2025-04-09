import { create } from "zustand";

import { ApiParams, UsersData } from "core/types";
import { getUsers } from "core/services";

interface Props {
    fetching: boolean;
    hasError: boolean;
    userData: UsersData[];
    fetchUserData: (params?: ApiParams) => Promise<void>;
}

export const useUsersStore = create<Props>((set) => ({
    userData: [],
    fetching: false,
    hasError: false,
    fetchUserData: async () => {
        set({ fetching: true, hasError: false });
        try {
            const response = await getUsers();
            set({
                userData: response,
                fetchUserData: response,
                fetching: false,
            });
        } catch {
            set({ hasError: true, fetching: false });
        }
    }
}));
