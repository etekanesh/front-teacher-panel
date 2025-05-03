import { create } from "zustand";

import { ApiParams, UsersDataTypes } from "core/types";
import { getUser } from "core/services";

interface Props {
    fetching: boolean;
    hasError: boolean;
    userData: UsersDataTypes;
    name: string;
    chatId: string;
    setName: (newName: string) => void;
    setChatId: (chatId: string) => void;
    fetchUserData: (params?: ApiParams) => Promise<void>;
}

export const useUsersStore = create<Props>((set) => ({
    userData: {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        nation_code: "",
        birthday: null,
        role: 0,
        telegram_status: false,
        profile: ""
    },
    fetching: false,
    hasError: false,
    fetchUserData: async () => {
        set({ fetching: true, hasError: false });
        try {
            const response = await getUser();
            set({
                userData: response.data,
                fetching: false,
            });
        } catch {
            set({ hasError: true, fetching: false });
        }
    },
    name: "",
    setName: (newName) => set({ name: newName }),
    chatId: "",
    setChatId: (chat_id) => set({ chatId: chat_id }),
}));
