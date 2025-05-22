export interface WebinarsHeldDataTypes {
    uuid: string;
    title: string;
    date: string;
    participants: number;
    status: string;
    rate: number;
}

export interface WebinarsDataTypes {
    uuid: string;
    title: string;
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

export interface WebinarsByIdDataTypes {
    uuid: string;
    title: string;
    banner: string;
    thumbnail: string;
    total_teacher_share: number;
    total_teacher_refunded_share: number;
    total_participants: number;
    total_orders: number;
    total_status_counter: {
        all: number;
        completed: number;
        refunded: 0;
        incompleted: number;
    };
    customers: CustomersTypes[];
}

export interface CustomersTypes {
    first_name: string;
    last_name: string;
}
