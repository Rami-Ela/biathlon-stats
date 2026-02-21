export interface Athlete {
  IBUId: string;
  Name: string;
  FamilyName: string;
  GivenName: string;
  NAT: string;
  Birthdate: string;
  Age: number;
  GenderId: number;
}

export interface AthleteDisciplineRanking {
  type: string;
  cupName: string;
  row: {
    Rank: string;
    Score: string;
    IBUId: string;
    Nat: string;
    RnkDiff: number | null;
  };
}

export type AthleteSeasonRankings = AthleteDisciplineRanking[];
