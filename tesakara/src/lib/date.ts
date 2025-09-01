export type Extracted = {
  day: string;
  month: string;
  date: number;
  year: string;
};

export function extractFromDmy(
  dmy: string,
  locale: string = "id-ID",
  timeZone: string = "Asia/Jakarta"
): Extracted {
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec(dmy);
  if (!m) throw new Error('Invalid format. Expected "dd-mm-yyyy".');

  const [, ddStr, mmStr, yyyyStr] = m;
  const dd = Number(ddStr);
  const mm = Number(mmStr);
  const yyyy = Number(yyyyStr);

  const asUtc = new Date(Date.UTC(yyyy, mm - 1, dd));

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
    .formatToParts(asUtc)
    .reduce<Record<string, string>>((acc, p) => {
      if (p.type === "day" || p.type === "month" || p.type === "year") acc[p.type] = p.value;
      return acc;
    }, {});

  if (parts.day !== ddStr || parts.month !== mmStr || parts.year !== yyyyStr) {
    throw new Error("Invalid calendar date.");
  }

  const dayRaw = new Intl.DateTimeFormat(locale, { weekday: "long", timeZone }).format(asUtc);
  const month = new Intl.DateTimeFormat(locale, { month: "long", timeZone }).format(asUtc);

  const day = dayRaw === "Minggu" ? "Ahad" : dayRaw;

  return { day, month, date: dd, year: yyyyStr };
}
