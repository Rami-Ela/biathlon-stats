import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { fr } from "date-fns/locale";

export function formatFullDisplayDate(date: Date | string) {
  return format(date, "EEEE d MMMM yyyy", {
    locale: fr,
  });
}

export function formatFullDisplayDateWithHour(date: Date | string) {
  return formatInTimeZone(date, "Europe/Paris", "EEEE d MMMM yyyy HH:mm", {
    locale: fr,
  });
}
