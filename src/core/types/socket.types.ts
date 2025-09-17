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

export type SenderType = {
    first_name: string;
    last_name: string;
    is_me?: boolean;
};

export type LastMessageType = {
    uuid: string;
    content: string;
    created_datetime: string;
    seen: boolean;
    sender: SenderType;
};

export type ChatType = {
    uuid: string;
    chat_id: string;
    chat_with: string;
    display_name: string;
    last_message: {
        content: string;
        created_datetime: string;
        seen: boolean;
        sender: {
            first_name: string;
            last_name: string;
            is_me: boolean;
            uuid: string;
        };
        uuid: string;
    };
    unread_messages?: number;
    // این خط رو اضافه کن
    is_selected?: boolean;

};

export type MessageSocketDataTypes = ChatType;