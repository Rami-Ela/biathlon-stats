import { describe, it, expect } from "vitest";
import { formatFullDisplayDate, formatFullDisplayDateWithHour } from "./index";

describe("formatFullDisplayDate", () => {
  it("formats a date string in French", () => {
    // mercredi 15 janvier 2025
    expect(formatFullDisplayDate("2025-01-15")).toBe("mercredi 15 janvier 2025");
  });

  it("formats a Date object", () => {
    expect(formatFullDisplayDate(new Date("2025-03-01"))).toBe("samedi 1 mars 2025");
  });
});

describe("formatFullDisplayDateWithHour", () => {
  it("formats a UTC timestamp into Paris time (CET UTC+1)", () => {
    // 09:00 UTC = 10:00 CET (UTC+1, January = winter time)
    expect(formatFullDisplayDateWithHour("2025-01-15T09:00:00Z")).toBe(
      "mercredi 15 janvier 2025 10:00"
    );
  });

  it("converts to CEST (UTC+2) in summer", () => {
    // 08:00 UTC = 10:00 CEST (UTC+2, July = summer time)
    expect(formatFullDisplayDateWithHour("2025-07-10T08:00:00Z")).toBe(
      "jeudi 10 juillet 2025 10:00"
    );
  });
});
