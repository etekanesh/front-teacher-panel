import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/fa';

dayjs.locale('fa');

export const PersianDate = () => {
  const [date, setDate] = useState(convertToPersian(getPersianDate()));

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(convertToPersian(getPersianDate())); // Update date in case of midnight change
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  function getPersianDate(): string {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formatter.format(now);
  }

  function convertToPersian(numberString: string): string {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return numberString.replace(/\d/g, (digit) => persianDigits[+digit]);
  }

  return date;
};

export const PersianConvertDate = (date: string) => {

  const createdDate = dayjs(date).calendar('jalali');

  const formattedDate = createdDate.format('D MMMM ماه YYYY');

  return formattedDate;
};
