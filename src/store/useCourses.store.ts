import { create } from "zustand";

import { ApiParams, CoursesListDataTypes, } from "core/types";
import { getCoursesList } from "core/services/courses.services";

interface Props {
    fetching: boolean;
    hasError: boolean;
    coursesListData: CoursesListDataTypes[];
    fetchCoursesListData: (params?: ApiParams) => Promise<void>;
}

export const useCoursesStore = create<Props>((set) => ({
    coursesListData: [],
    fetching: false,
    hasError: false,
    fetchCoursesListData: async () => {
        set({ fetching: true, hasError: false });
        try {
            const response = await getCoursesList();
            set({
                coursesListData: response.data,
                fetching: false,
            });
        } catch {
            set({ hasError: true, fetching: false });
        }
    },
}));
