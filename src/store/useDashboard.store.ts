import { create } from "zustand";

import {
  getMonthlyStatus,
  getOverviewStatus,
  getSummaryStatus,
  getSummaryStatusById,
} from "core/services";
import {
  DashboardMonthlyDataTypes,
  DashboardOverviewDataTypes,
  DashboardSummaryDataTypes,
} from "core/types/dashboard.types";

interface Props {
  fetching: boolean;
  hasError: boolean;
  dashOverviewData: DashboardOverviewDataTypes;
  fetchDashOverviewData: () => Promise<void>;

  dashboardMonthlyData: DashboardMonthlyDataTypes;
  fetchDashboardMonthlyData: (year: number, month: number) => Promise<void>;
  dashboardSummaryData: DashboardSummaryDataTypes[];
  fetchDashboardSummaryData: () => Promise<void>;
  SummaryByIdData: DashboardSummaryDataTypes[];
  fetchSummaryByIdData: (id: string) => Promise<void>;
}

export const useDashboardStore = create<Props>((set) => ({
  dashOverviewData: {
    in_review: 0,
    label: "",
    students_total_income: "",
    unanswered_messages: 0,
  },
  dashboardSummaryData: [
    {
      month: "",
      income: 0,
      sold: 0,
    },
  ],
  SummaryByIdData: [
    {
      month: "",
      income: 0,
      sold: 0,
    },
  ],
  dashboardMonthlyData: {
    date: {
      year: 0,
      month: 0,
      month_name: "",
    },
    sold_income: 0,
    webinar_income: 0,
    share_of_students: 0,
  },
  fetching: false,
  hasError: false,
  fetchDashOverviewData: async () => {
    set({ fetching: true, hasError: false });
    try {
      const response = await getOverviewStatus();
      set({
        dashOverviewData: response.data,
        fetching: false,
      });
    } catch {
      set({ hasError: true, fetching: false });
    }
  },
  fetchDashboardSummaryData: async () => {
    set({ fetching: true, hasError: false });
    try {
      const response = await getSummaryStatus();
      set({
        dashboardSummaryData: response.data,
        fetching: false,
      });
    } catch {
      set({ hasError: true, fetching: false });
    }
  },
  fetchDashboardMonthlyData: async (year: number, month: number) => {
    set({ fetching: true, hasError: false });
    try {
      const response = await getMonthlyStatus(year, month);
      set({
        dashboardMonthlyData: response.data,
        fetching: false,
      });
    } catch {
      set({ hasError: true, fetching: false });
    }
  },
  fetchSummaryByIdData: async (id: string) => {
    set({ fetching: true, hasError: false });
    try {
      const response = await getSummaryStatusById(id);
      set({
        SummaryByIdData: response.data,
        fetching: false,
      });
    } catch {
      set({ hasError: true, fetching: false });
    }
  },
}));
