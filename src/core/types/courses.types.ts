export interface CoursesListDataTypes {
    uuid: string;
    title: string;
    students_count: number;
    episodes_count: number;
    duration: number;
    status: {
        label: string;
        status: number;
    };
}
