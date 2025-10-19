export interface FinancialOverViewDataTypes {
    total: number;
    paid: number;
    remaning: number;
    refunded: number;
}

export interface FinancialIncomeListDataTypes {
    id: number;
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
    package: {
        name: string;
        uuid: string;
    };
}

// New API response types for audit detail
export interface AuditDetailApiResponse {
    data: FinancialIncomeListDataTypes[];
    status: boolean;
    paginator: {
        page_size: number;
        total_objects: number;
        total_pages: number;
        current_page_number: number;
        next: string | null;
        previous: string | null;
        next_page_number: number | null;
        previous_page_number: number | null;
    };
    filter_items: {
        packages: Array<{
            package_title: string;
            package_uuid: string;
        }>;
        products: Array<{
            product_title: string;
            product_uuid: string;
        }>;
        courses: Array<{
            course_title: string;
            course_uuid: string;
        }>;
    };
}

// Filter parameters for audit detail API
export interface AuditDetailFilterParams {
    page?: number;
    search?: string;
    packages?: string;
    course_uuid?: string;
    from_date?: string;
    to_date?: string;
    ordering?: string;
}

export interface FinancialStudentsIncomeListDataTypes {
    amount: number;
    current_step: string;
    datetime: string;
    id: number;
    is_completed: boolean;
    teacher_share: number;
    student: { first_name: string; last_name: string };
    platform_detail: {
        name: string;
        icon: string;
    };
}

// New API response types for student income
export interface StudentIncomeApiResponse {
    data: FinancialStudentsIncomeListDataTypes[];
    status: boolean;
    paginator: {
        page_size: number;
        total_objects: number;
        total_pages: number;
        current_page_number: number;
        next: string | null;
        previous: string | null;
        next_page_number: number | null;
        previous_page_number: number | null;
    };
}

// Filter parameters for student income API
export interface StudentIncomeFilterParams {
    page?: number;
    search?: string;
    is_completed?: boolean;
    from_date?: string;
    to_date?: string;
    ordering?: string;
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
