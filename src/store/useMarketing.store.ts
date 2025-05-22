import { create } from "zustand";

import {
    CodesDataTypes,
    DirectSaleSummaryDataTypes,
    WebinarsByIdDataTypes,
    WebinarsDataTypes,
    WebinarsHeldDataTypes,
    WebinarsHeldDetailDataTypes,
} from "core/types";
import {
    getDirectSaleCodes,
    getDirectSaleSummary,
    getWebinars,
    getWebinarsById,
    getWebinarsHeld,
    getWebinarsHeldDetails,
} from "core/services";

interface Props {
    fetching: boolean;
    fetchingWebinarId: boolean;
    hasError: boolean;
    webinarsData: WebinarsDataTypes[];
    webinarsByIdData: WebinarsByIdDataTypes;
    webinarsHeldData: WebinarsHeldDataTypes[];
    webinarsHeldDetailData: WebinarsHeldDetailDataTypes;
    directSaleCodesData: CodesDataTypes;
    directSaleSummaryData: DirectSaleSummaryDataTypes[];
    fetchWebinarsHeldData: () => Promise<void>;
    fetchWebinarsHeldDetailData: (
        webinarId: string,
        webinarDate: string
    ) => Promise<void>;
    fetchDirectSaleCodesData: () => Promise<void>;
    fetchDirectSaleSummaryData: () => Promise<void>;
    fetchWebinarsData: () => Promise<void>;
    fetchWebinarsByIdData: (webinarId: string) => Promise<void>;
}

export const useMarketingStore = create<Props>((set) => ({
    fetching: false,
    fetchingWebinarId: false,
    hasError: false,
    webinarsHeldData: [],
    webinarsData: [],
    webinarsByIdData: {
        uuid: "",
        title: "",
        banner: "",
        thumbnail: "",
        total_teacher_share: 0,
        total_teacher_refunded_share: 0,
        total_participants: 0,
        total_orders: 0,
        total_status_counter: {
            all: 0,
            completed: 0,
            refunded: 0,
            incompleted: 0,
        },
        customers: [],
    },
    directSaleCodesData: {
        referrals: [],
    },
    webinarsHeldDetailData: {
        webinar: {
            uuid: "",
            title: "",
            banner: "",
            thumbnail: "",
            date: "",
            participants: 0,
            status: "",
            rate: 0,
        },
        orders: [],
        orders_count: 0,
    },
    directSaleSummaryData: [],
    fetchWebinarsHeldData: async () => {
        set({ fetching: true, hasError: false });
        try {
            const response = await getWebinarsHeld();
            set({
                webinarsHeldData: response.data,
                fetching: false,
            });
        } catch {
            set({ hasError: true, fetching: false });
        }
    },
    fetchWebinarsHeldDetailData: async (
        webinarId: string,
        webinarDate: string
    ) => {
        set({ fetching: true, hasError: false });
        try {
            const response = await getWebinarsHeldDetails(webinarId, webinarDate);
            set({
                webinarsHeldDetailData: response.data,
                fetching: false,
            });
        } catch {
            set({ hasError: true, fetching: false });
        }
    },
    fetchDirectSaleCodesData: async () => {
        set({ fetching: true, hasError: false });
        try {
            const response = await getDirectSaleCodes();
            set({
                directSaleCodesData: response.data,
                fetching: false,
            });
        } catch {
            set({ hasError: true, fetching: false });
        }
    },
    fetchDirectSaleSummaryData: async () => {
        set({ fetching: true, hasError: false });
        try {
            const response = await getDirectSaleSummary();
            set({
                directSaleSummaryData: response.data,
                fetching: false,
            });
        } catch {
            set({ hasError: true, fetching: false });
        }
    },
    fetchWebinarsData: async () => {
        set({ fetching: true, hasError: false });
        try {
            const response = await getWebinars();
            set({
                webinarsData: response.data,
                fetching: false,
            });
        } catch {
            set({ hasError: true, fetching: false });
        }
    },
    fetchWebinarsByIdData: async (webinarId: string) => {
        set({ fetchingWebinarId: true, hasError: false });
        try {
            const response = await getWebinarsById(webinarId);
            set(() => ({
                webinarsByIdData: response.data,
                fetchingWebinarId: false,
            }));
        } catch {
            set({ hasError: true, fetchingWebinarId: false });
        }
    },
}));
