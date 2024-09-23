import { DateTime } from "luxon";

export function parseAndConvertToUTC(dateString: string): string {
  const localDateTime = DateTime.fromFormat(dateString, "yyyy-MM-dd", {
    zone: "local",
  });

  if (!localDateTime.isValid) {
    throw new Error("Invalid date string provided.");
  }

  const utcDateTime = localDateTime.toUTC();
  const formattedDate = utcDateTime.toFormat("yyyy-MM-dd");

  return formattedDate;
}
