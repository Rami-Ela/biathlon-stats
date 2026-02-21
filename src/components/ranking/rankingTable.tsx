import Link from "next/link";
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
  limit?: number;
}

export async function RankingTable({
  type,
  seasonId,
  limit,
}: RaceResultTableProps) {
  const res = await fetch(
    `https://www.biathlonresults.com/modules/sportapi/api/CupResults?CupId=BT${seasonId}SWRLCP__${type}`,
    { cache: "no-store" }
  );
  const ranking: CupRanking = await res.json();
  const rankingRows = limit ? ranking.Rows.slice(0, limit) : ranking.Rows;

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
        {rankingRows.map((rank, index) => {
          const diff = index > 0 ? +rank.Score - +ranking.Rows[0].Score : "";

          return (
            <TableRow key={rank.IBUId}>
              <TableCell>{`${rank.Rank}`}</TableCell>
              <TableCell>
                {getFlagCountry(rank.Nat)}
                <Link href={`/athletes/${rank.IBUId}?name=${encodeURIComponent(rank.Name)}&nat=${rank.Nat}`} className="hover:underline">
                  {rank.Name}
                </Link>
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
