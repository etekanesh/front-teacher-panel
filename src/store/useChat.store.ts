import { create } from "zustand";
import { ChatType } from "core/types";

type ChatsState = {
    chats: Record<string, ChatType>;
    loading: boolean;
    setChats: (chats: Record<string, ChatType>) => void;
    updateChat: (chatId: string, update: Partial<ChatType>) => void;
    setLoading: (loading: boolean) => void;
};

export const useChatsStore = create<ChatsState>((set) => ({
    chats: {},
    loading: false,

    setChats: (chats) => set({ chats }),

    setLoading: (loading) => set({ loading }),

    updateChat: (chatId, update) =>
        set((state) => {
            const prevChat = state.chats[chatId];
            if (!prevChat) return state;

            const isNewMessageFromOther =
                update.last_message &&
                !update.last_message.sender?.is_me;

            const unreadCount =
                isNewMessageFromOther
                    ? (prevChat.unread_messages || 0) + 1
                    : prevChat.unread_messages || 0;

            return {
                chats: {
                    ...state.chats,
                    [chatId]: {
                        ...prevChat,
                        ...update,
                        unread_messages: unreadCount,
                    },
                },
            };
        }),
}));
