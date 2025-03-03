export interface Event {
  SeasonId: string;
  Trimester: string | null;
  EventId: string;
  StartDate: string; // ISO date string
  EndDate: string; // ISO date string
  FirstCompetitionDate: string; // ISO date string
  Description: string;
  EventSeriesNr: string;
  ShortDescription: string;
  Altitude: string;
  OrganizerId: string;
  Organizer: string;
  Nat: string;
  NatLong: string;
  MedalSetId: string | null;
  EventClassificationId: string;
  Level: number;
  UTCOffset: number;
  IsActual: boolean;
  IsCurrent: boolean;
  EventStatusId: number;
  EventStatus: string;
  Notes: string | null;
}
