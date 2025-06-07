import { create } from "zustand";

import {
    getMonthlyDollarStatus,
    getSummaryDollarStatus,
    getSummaryStatStudentStatus,
} from "core/services";

import { DollarMonthlyDataTypes, DollarSummaryDataTypes } from "core/types";

interface Props {
    fetching: boolean;
    hasError: boolean;
    dollarSummaryData: DollarSummaryDataTypes[];
    dollarSummaryStudentData: DollarSummaryDataTypes[];
    fetchDollarSummaryData: () => Promise<void>;
    fetchDollarSummaryStudentData: (processId: string) => Promise<void>;
    dollarMonthlyData: DollarMonthlyDataTypes;
    fetchDollarMonthlyData: (year: number, month: number) => Promise<void>;
}

export const useChartStore = create<Props>((set) => ({
    fetching: false,
    hasError: false,
    dollarSummaryData: [
        {
            month: "",
            income: 0,
            count: 0,
            uuid: ""
        },
    ],
    dollarSummaryStudentData: [
        {
            month: "",
            income: 0,
            count: 0,
            uuid: ""
        },
    ],
    dollarMonthlyData: {
        date: {
            year: 0,
            month: 0,
            month_name: "",
        },
        share_of_students: 0,
        student_count: 0,
        total_income: 0,
    },
    fetchDollarSummaryData: async () => {
        set({ fetching: true, hasError: false });
        try {
            const response = await getSummaryDollarStatus();
            set({
                dollarSummaryData: response.data,
                fetching: false,
            });
        } catch {
            set({ hasError: true, fetching: false });
        }
    },
    fetchDollarSummaryStudentData: async (processId: string) => {
        set({ fetching: true, hasError: false });
        try {
            const response = await getSummaryStatStudentStatus(processId);
            set({
                dollarSummaryStudentData: response.data,
                fetching: false,
            });
        } catch {
            set({ hasError: true, fetching: false });
        }
    },
    fetchDollarMonthlyData: async (year: number, month: number) => {
        set({ fetching: true, hasError: false });
        try {
            const response = await getMonthlyDollarStatus(year, month);
            set({
                dollarMonthlyData: response.data,
                fetching: false,
            });
        } catch {
            set({ hasError: true, fetching: false });
        }
    },
}));
