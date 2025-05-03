export interface StudentsListDataTypes {
    user: {
        uuid: string;
        first_name: string;
        last_name: string;
        profile: string;
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
