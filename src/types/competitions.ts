export type DisciplineId = "RL" | "SR";

export interface Competition {
  RaceId: string;
  km: string;
  catId: string;
  DisciplineId: DisciplineId;
  StatusId: number;
  StatusText: string;
  ScheduleStatus: string;
  ResultStatus: string;
  HasLiveData: boolean;
  IsLive: boolean;
  StartTime: string; // Ou Date si tu préfères travailler avec des objets Date
  Description: string;
  ShortDescription: string;
  Location: string;
  ResultsCredit: string | null; // Si cette valeur peut être null
  TimingCredit: string | null; // Si cette valeur peut être null
  HasAnalysis: boolean;
  StartMode: string;
  NrShootings: number;
  NrSpareRounds: number;
  HasSpareRounds: boolean;
  PenaltySeconds: number;
  NrLegs: number;
  ShootingPositions: string;
  LocalUTCOffset: number;
  RSC: string;
  GenderOrder: string;
}

export interface RaceResult {
  StartOrder: number;
  ResultOrder: number;
  IRM: string | null;
  IBUId: string;
  IsTeam: boolean;
  Name: string;
  ShortName: string;
  FamilyName: string;
  GivenName: string;
  Nat: string;
  Bib: string;
  Leg: number;
  Rank: number | null;
  Shootings: number | null;
  ShootingTotal: number | null;
  RunTime: number | null; // Assuming time in seconds or similar
  TotalTime: number | null; // Assuming total time in seconds or similar
  WC: number | null;
  NC: number | null;
  NOC: number | null;
  StartTime: string | null; // ISO 8601 date string
  StartInfo: string;
  StartRow: number;
  StartLane: number;
  BibColor: string | null;
  Behind: number | null;
  StartGroup: string | null;
  TeamId: string | null;
  PursuitStartDistance: number;
  Result: number | null; // Assuming this is some numerical result
  LegRank: number | null;
  TeamRankAfterLeg: number | null;
  StartConfirmed: boolean | null;
  ParaSportClass: string | null;
  ParaPercentage: number | null;
  ParaDeltaTime: number | null;
  ParaGuideName: string | null;
  ParaRealTime: number | null;
}

export interface SportEvent {
  SeasonId: string;
  Trimester: string | null;
  EventId: string;
  StartDate: string; // ISO 8601 date string
  EndDate: string; // ISO 8601 date string
  FirstCompetitionDate: string | null;
  Description: string;
  EventSeriesNr: string | null;
  ShortDescription: string;
  Altitude: number | null;
  OrganizerId: string;
  Organizer: string;
  Nat: string;
  NatLong: string | null;
  MedalSetId: string;
  EventClassificationId: string;
  Level: number;
  UTCOffset: number;
  IsActual: boolean;
  IsCurrent: boolean | null;
  EventStatusId: number;
  EventStatus: string | null;
  Notes: string | null;
}

export interface RaceDetail {
  RaceId: string;
  IsStartList: boolean;
  IsResult: boolean;
  Competition: Competition;
  SportEvt: SportEvent;
  Results: RaceResult[];
}

export interface SkiResult {
  StartOrder: number;
  ResultOrder: number;
  IRM: string | null;
  IBUId: string;
  IsTeam: boolean;
  Name: string;
  ShortName: string;
  FamilyName: string;
  GivenName: string;
  Nat: string;
  Bib: string;
  Leg: string | null;
  Rank: string;
  Shootings: string;
  ShootingTotal: string;
  RunTime: string | null;
  TotalTime: string;
  WC: string | null;
  NC: string | null;
  NOC: string | null;
  StartTime: string | null;
  StartInfo: string;
  StartRow: number;
  StartLane: number;
  BibColor: string | null;
  Behind: string;
  StartGroup: string | null;
  TeamId: string | null;
  PursuitStartDistance: number;
  Result: string;
  LegRank: string | null;
  TeamRankAfterLeg: string | null;
  StartConfirmed: string | null;
  ParaSportClass: string | null;
  ParaPercentage: string | null;
  ParaDeltaTime: string | null;
  ParaGuideName: string | null;
  ParaRealTime: string | null;
}

export interface RaceSkiResultDetail {
  RaceId: string;
  IsStartList: boolean;
  IsResult: boolean;
  Competition: Competition;
  SportEvt: SportEvent;
  Results: SkiResult[];
}

export interface ShootingResult {
  StartOrder: number;
  ResultOrder: number;
  IRM: string | null;
  IBUId: string;
  IsTeam: boolean;
  Name: string;
  ShortName: string;
  FamilyName: string;
  GivenName: string;
  Nat: string;
  Bib: string;
  Leg: number | null;
  Rank: string;
  Shootings: string;
  ShootingTotal: string;
  RunTime: string | null;
  TotalTime: string;
  WC: string | null;
  NC: string | null;
  NOC: string | null;
  StartTime: string | null;
  StartInfo: string | null;
  StartRow: number;
  StartLane: number;
  BibColor: string | null;
  Behind: string;
  StartGroup: string | null;
  TeamId: string | null;
  PursuitStartDistance: number;
  Result: string | null;
  LegRank: string | null;
  TeamRankAfterLeg: string | null;
  StartConfirmed: string | null;
  ParaSportClass: string | null;
  ParaPercentage: string | null;
  ParaDeltaTime: string | null;
  ParaGuideName: string | null;
  ParaRealTime: string | null;
}

export interface RaceShootingResultDetail {
  RaceId: string;
  IsStartList: boolean;
  IsResult: boolean;
  Competition: Competition;
  SportEvt: SportEvent;
  Results: ShootingResult[];
}

export const SeasonIds = {
  "5758": "5758",
  "5859": "5859",
  "5960": "5960",
  "6061": "6061",
  "6162": "6162",
  "6263": "6263",
  "6364": "6364",
  "6465": "6465",
  "6566": "6566",
  "6667": "6667",
  "6768": "6768",
  "6869": "6869",
  "6970": "6970",
  "7071": "7071",
  "7172": "7172",
  "7273": "7273",
  "7374": "7374",
  "7475": "7475",
  "7576": "7576",
  "7677": "7677",
  "7778": "7778",
  "7879": "7879",
  "7980": "7980",
  "8081": "8081",
  "8182": "8182",
  "8283": "8283",
  "8384": "8384",
  "8485": "8485",
  "8586": "8586",
  "8687": "8687",
  "8788": "8788",
  "8889": "8889",
  "8990": "8990",
  "9091": "9091",
  "9192": "9192",
  "9293": "9293",
  "9394": "9394",
  "9495": "9495",
  "9596": "9596",
  "9697": "9697",
  "9798": "9798",
  "9899": "9899",
  "9900": "9900",
  "0001": "0001",
  "0102": "0102",
  "0203": "0203",
  "0304": "0304",
  "0405": "0405",
  "0506": "0506",
  "0607": "0607",
  "0708": "0708",
  "0809": "0809",
  "0910": "0910",
  "1011": "1011",
  "1112": "1112",
  "1213": "1213",
  "1314": "1314",
  "1415": "1415",
  "1516": "1516",
  "1617": "1617",
  "1718": "1718",
  "1819": "1819",
  "1920": "1920",
  "2021": "2021",
  "2122": "2122",
  "2223": "2223",
  "2324": "2324",
  "2425": "2425",
  "2526": "2526",
} as const;

function getStartYear(id: string) {
  const start = parseInt(id.slice(0, 2), 10);
  return start < 50 ? 2000 + start : 1900 + start;
}

export const sortedSeasons = Object.values(SeasonIds).sort(
  (a, b) => getStartYear(b) - getStartYear(a)
);

export const DEFAULT_SEASON = SeasonIds[2526];
