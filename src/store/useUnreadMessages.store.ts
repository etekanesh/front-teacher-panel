import { create } from "zustand";
import { useChatsStore } from "./useChat.store";

type UnreadMessagesState = {
    totalUnreadMessages: number;
    calculateTotalUnread: () => void;
};

export const useUnreadMessagesStore = create<UnreadMessagesState>((set) => ({
    totalUnreadMessages: 0,

    calculateTotalUnread: () => {
        const { chats } = useChatsStore.getState();

        const total = Object.values(chats).reduce((sum, chat) => {
            return sum + (chat.unread_messages || 0);
        }, 0);

        set({ totalUnreadMessages: total });
    },
}));
