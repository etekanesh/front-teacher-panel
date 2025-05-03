export const allChatsApp = () => {
    return `wss://beta.etekanesh.com/ws/app/`;
};

export const chatDetailsWs = (id: string | undefined) => {
    return new WebSocket(
        `127.0.0.1/ws/chat/${id}/`
    );
};

