import { create } from "zustand";

import {
    CodesDataTypes,
    DirectSaleSummaryDataTypes,
    WebinarsHeldDataTypes,
    WebinarsHeldDetailDataTypes,
} from "core/types";
import {
    getDirectSaleCodes,
    getDirectSaleSummary,
    getWebinarsHeld,
    getWebinarsHeldDetails,
} from "core/services";

interface Props {
    fetching: boolean;
    hasError: boolean;
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
}

export const useMarketingStore = create<Props>((set) => ({
    fetching: false,
    hasError: false,
    webinarsHeldData: [],
    directSaleCodesData: {
        referrals: []
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
}));
