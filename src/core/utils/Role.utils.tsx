export const getRoleName = (role: number): string => {
    switch (role) {
        case 1:
            return "مدیرکل";
        case 2:
            return "مدیر";
        case 3:
            return "مدرس";
        case 4:
            return "منتور";
        case 5:
            return "مشتری";
        default:
            return "نامشخص";
    }
};
