import dayjs from "dayjs";
import jalaliday from "jalaliday";
import "dayjs/locale/fa";

dayjs.extend(jalaliday);
dayjs.locale("fa");

export function formatPersianDate(inputDate: string): string {
    const now = dayjs().calendar("jalali");
    const date = dayjs(inputDate).calendar("jalali");

    const isToday = date.isSame(now, "day");
    const isYesterday = date.isSame(now.subtract(1, "day"), "day");
    const isLast7Days = date.isAfter(now.subtract(7, "day"));

    const weekdays = [
        "یک‌شنبه",
        "دوشنبه",
        "سه‌شنبه",
        "چهارشنبه",
        "پنج‌شنبه",
        "جمعه",
        "شنبه",
    ];
    const weekdayName = weekdays[date.day()];

    if (isToday) return `امروز، ${date.format("HH:mm")}`;
    if (isYesterday) return `دیروز، ${date.format("HH:mm")}`;
    if (isLast7Days) return `${weekdayName}، ${date.format("HH:mm")}`;
    return date.format("YYYY/MM/DD – HH:mm");
}
