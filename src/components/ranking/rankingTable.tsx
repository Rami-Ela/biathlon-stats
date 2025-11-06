import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { getFlagCountry } from "@/utils/flags";
import { CupRanking } from "@/types/rankings";
import { SeasonIds } from "@/types/competitions";

interface RaceResultTableProps {
  type:
    | "SWTS"
    | "SWSP"
    | "SWPU"
    | "SWIN"
    | "SWMS"
    | "SWRL"
    | "SWNC"
    | "SMTS"
    | "SMSP"
    | "SMPU"
    | "SMIN"
    | "SMMS"
    | "SMRL"
    | "SMNC";
  seasonId: string;
}

export async function RankingTable({ type, seasonId }: RaceResultTableProps) {
  const res = await fetch(
    `https://www.biathlonresults.com/modules/sportapi/api/CupResults?CupId=BT${seasonId}SWRLCP__${type}`,
    { cache: "no-store" }
  );
  const ranking: CupRanking = await res.json();

  return (
    <Table>
      <TableCaption>Classement</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead> </TableHead>
          <TableHead> Athlète </TableHead>
          <TableHead> Nombre de points </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ranking.Rows.map((rank, index) => {
          const diff = index > 0 ? +rank.Score - +ranking.Rows[0].Score : "";

          return (
            <TableRow key={rank.IBUId}>
              <TableCell>{`${rank.Rank}`}</TableCell>
              <TableCell>
                {getFlagCountry(rank.Nat)}
                <span> {rank.Name} </span>
              </TableCell>
              <TableCell>
                {rank.Score}{" "}
                <span className="text-red-500 text-xs">
                  {diff ? `(${diff})` : ""}
                </span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
