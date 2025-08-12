export interface FinancialOverViewDataTypes {
    total: number;
    paid: number;
    remaning: number;
    refunded: number;
}

export interface FinancialIncomeListDataTypes {
    created_datetime: string;
    uuid: string;
    shares: {
        total: number;
        teacher: number;
        customer: number;
        grouplancing: number;
        etekanesh: number;
    };
    course_name: string;
}

export interface FinancialStudentsIncomeListDataTypes {
    amount: number;
    current_step: string;
    datetime: string;
    id: number;
    is_completed: boolean;
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
