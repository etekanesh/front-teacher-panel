export interface StudentsListDataTypes extends StudentsContactList {
    user: {
        uuid: string;
        first_name: string;
        last_name: string;
        profile: string | null;
        last_activity: string;
        telegram_status: boolean;
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
        last_level_uuid: string;
        grouplancing_state: {
            state: number;
            label: string;
        };
        last_project: {
            project: string | null;
            datetime: string;
        };
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
