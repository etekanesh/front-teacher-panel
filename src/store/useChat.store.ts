import { create } from "zustand";
import { ChatType } from "core/types";

type ChatsState = {
    chats: Record<string, ChatType>;
    loading: boolean;
    setChats: (chats: Record<string, ChatType>) => void;
    setLoading: (loading: boolean) => void;
    updateChat: (uuid: string, data: Partial<ChatType>) => void;
};

export const useChatsStore = create<ChatsState>((set) => ({
    chats: {},
    loading: true,
    setChats: (chats) => set({ chats }),
    setLoading: (loading) => set({ loading }),
    updateChat: (uuid, data) =>
        set((state) => ({
            chats: { ...state.chats, [uuid]: { ...state.chats[uuid], ...data } },
        })),
}));