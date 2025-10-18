export interface StudentsListDataTypes {
    user: {
        uuid: string;
        first_name: string;
        last_name: string;
        last_activity: string;
        telegram_status: boolean;
        profile: string | null;
    };
    process: {
        uuid: string;
        current_level: {
            level: number;
            status_label: string;
            status: number;
            display: string;
        };
        course: {
            uuid: string;
            title: string;
        };
        student_income: number;
        grouplancing_state: {
            state: number;
            label: string;
        };
        last_project: {
            project: string | null;
            datetime: string;
        };
        last_level_uuid: string;
    };
}

export interface StudentsContactList {
    first_name: string;
    last_name: string;
    profile: string;
    uuid: string;
}

export interface StudentDataTypes {
    level_status: {
        max: number;
        current: number;
    };
    order_status: string;
    levels: LevelsTypes[];
}

export interface LevelsTypes {
    uuid: string;
    status: number;
    status_label: string;
    project: string;
}

export interface StudentsStatsDataTypes {
    staudents_count: {
        count: number;
        difference: number;
    };
    total_income: {
        income: number;
        difference: number;
    };
    earning_students: {
        count: number;
        difference: number;
    };
}

export interface StudentLevelDataTypes {
    uuid: string;
    last_project: {
        project: string;
        datetime: string;
    };
    notes: StudentLevelNotesDataTypes[];
    status: number;
    status_label: string;
}

export interface StudentLevelNotesDataTypes {
    user: {
        role: number;
        first_name: string;
        last_name: string;
    };
    datetime: string;
    text: string;
}

export interface StudentLevelNotesPost {
    message: string;
}

// New API response types
export interface StudentsApiResponse {
    data: StudentsListDataTypes[];
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
        max_level: number;
        level_statuses: {
            [key: string]: string;
        };
        kyc_statuses: {
            [key: string]: string;
        };
    };
}

// Filter parameters for the new API
export interface StudentsFilterParams {
    page?: number;
    search?: string;
    current_level?: number;
    current_level_status?: number;
    kyc_status?: number;
    ordering?: string;
}
