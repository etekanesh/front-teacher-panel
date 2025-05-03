import { create } from "zustand";

import { getStudents, getStudentsSummaryStats } from "core/services";
import { ApiParams, StudentsListDataTypes, StudentsStatsDataTypes } from "core/types";

interface Props {
    fetching: boolean;
    hasError: boolean;
    studentsListData: StudentsListDataTypes[];
    studentsStatsData: StudentsStatsDataTypes;
    fetchStudentsListData: (params?: ApiParams) => Promise<void>;
    fetchStudentsStatsData: () => Promise<void>;
}

export const useStudentsStore = create<Props>((set) => ({
    studentsListData: [],
    studentsStatsData: {
        staudents_count: {
            count: 0,
            difference: 0
        },
        total_income: {
            income: 0,
            difference: 0
        },
        earning_students: {
            count: 0,
            difference: 0
        }
    },
    fetching: false,
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
}));
