import { create } from "zustand";

import {
    getStudents,
    getStudentsById,
    getStudentsSummaryStats,
} from "core/services";
import {
    ApiParams,
    StudentDataTypes,
    StudentsListDataTypes,
    StudentsStatsDataTypes,
} from "core/types";

interface Props {
    fetching: boolean;
    fetchingStudent: boolean;
    hasError: boolean;
    studentsListData: StudentsListDataTypes[];
    studentData: StudentDataTypes;
    studentsStatsData: StudentsStatsDataTypes;
    fetchStudentsListData: (params?: ApiParams) => Promise<void>;
    fetchStudentData: (id: string) => Promise<void>;
    fetchStudentsStatsData: () => Promise<void>;
}

export const useStudentsStore = create<Props>((set) => ({
    studentsListData: [],
    studentData: {
        level_status: {
            max: 0,
            current: 0,
        },
        order_status: "",
        levels: [],
    },
    studentsStatsData: {
        staudents_count: {
            count: 0,
            difference: 0,
        },
        total_income: {
            income: 0,
            difference: 0,
        },
        earning_students: {
            count: 0,
            difference: 0,
        },
    },
    fetching: false,
    fetchingStudent: false,
    hasError: false,
    fetchStudentsListData: async (params) => {
        set({ fetching: true, hasError: false });
        try {
            const response = await getStudents(params);
            set({
                studentsListData: response.data,
                fetching: false,
            });
        } catch {
            set({ hasError: true, fetching: false });
        }
    },
    fetchStudentsStatsData: async () => {
        set({ fetching: true, hasError: false });
        try {
            const response = await getStudentsSummaryStats();
            set({
                studentsStatsData: response.data,
                fetching: false,
            });
        } catch {
            set({ hasError: true, fetching: false });
        }
    },
    fetchStudentData: async (id: string) => {
        set({ fetchingStudent: true, hasError: false });
        try {
            const response = await getStudentsById(id);
            set({
                studentData: response.data,
                fetchingStudent: false,
            });
        } catch {
            set({ hasError: true, fetchingStudent: false });
        }
    },
}));
