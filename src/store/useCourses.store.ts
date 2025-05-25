import { create } from "zustand";

import {
    ApiParams,
    CourseByIdDataTypes,
    CoursesFeedbackDataTypes,
    CoursesLevelAcademyDataTypes,
    CoursesListDataTypes,
    CoursesMeetingsDataTypes,
} from "core/types";
import {
    getCoursesById,
    getCoursesFeedback,
    getCoursesLevelsAcademy,
    getCoursesList,
    getCoursesMeetings,
} from "core/services/courses.services";

interface Props {
    fetching: boolean;
    hasError: boolean;
    coursesListData: CoursesListDataTypes[];
    courseByIdtData: CourseByIdDataTypes;
    coursesMeetingsData: CoursesMeetingsDataTypes[];
    coursesFeedbackData: CoursesFeedbackDataTypes;
    coursesLevelAcademy: CoursesLevelAcademyDataTypes;
    fetchCoursesListData: (params?: ApiParams) => Promise<void>;
    fetchCoursesMeetingsData: () => Promise<void>;
    fetchCourseByIdData: (id: string) => Promise<void>;
    fetchCoursesFeedbackData: () => Promise<void>;
    fetchCoursesLevelAcademyData: () => Promise<void>;
}

export const useCoursesStore = create<Props>((set) => ({
    coursesListData: [],
    coursesMeetingsData: [],
    coursesFeedbackData: {
        count: 0,
        summary: {},
    },
    coursesLevelAcademy: {},
    courseByIdtData: {
        uuid: "",
        title: "",
        banner: "",
        thumbnail: "",
        students_count: 0,
        episodes_count: 0,
        duration: 0,
        status: {
            label: "",
            status: 0,
        },
        headlines: [],
    },
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
    fetchCoursesMeetingsData: async () => {
        set({ fetching: true, hasError: false });
        try {
            const response = await getCoursesMeetings();
            set({
                coursesMeetingsData: response.data,
                fetching: false,
            });
        } catch {
            set({ hasError: true, fetching: false });
        }
    },
    fetchCourseByIdData: async (id: string) => {
        set({ fetching: true, hasError: false });
        try {
            const response = await getCoursesById(id);
            set({
                courseByIdtData: response.data,
                fetching: false,
            });
        } catch {
            set({ hasError: true, fetching: false });
        }
    },
    fetchCoursesFeedbackData: async () => {
        set({ fetching: true, hasError: false });
        try {
            const response = await getCoursesFeedback();
            set({
                coursesFeedbackData: response.data,
                fetching: false,
            });
        } catch {
            set({ hasError: true, fetching: false });
        }
    },
    fetchCoursesLevelAcademyData: async () => {
        set({ fetching: true, hasError: false });
        try {
            const response = await getCoursesLevelsAcademy();
            set({
                coursesLevelAcademy: response.data,
                fetching: false,
            });
        } catch {
            set({ hasError: true, fetching: false });
        }
    },
}));
