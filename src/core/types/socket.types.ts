export interface MessageSocketResponseTypes {
    action: string;
    data: MessageSocketDataTypes[];
    message_type: string;
    status: boolean;
    status_code: number;
    type: string;
}

export interface MessageSocketLoadMessagesTypes {
    action: string;
    data: {
        content: string;
        created_datetime: string;
        seen: boolean;
        sender: {
            first_name: string;
            is_me: false;
            last_name: string;
        };
        uuid: string;
    }[];
    message_type: string;
    status: boolean;
    status_code: number;
    type: string;
}

export interface MessageSocketDataTypes {
    chat_id: string;
    display_name: string;
    last_message: {
        content: string;
        created_datetime: string;
        uuid: string;
        seen: boolean;
        sender: string;
    };
    unread_messages: number;
    uuid: string;
}

export interface MessageSocketPrivateChatConnectTypes {
    message_type: string;
    status: boolean;
    status_code: number;
    type: string;
    data: {
        message: string;
        url: string;
    };
}

export interface EventSocketResponseTypes {
    data: {
        message: string;
    };
    event_type: string;
    status: boolean;
    status_code: number;
    type: string;
}
