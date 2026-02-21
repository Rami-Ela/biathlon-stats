import { describe, it, expect } from "vitest";
import { getCompetitionPoints } from "./competitionPoints";

describe("getCompetitionPoints", () => {
  it("returns 90 for 1st place", () => {
    expect(getCompetitionPoints(1)).toBe(90);
  });

  it("returns 75 for 2nd place", () => {
    expect(getCompetitionPoints(2)).toBe(75);
  });

  it("returns 1 for 40th place (last scoring position)", () => {
    expect(getCompetitionPoints(40)).toBe(1);
  });

  it("returns 0 for position 41 (out of points)", () => {
    expect(getCompetitionPoints(41)).toBe(0);
  });

  it("returns 0 for position 0 (invalid)", () => {
    expect(getCompetitionPoints(0)).toBe(0);
  });

  it("returns 0 for negative positions", () => {
    expect(getCompetitionPoints(-1)).toBe(0);
  });

  it("returns decreasing points (position 10 > position 20)", () => {
    expect(getCompetitionPoints(10)).toBeGreaterThan(getCompetitionPoints(20));
  });
});
