

interface MessageHandler {
    [key: string]: (message: any) => void;
}

interface MessageHandlers {
    message: MessageHandler;
    event: MessageHandler;
    error: MessageHandler;
}

interface EventListeners {
    open: Array<(event: any) => void>;
    close: Array<(event: any) => void>;
    error: Array<(event: any) => void>;
    reconnect: Array<(info: any) => void>;
}

type MessageData = {
    action?: string,
    data: any,
    message_type: any,
    status: boolean,
    status_code: number,
    type: "message"
}

type EventData = {
    action?: string,
    data: any,
    event_type: any,
    status: boolean,
    status_code: number,
    type: "event"
}
type ErrorData = {
    detail: any,
    error_type: any,
    status: boolean,
    status_code: number,
    type: "error"
}

export default class WebSocketManager {
    private endpoint: string;
    private socket: WebSocket | null = null;
    private eventListeners: EventListeners;
    private messageHandlers: MessageHandlers;
    public reconnectAttempts = 0;
    public maxReconnectAttempts = 5;
    public reconnectInterval = 3000;
    public autoReconnect = true;

    constructor(endpoint: string) {
        if (!endpoint) {
            throw new Error('Endpoint is required');
        }

        this.endpoint = endpoint;

        this.eventListeners = {
            open: [],
            close: [],
            error: [],
            reconnect: []
        };

        this.messageHandlers = {
            message: {},
            event: {},
            error: {}
        };
    }



    connect(): WebSocket {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            console.warn('WebSocket is already connected');
            return this.socket;
        }

        this.socket = new WebSocket(this.endpoint);


        this.socket.onopen = (event: Event) => {
            this.reconnectAttempts = 0;
            this._triggerEvent('open', event);
        };

        this.socket.onmessage = (event: MessageEvent) => {
            this._handleMessage(event);
        };


        this.socket.onclose = (event: CloseEvent) => {
            console.log('WebSocket disconnected', event);
            this._triggerEvent('close', event);

            if (this.autoReconnect) {
                this._attemptReconnect();
            }
        };

        this.socket.onerror = (error: Event) => {
            console.error('WebSocket error', error);
            this._triggerEvent('error', error);
        };
        return this.socket
    }

    disconnect() {
        this.autoReconnect = false;
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }


    send(data: any): boolean {
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



    addEventListener(event: keyof EventListeners, listener: (event: Event) => void) {
        if (!this.eventListeners[event]) {
            console.warn(`Invalid event type: ${event}`);
            return;
        }

        this.eventListeners[event].push(listener);
    }


    removeEventListener(event: keyof EventListeners, listener: (event: Event) => void) {
        if (!this.eventListeners[event]) {
            console.warn(`Invalid event type: ${event}`);
            return;
        }

        this.eventListeners[event] = this.eventListeners[event].filter(
            l => l !== listener
        );
    }


    on(messageType: keyof MessageHandlers, actionOrHandler?: string | ((message: any) => void), handler?: (message: any) => void): void {
        if (!this.messageHandlers[messageType]) {
            console.error(`Invalid message type: ${messageType}`);
            return;
        }

        if (typeof actionOrHandler === 'string' && typeof handler === 'function') {
            this.messageHandlers[messageType][actionOrHandler] = handler;
        }

        else if (typeof actionOrHandler === 'function' && handler === undefined) {
            this.messageHandlers[messageType]['default'] = actionOrHandler;
        }

        else if (actionOrHandler === undefined && typeof handler === 'function') {
            this.messageHandlers[messageType]['default'] = handler;
        }
        else {
            console.error('Invalid parameters passed to `on` method.');
        }
    }

    private _handleMessage(event: MessageEvent): void {
        try {
            const message: MessageData | EventData | ErrorData = JSON.parse(event.data);
            const { type } = message

            let msg_type: any;
            switch (type) {
                case "message":
                    msg_type = message.message_type
                    if (msg_type == "data") { msg_type = message.action }
                    break;
                case "event":
                    msg_type = message.event_type
                    break;
                case "error":
                    msg_type = message.error_type
                    break;

            }

            msg_type = msg_type


            let handler = this.messageHandlers[type][msg_type]

            if (handler && typeof handler == 'function') {
                handler(message)
            } else {
                handler = this.messageHandlers[type]['default']
                if (typeof handler == 'function') {
                    handler(message)
                }
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
            maxAttempts: this.maxReconnectAttempts
        });

        setTimeout(() => {
            this.connect();
        }, this.reconnectInterval);
    }



    private _triggerEvent(event: keyof EventListeners, data: any): void {
        if (this.eventListeners[event]) {
            this.eventListeners[event].forEach(listener => {
                try {
                    listener(data);
                } catch (error) {
                    console.error(`Error in ${event} event listener:`, error);
                }
            });
        }
    }


}

