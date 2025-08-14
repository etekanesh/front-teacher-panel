export interface FinancialOverViewDataTypes {
    total: number;
    paid: number;
    remaning: number;
    refunded: number;
}

export interface FinancialIncomeListDataTypes {
    id: any;
    course_name: string;
    customer: {
        first_name: string;
        last_name: string;
    };
    invoice: {
        pay_datetime: string;
        total_paid: number;
        type: number;
        type_label: string;
    };
    shares: {
        customer: number;
        etekanesh: number;
        grouplancing: number;
        teacher: number;
        total: number;
    };
}

export interface FinancialStudentsIncomeListDataTypes {
    amount: number;
    current_step: string;
    datetime: string;
    id: number;
    is_completed: boolean;
    teacher_share: number;
    student: { first_name: string; last_name: string };
}

export interface DollarSummaryDataTypes {
    month: string;
    income: number;
    count: number;
    uuid: string;
}

export interface DollarMonthlyDataTypes {
    date: {
        year: number;
        month: number;
        month_name: string;
    };
    total_income: number;
    student_count: number;
    share_of_students: number;
}
