export interface WebinarsHeldDataTypes {
    uuid: string;
    title: string;
    date: string;
    participants: number;
    status: string;
    rate: number;
}

export interface WebinarsHeldDetailDataTypes {
    webinar: {
        uuid: string;
        title: string;
        banner: string;
        thumbnail: string;
        date: string;
        participants: number;
        status: string;
        rate: number;
    };
    orders: WebinarsHeldOrdersDataTypes[];
    orders_count: number;
}

export interface WebinarsHeldOrdersDataTypes {
    customer: {
        first_name: string;
        last_name: string;
    };
    paid_amount: number;
    status: number;
    status_label: string;
    teacher_share: { share: number; refunded_share: number };
}

export interface CodesDataTypes {
    referrals: {
        amount: number;
        profit: number;
        code: number;
    }[];
}

export interface DirectSaleSummaryDataTypes {
    uuid: string;
    month: string;
    income: number;
}
