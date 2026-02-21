export interface Athlete {
  IBUId: string;
  FamilyName: string;
  GivenName: string;
  NAT: string;
  Birthdate: string;
  Age: number;
  GenderId: number;
  ShortName?: string;
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

export interface CISBioInfoItem {
  Id: string | null;
  Description: string;
  Value: string;
}

export interface CISBioBib {
  Code: string;
  Color: string;
  Description: string;
}

export interface CISBioBadge {
  Code: string;
  Description: string;
  Value: string;
}

export interface CISBio {
  IBUId: string;
  FullName: string;
  FamilyName: string;
  GivenName: string;
  NAT: string;
  Birthdate: string;
  Age: number;
  GenderId: string;
  PhotoURI: string | null;
  Bibs: CISBioBib[];
  Personal: CISBioInfoItem[];
  Sport: CISBioInfoItem[];
  Stats: CISBioInfoItem[];
  Badges: CISBioBadge[];
  StatSeasons: string[] | null;
  StatShooting: string[] | null;
  StatShootingProne: string[] | null;
  StatShootingStanding: string[] | null;
  StatSkiing: string[] | null;
}
