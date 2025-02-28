import React, { useState, useEffect } from "react";

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
    return formatter.format(now); // Example output: "۲۹ دی ۱۴۰۳"
  }

  function convertToPersian(numberString: string): string {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return numberString.replace(/\d/g, (digit) => persianDigits[+digit]);
  }

  return date;
};
