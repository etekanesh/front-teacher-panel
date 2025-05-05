export interface StudentsListDataTypes {
    user: {
        uuid: string;
        first_name: string;
        last_name: string;
        profile: string;
        last_activity: string,
        telegram_status: boolean,
    };
    process: {
        uuid: string;
        current_level: {
            level: number;
            status: string;
            display: string;
        };
        course: {
            uuid: string;
            title: string;
        };
        student_income: number;
        grouplancing_state: string;
    };
}

export interface StudentDataTypes {
    level_status: {
        max: number;
        current: number;
    };
    order_status: string;
    levels: LevelsTypes[]
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
