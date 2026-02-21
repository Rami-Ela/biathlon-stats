import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getNextEvent, getNextRace } from "./nextEventHighlight";
import type { Event } from "@/types/events";
import type { Competition } from "@/types/competitions";

const NOW = new Date("2025-01-15T12:00:00Z");

function makeEvent(overrides: Partial<Event>): Event {
  return {
    SeasonId: "2425",
    Trimester: null,
    EventId: "BT2425SWRLCP__",
    StartDate: "2025-01-10T00:00:00Z",
    EndDate: "2025-01-13T23:59:59Z",
    FirstCompetitionDate: "2025-01-11T10:00:00Z",
    Description: "Test Event",
    EventSeriesNr: "1",
    ShortDescription: "Test",
    Altitude: "700",
    OrganizerId: "ORG1",
    Organizer: "Organizer",
    Nat: "NOR",
    NatLong: "Norway",
    MedalSetId: null,
    EventClassificationId: "WC",
    Level: 1,
    UTCOffset: 1,
    IsActual: true,
    IsCurrent: false,
    EventStatusId: 1,
    EventStatus: "Finished",
    Notes: null,
    ...overrides,
  };
}

function makeCompetition(overrides: Partial<Competition>): Competition {
  return {
    RaceId: "BT2425SWRLCP__SMSP",
    km: "10",
    catId: "SM",
    DisciplineId: "SR",
    StatusId: 1,
    StatusText: "Scheduled",
    ScheduleStatus: "Scheduled",
    ResultStatus: "NoResults",
    HasLiveData: false,
    IsLive: false,
    StartTime: "2025-01-20T09:00:00Z",
    Description: "Test Race",
    ShortDescription: "Sprint",
    Location: "Oslo",
    ResultsCredit: null,
    TimingCredit: null,
    HasAnalysis: false,
    StartMode: "MS",
    NrShootings: 2,
    NrSpareRounds: 3,
    HasSpareRounds: true,
    PenaltySeconds: 60,
    NrLegs: 1,
    ShootingPositions: "PP",
    LocalUTCOffset: 1,
    RSC: "SMSP",
    GenderOrder: "M",
    ...overrides,
  };
}

describe("getNextEvent", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns nulls for empty array", () => {
    expect(getNextEvent([])).toEqual({ currentEvent: null, incomingEvent: null });
  });

  it("returns currentEvent when now is between start and end", () => {
    const event = makeEvent({
      StartDate: "2025-01-14T00:00:00Z",
      EndDate: "2025-01-16T23:59:59Z",
    });
    const result = getNextEvent([event]);
    expect(result.currentEvent?.EventId).toBe(event.EventId);
    expect(result.incomingEvent).toBeNull();
  });

  it("returns incomingEvent for a future event", () => {
    const event = makeEvent({
      StartDate: "2025-01-20T00:00:00Z",
      EndDate: "2025-01-23T23:59:59Z",
    });
    const result = getNextEvent([event]);
    expect(result.currentEvent).toBeNull();
    expect(result.incomingEvent?.EventId).toBe(event.EventId);
  });

  it("returns nulls when all events are in the past", () => {
    const event = makeEvent({
      StartDate: "2025-01-01T00:00:00Z",
      EndDate: "2025-01-05T23:59:59Z",
    });
    expect(getNextEvent([event])).toEqual({ currentEvent: null, incomingEvent: null });
  });

  it("prefers currentEvent over incomingEvent", () => {
    const current = makeEvent({
      EventId: "current",
      StartDate: "2025-01-14T00:00:00Z",
      EndDate: "2025-01-16T23:59:59Z",
    });
    const incoming = makeEvent({
      EventId: "incoming",
      StartDate: "2025-01-20T00:00:00Z",
      EndDate: "2025-01-23T23:59:59Z",
    });
    const result = getNextEvent([current, incoming]);
    expect(result.currentEvent?.EventId).toBe("current");
    expect(result.incomingEvent).toBeNull();
  });

  it("picks the first future event as incomingEvent", () => {
    const first = makeEvent({
      EventId: "first",
      StartDate: "2025-01-20T00:00:00Z",
      EndDate: "2025-01-23T23:59:59Z",
    });
    const second = makeEvent({
      EventId: "second",
      StartDate: "2025-01-27T00:00:00Z",
      EndDate: "2025-01-30T23:59:59Z",
    });
    const result = getNextEvent([first, second]);
    expect(result.incomingEvent?.EventId).toBe("first");
  });
});

describe("getNextRace", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns null for empty array", () => {
    expect(getNextRace([])).toBeNull();
  });

  it("returns the next future race", () => {
    const race = makeCompetition({ StartTime: "2025-01-16T09:00:00Z" });
    expect(getNextRace([race])).toEqual(race);
  });

  it("returns null when all races are in the past", () => {
    const race = makeCompetition({ StartTime: "2025-01-10T09:00:00Z" });
    expect(getNextRace([race])).toBeNull();
  });

  it("returns the first upcoming race when multiple exist", () => {
    const past = makeCompetition({ RaceId: "past", StartTime: "2025-01-10T09:00:00Z" });
    const next = makeCompetition({ RaceId: "next", StartTime: "2025-01-16T09:00:00Z" });
    const later = makeCompetition({ RaceId: "later", StartTime: "2025-01-18T09:00:00Z" });
    expect(getNextRace([past, next, later])?.RaceId).toBe("next");
  });
});
