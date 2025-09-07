export const getWSAppURL = () => {
    const isLocalhost = window.location.hostname === "localhost";
    if (isLocalhost) {
        return import.meta.env.VITE_WS_BASE_APP;
    }
    return `${window.location.origin.replace(/^http/, "ws")}/ws/app/`;
};

export const getWSChatURL = (chatId: string) => {
    const isLocalhost = window.location.hostname === "localhost";
    if (isLocalhost) {
        return `${import.meta.env.VITE_WS_BASE_CHAT}${chatId}/`;
    }
    return `${window.location.origin.replace(/^http/, "ws")}/ws/chat/${chatId}/`;
};