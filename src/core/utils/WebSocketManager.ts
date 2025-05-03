type WebSocketEventType = 'open' | 'close' | 'error' | 'reconnect';
type MessageType = 'message' | 'event' | 'error';

type WebSocketListener = (event: any) => void;
type MessageHandler = (message: any) => void;

interface MessageHandlers {
    [action: string]: MessageHandler;
    default?: MessageHandler;
}

interface HandlersByType {
    message: MessageHandlers;
    event: MessageHandlers;
    error: MessageHandlers;
}

export default class WebSocketManager {
    private endpoint: string;
    private socket: WebSocket | null = null;

    private eventListeners: Record<WebSocketEventType, WebSocketListener[]> = {
        open: [],
        close: [],
        error: [],
        reconnect: [],
    };

    private messageHandlers: HandlersByType = {
        message: {},
        event: {},
        error: {},
    };

    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectInterval = 3000;
    private autoReconnect = true;

    constructor(endpoint: string) {
        if (!endpoint) {
            throw new Error('Endpoint is required');
        }
        this.endpoint = endpoint;
    }

    public connect(): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            console.warn('WebSocket is already connected');
            return;
        }

        this.socket = new WebSocket(this.endpoint);

        this.socket.onopen = (event) => {
            this.reconnectAttempts = 0;
            this._triggerEvent('open', event);
        };

        this.socket.onmessage = (event) => this._handleMessage(event);

        this.socket.onclose = (event) => {
            console.log('WebSocket disconnected', event);
            this._triggerEvent('close', event);

            if (this.autoReconnect) {
                this._attemptReconnect();
            }
        };

        this.socket.onerror = (event) => {
            console.error('WebSocket error', event);
            this._triggerEvent('error', event);
        };
    }

    public disconnect(): void {
        this.autoReconnect = false;
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }

    public forceReconnect(): void {
        this.disconnect();
        this.autoReconnect = true;
        this.connect();
    }

    public send(data: any): boolean {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            console.error('WebSocket is not connected');
            return false;
        }

        try {
            const jsonData = JSON.stringify(data);
            this.socket.send(jsonData);
            return true;
        } catch (error) {
            console.error('Error sending message:', error);
            return false;
        }
    }

    public isConnected(): boolean {
        return this.socket?.readyState === WebSocket.OPEN;
    }

    public addEventListener(event: WebSocketEventType, listener: WebSocketListener): void {
        if (!this.eventListeners[event]) {
            console.warn(`Invalid event type: ${event}`);
            return;
        }
        this.eventListeners[event].push(listener);
    }

    public removeEventListener(event: WebSocketEventType, listener: WebSocketListener): void {
        if (!this.eventListeners[event]) {
            console.warn(`Invalid event type: ${event}`);
            return;
        }

        this.eventListeners[event] = this.eventListeners[event].filter((l) => l !== listener);
    }

    public on(type: MessageType, action: string | MessageHandler, handler?: MessageHandler): void {
        if (!this.messageHandlers[type]) {
            console.error(`Invalid message type: ${type}`);
            return;
        }

        if (typeof action === 'function') {
            this.messageHandlers[type].default = action;
        } else if (handler) {
            this.messageHandlers[type][action] = handler;
        }
    }

    private _handleMessage(event: MessageEvent): void {
        try {
            const message = JSON.parse(event.data);
            const type = message.type as MessageType;

            if (!['message', 'event', 'error'].includes(type)) {
                console.warn('Unhandled message type:', type);
                return;
            }

            let msgType: string | undefined;

            switch (type) {
                case 'message':
                    msgType = message.message_type === 'data' ? message.action : message.message_type;
                    break;
                case 'event':
                    msgType = message.event_type;
                    break;
                case 'error':
                    msgType = message.error_type;
                    break;
            }

            const handlers = this.messageHandlers[type];
            const handler = handlers[msgType] || handlers.default;

            if (typeof handler === 'function') {
                handler(message);
            }
        } catch (error) {
            console.error('Error parsing WebSocket message:', error);
        }
    }

    private _attemptReconnect(): void {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('Max reconnection attempts reached');
            return;
        }

        this.reconnectAttempts++;
        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
        this._triggerEvent('reconnect', {
            attempt: this.reconnectAttempts,
            maxAttempts: this.maxReconnectAttempts,
        });

        const delay = this.reconnectInterval * Math.pow(2, this.reconnectAttempts - 1); // exponential backoff
        setTimeout(() => this.connect(), delay);
    }

    private _triggerEvent(event: WebSocketEventType, data: any): void {
        this.eventListeners[event]?.forEach((listener) => {
            try {
                listener(data);
            } catch (error) {
                console.error(`Error in ${event} event listener:`, error);
            }
        });
    }
}
