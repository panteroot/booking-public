import { DateTime } from "luxon";


export function getLocalCurrentDate() {
  const now = DateTime.now();
  return now.toFormat("yyyy-MM-dd");
}

export function getLocalDatePlusOneDay() {
  const now = DateTime.now();
  const futureDate = now.plus({ days: 1 });
  return futureDate.toFormat("yyyy-MM-dd");
}
