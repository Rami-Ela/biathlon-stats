export const genders = [
  { id: "W", label: "Femmes" },
  { id: "M", label: "Hommes" },
] as const;

export const disciplines = [
  { id: "TS", label: "Général", title: "Classement général" },
  { id: "SP", label: "Sprint", title: "Classement sprint" },
  { id: "PU", label: "Poursuite", title: "Classement poursuite" },
  { id: "IN", label: "Individuel", title: "Classement individuel" },
  { id: "MS", label: "Mass Start", title: "Classement mass start" },
  { id: "RL", label: "Relais", title: "Classement relais" },
  { id: "NC", label: "Nations", title: "Classement des nations" },
] as const;

export type Gender = (typeof genders)[number]["id"];
export type DisciplineCode = (typeof disciplines)[number]["id"];
export type RankingType = `S${Gender}${DisciplineCode}`;

export const DEFAULT_GENDER: Gender = "W";
export const DEFAULT_DISCIPLINE: DisciplineCode = "TS";

export function parseGender(value: string | undefined): Gender {
  return genders.find((g) => g.id === value)?.id ?? DEFAULT_GENDER;
}

export function parseDiscipline(value: string | undefined): DisciplineCode {
  return disciplines.find((d) => d.id === value)?.id ?? DEFAULT_DISCIPLINE;
}
