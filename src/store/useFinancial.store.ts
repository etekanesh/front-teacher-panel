import { create } from "zustand";

import {
    ApiParams,
    FinancialIncomeListDataTypes,
    FinancialOverViewDataTypes,
    FinancialStudentsIncomeListDataTypes,
} from "core/types";
import {
    getFinancialIncomeList,
    getFinancialOverview,
    getFinancialStudentIncomeList,
} from "core/services";

interface Props {
    fetching: boolean;
    fetchingList: boolean;
    hasError: boolean;
    totalObjects: number;
    overViewData: FinancialOverViewDataTypes;
    salesIncomeList: FinancialIncomeListDataTypes[];
    studentsIncomeList: FinancialStudentsIncomeListDataTypes[];
    fetchOverViewData: () => Promise<void>;
    fetchSalesIncomeListData: (params?: ApiParams) => Promise<void>;
    fetchStudentsIncomeListData: (params?: ApiParams) => Promise<void>;
}

export const useFinancialStore = create<Props>((set) => ({
    totalObjects: 0,
    overViewData: {
        total: 0,
        paid: 0,
        remaning: 0,
        refunded: 0,
    },
    salesIncomeList: [],
    studentsIncomeList: [],
    fetching: false,
    fetchingList: false,
    hasError: false,
    fetchOverViewData: async () => {
        set({ fetching: true, hasError: false });
        try {
            const response = await getFinancialOverview();
            set({
                overViewData: response.data,
                fetching: false,
            });
        } catch {
            set({ hasError: true, fetching: false });
        }
    },
    fetchSalesIncomeListData: async (params?: ApiParams | undefined) => {
        set({ fetchingList: true, hasError: false });
        try {
            const response = await getFinancialIncomeList(params);
            set({
                salesIncomeList: response.data,
                totalObjects: response.paginator.total_objects,
                fetchingList: false,
            });
        } catch {
            set({ hasError: true, fetchingList: false });
        }
    },
    fetchStudentsIncomeListData: async (params?: ApiParams | undefined) => {
        set({ fetchingList: true, hasError: false });
        try {
            const response = await getFinancialStudentIncomeList(params);
            set({
                studentsIncomeList: response.data,
                totalObjects: response.paginator.total_objects,
                fetchingList: false,
            });
        } catch {
            set({ hasError: true, fetchingList: false });
        }
    },
}));
