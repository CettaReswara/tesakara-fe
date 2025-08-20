"use client";
import { useEffect, useMemo, useState } from "react";
import { poppins } from "@/app/font";

type Labels = {
  days?: string;
  hours?: string;
  minutes?: string;
  seconds?: string;
};

interface CountdownProps {
  date: string;
  time?: string;
  tzOffsetHours?: number; 
  boxColor?: string;
  textColor?: string;
  fontFamily?: string;
  italic?: boolean;
  extralight?: boolean;
  labels?: Labels;
}

function parseLocalDateToUTC(
  ddmmyyyy: string,
  hhmmss: string,
  tzOffsetHours: number
): Date | null {
  // Accept "dd-mm-yyyy"
  const dateMatch = ddmmyyyy.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (!dateMatch) return null;

  const [, ddStr, mmStr, yyyyStr] = dateMatch;
  const [hhStr = "00", miStr = "00", ssStr = "00"] = hhmmss.split(":");

  const day = Number(ddStr);
  const month = Number(mmStr); // 1-12
  const year = Number(yyyyStr);
  const hour = Number(hhStr);
  const minute = Number(miStr);
  const second = Number(ssStr);

  if (
    isNaN(day) || isNaN(month) || isNaN(year) ||
    isNaN(hour) || isNaN(minute) || isNaN(second)
  ) {
    return null;
  }

  const utcMs = Date.UTC(
    year,
    month - 1,
    day,
    hour - tzOffsetHours,
    minute,
    second,
    0
  );
  return new Date(utcMs);
}

export default function Countdown({
  date,
  time = "00:00:00",
  tzOffsetHours = 7, // UTC+7 (WIB)
  boxColor = "bg-indigo-600",
  textColor = "text-gray-900",
  fontFamily = "font-sans",
  italic = false,
  extralight = false,
  labels = { days: "Hari", hours: "Jam", minutes: "Menit", seconds: "Detik" },
}: CountdownProps) {
  const target = useMemo(
    () => parseLocalDateToUTC(date, time, tzOffsetHours),
    [date, time, tzOffsetHours]
  );

  const getTimeLeft = () => {
    if (!target) return null;
    const diff = target.getTime() - Date.now();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, [date, time, tzOffsetHours]);

  if (!target) {
    return (
      <div className={`text-red-600 ${fontFamily}`}>
        Invalid date format. Use <b>dd-mm-yyyy</b> and optional time <b>HH:mm:ss</b>.
      </div>
    );
  }

  const units = [
    { key: "days", label: labels.days ?? "Hari", value: timeLeft?.days ?? 0 },
    { key: "hours", label: labels.hours ?? "Jam", value: timeLeft?.hours ?? 0 },
    { key: "minutes", label: labels.minutes ?? "Menit", value: timeLeft?.minutes ?? 0 },
    { key: "seconds", label: labels.seconds ?? "Detik", value: timeLeft?.seconds ?? 0 },
  ];

  return (
    <div className="flex items-start justify-center w-full gap-4">
      {units.map((u) => (
        <div key={u.key} className="timer w-16">
          <p
            className={`text-sm mb-2 text-center w-full ${textColor} ${fontFamily} 
            ${
              italic ? "italic" : ""
            }
            ${
              extralight ? "italic" : ""
            }`}
          >
            {u.label}
          </p>
          <div className={`${boxColor} py-4 px-2 rounded-lg overflow-hidden`}>
            <h3
              className={`text-2xl font-semibold text-white text-center $${poppins.className} font-bold`}
            >
              {u.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
