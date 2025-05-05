import { StudentsListDataTypes } from "core/types";

export const MapStudentsToRows = (students: StudentsListDataTypes[]) => {
    return students.map((item, index) => ({
        id: index + 1,
        fullName: {
            id: item?.process?.uuid,
            imageSrc: "https://etekanesh.com/static/panel/media/avatars/blank.png",
            fullName: `${item.user.first_name} ${item.user.last_name}`,
            lastActivity: item?.user?.last_activity,
            status: item.process.current_level,
            uuid: item?.user?.uuid,
        },
        currentGrade: {
            grade: item.process.current_level.display || "-",
        },
        studentIncome: {
            income: item?.process?.student_income, // Replace with real data if available
            percent: "+25%", // Replace with real data if available
        },
        groupStatus: {
            status: item?.process?.grouplancing_state, // Replace with real data if available
        },
        studentStatus: {
            status: item.process.current_level.status || "-", // Replace with real data if available
        },

        action: 1, // or any logic you want
    }));
};