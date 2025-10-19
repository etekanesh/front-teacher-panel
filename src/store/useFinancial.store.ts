import { create } from "zustand";

import {
    FinancialIncomeListDataTypes,
    FinancialOverViewDataTypes,
    FinancialStudentsIncomeListDataTypes,
    AuditDetailFilterParams,
    StudentIncomeFilterParams,
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
    auditFilterItems: {
        packages: Array<{ package_title: string; package_uuid: string }>;
        products: Array<{ product_title: string; product_uuid: string }>;
        courses: Array<{ course_title: string; course_uuid: string }>;
    } | null;
    fetchOverViewData: () => Promise<void>;
    fetchSalesIncomeListData: (params?: AuditDetailFilterParams) => Promise<void>;
    fetchStudentsIncomeListData: (params?: StudentIncomeFilterParams) => Promise<void>;
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
    auditFilterItems: null,
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
    fetchSalesIncomeListData: async (params?: AuditDetailFilterParams) => {
        set({ fetchingList: true, hasError: false });
        try {
            const response = await getFinancialIncomeList(params);
            set({
                salesIncomeList: response.data,
                totalObjects: response.paginator.total_objects,
                auditFilterItems: response.filter_items,
                fetchingList: false,
            });
        } catch {
            set({ hasError: true, fetchingList: false });
        }
    },
    fetchStudentsIncomeListData: async (params?: StudentIncomeFilterParams) => {
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
