import { StudentsListDataTypes } from "core/types";
import theme from "theme";

export const MapStudentsToRows = (
    students: StudentsListDataTypes[],
    page: number,
    pageSize: number
) => {
    return students.map((item, index) => ({
        id: page * pageSize + index + 1,
        fullName: {
            id: item?.process?.uuid,
            imageSrc: "https://etekanesh.com/static/panel/media/avatars/blank.png",
            fullName: `${item.user.first_name} ${item.user.last_name}`,
            lastActivity: item?.user?.last_activity,
            uuid: item?.user?.uuid,
        },
        currentGrade: {
            grade: item.process.current_level.display || "-",
        },
        studentIncome: {
            income: item?.process?.student_income,
            percent: "+25%",
        },
        groupStatus: {
            status: item?.process?.grouplancing_state?.state,
            label: item?.process?.grouplancing_state?.label,
        },
        studentStatus: {
            status_label: item.process.current_level.status_label || "-",
            status: item.process.current_level.status,
        },
        process: {
            processId: item?.process?.uuid,
        },
        lastLevel: item?.process.last_level_uuid,
        lastProject: {
            project: item?.process?.last_project?.project,
            datetime: item?.process?.last_project?.datetime,
        },
        action: 1,
    }));
};

export const groupStatusMap: Record<
    number,
    { label: string; color: string; bgcolor: string; borderColor: string }
> = {
    [-1]: {
        label: "نامشخص",
        color: theme.palette.grey[500] || "#757575",
        bgcolor: theme.palette.grey[100] || "#f5f5f5",
        borderColor: theme.palette.grey[300] || "#e0e0e0",
    },
    [0]: {
        label: "وجود ندارد",
        color: theme.palette.grey[600] || "#616161",
        bgcolor: theme.palette.grey[200] || "#eeeeee",
        borderColor: theme.palette.grey[400] || "#bdbdbd",
    },
    [1]: {
        label: "جدید",
        color: theme.palette.info[700] || "#1976d2",
        bgcolor: theme.palette.info[100] || "#bbdefb",
        borderColor: theme.palette.info[300] || "#64b5f6",
    },
    [2]: {
        label: "در جریان",
        color: theme.palette.warning[500] || "#ff9800",
        bgcolor: theme.palette.warning[50] || "#fff3e0",
        borderColor: theme.palette.warning[200] || "#ffcc02",
    },
    [3]: {
        label: "تکمیل شده",
        color: theme.palette.success[500] || "#4caf50",
        bgcolor: theme.palette.success[50] || "#e8f5e8",
        borderColor: theme.palette.success[200] || "#a5d6a7",
    },
};

export const studentStatusMap: Record<
    number,
    {
        label: string;
        color: string;
        bgcolor: string;
        borderColor: string;
        iconColor: string;
    }
> = {
    [-3]: {
        label: "در انتظار نظرسنجی",
        color: theme.palette.warning[500] || "#f57c00",
        bgcolor: theme.palette.warning[50] || "#fff3e0",
        borderColor: theme.palette.warning[200] || "#ffcc02",
        iconColor: "warning",
    },
    [-2]: {
        label: "در انتظار بازخورد",
        color: theme.palette.warning[500] || "#f57c00",
        bgcolor: theme.palette.warning[50] || "#fff3e0",
        borderColor: theme.palette.warning[200] || "#ffcc02",
        iconColor: "warning",
    },
    [-1]: {
        label: "ردشده",
        color: theme.palette.error[500] || "#f44336",
        bgcolor: theme.palette.error[50] || "#ffebee",
        borderColor: theme.palette.error[200] || "#ffcdd2",
        iconColor: "error",
    },
    [0]: {
        label: "در انتظار ارسال تکلیف",
        color: theme.palette.warning[500] || "#ff9800",
        bgcolor: theme.palette.warning[50] || "#fff3e0",
        borderColor: theme.palette.warning[200] || "#ffcc02",
        iconColor: "warning",
    },
    [1]: {
        label: "در انتظار تایید مدرس",
        color: theme.palette.info[700] || "#1976d2",
        bgcolor: theme.palette.info[100] || "#bbdefb",
        borderColor: theme.palette.info[300] || "#64b5f6",
        iconColor: "info",
    },
    [2]: {
        label: "تاییده شده",
        color: theme.palette.success[500] || "#4caf50",
        bgcolor: theme.palette.success[50] || "#e8f5e8",
        borderColor: theme.palette.success[200] || "#a5d6a7",
        iconColor: "success",
    },
};
