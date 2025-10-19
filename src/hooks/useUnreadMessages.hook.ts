import { useChatsStore } from "store/useChat.store";

/**
 * Custom hook to calculate total unread messages across all chats
 * @returns {number} Total count of unread messages
 */
export const useUnreadMessages = (): number => {
  const { chats } = useChatsStore();
  
  // Calculate total unread messages from all chats
  const totalUnreadMessages = Object.values(chats).reduce((total, chat) => {
    return total + (chat.unread_messages || 0);
  }, 0);

  return totalUnreadMessages;
};
