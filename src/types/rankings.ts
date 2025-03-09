interface Bib {
  Code: string;
  Color: string;
  Description: string;
}

interface Row {
  Rank: string;
  Bibs: Bib[] | null;
  ResultOrder: number;
  IBUId: string;
  Name: string;
  ShortName: string;
  FamilyName: string;
  GivenName: string;
  Nat: string;
  Score: string;
  Scrachable: unknown;
  Diff: unknown;
  RnkDiff: number | null;
  Groups: unknown;
  ParaSportClass: unknown;
}

export interface CupRanking {
  CupId: string;
  CupName: string;
  CupShortName: string;
  CupInfo: string;
  AsOf: string;
  RaceCount: number;
  TotalRaces: number;
  MaxPossiblePoints: number;
  Notes: unknown;
  Rows: Row[];
}
