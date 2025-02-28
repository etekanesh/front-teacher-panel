import { useState, useEffect } from "react";

export const LiveTime = () => {
  const [time, setTime] = useState(convertToPersian(getCurrentTime()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(convertToPersian(getCurrentTime()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`; // 24-hour format
  }

  function convertToPersian(numberString: string): string {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return numberString.replace(/\d/g, (digit) => persianDigits[+digit]);
  }

  return time;
};
