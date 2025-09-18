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
        action: 1,
    }));
};

export const groupStatusMap: Record<
    number,
    { label: string; color: string; bgcolor: string; borderColor: string }
> = {
    [-2]: {
        label: "بسته شده",
        color: theme.palette.error[500] || "#f44336",
        bgcolor: theme.palette.error[400] || "#ffcdd2",
        borderColor: theme.palette.error[500] || "#f44336",
    },
    [-1]: {
        label: "ناموفق",
        color: theme.palette.warning[500] || "#d32f2f",
        bgcolor: theme.palette.warning[600] || "#ffcdd2",
        borderColor: theme.palette.warning[500] || "#f44336",
    },
    [1]: {
        label: "در حال کسب درآمد",
        color: theme.palette.primary[400] || "#42a5f5",
        bgcolor: theme.palette.primary[50] || "#e3f2fd",
        borderColor: theme.palette.primary[200] || "#90caf9",
    },
    [2]: {
        label: "درخواست اکانت",
        color: theme.palette.warning[500] || "#ffa726",
        bgcolor: theme.palette.warning[600] || "#fb8c00",
        borderColor: theme.palette.warning[500] || "#ffa726",
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
        bgcolor: theme.palette.warning[600] || "#ffe0b2",
        borderColor: theme.palette.warning[500] || "#ffa726",
        iconColor: "warning",
    },
    [-2]: {
        label: "در انتظار بازخورد",
        color: theme.palette.warning[500] || "#f57c00",
        bgcolor: theme.palette.warning[600] || "#ffe0b2",
        borderColor: theme.palette.warning[500] || "#ffa726",
        iconColor: "warning",
    },
    [-1]: {
        label: "ردشده",
        color: theme.palette.error[500] || "#f44336",
        bgcolor: theme.palette.error[400] || "#ffcdd2",
        borderColor: theme.palette.error[500] || "#f44336",
        iconColor: theme.palette.error[400] || "#ffcdd2",
    },
    [0]: {
        label: "در انتظار ارسال تکلیف",
        color: theme.palette.warning[500] || "#ef6c00",
        bgcolor: theme.palette.warning[600] || "#ffe0b2",
        borderColor: theme.palette.warning[500] || "#ffa726",
        iconColor: "warning",
    },
    [1]: {
        label: "در انتظار تایید مدرس",
        color: theme.palette.warning[500] || "#ef6c00",
        bgcolor: theme.palette.warning[600] || "#ffe0b2",
        borderColor: theme.palette.warning[500] || "#ffa726",
        iconColor: "warning",
    },
    [2]: {
        label: "تاییده شده",
        color: theme.palette.primary[400] || "#4caf50",
        bgcolor: theme.palette.primary[50] || "#c8e6c9",
        borderColor: theme.palette.primary[200] || "#4caf50",
        iconColor: theme.palette.primary[400] || "#4caf50",
    },
};
