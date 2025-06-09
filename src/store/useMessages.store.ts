import { create } from "zustand";

import { getStudents } from "core/services";
import { ApiParams, StudentsListDataTypes } from "core/types";

interface Props {
    fetching: boolean;
    hasError: boolean;
    studentsListMessagesData: StudentsListDataTypes[];
    fetchStudentsListMessagesData: (params?: ApiParams) => Promise<void>;
}

export const useMessagesStore = create<Props>((set) => ({
    studentsListMessagesData: [],
    fetching: false,
    hasError: false,
    fetchStudentsListMessagesData: async (params) => {
        set({ fetching: true, hasError: false });
        try {
            const response = await getStudents(params);
            set({
                studentsListMessagesData: response.data,
                fetching: false,
            });
        } catch {
            set({ hasError: true, fetching: false });
        }
    },
}));
