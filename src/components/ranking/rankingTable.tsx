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
import { RankingType } from "@/utils/rankingTypes";
import { fetchJson } from "@/lib/api/fetchJson";
import { DataUnavailable } from "../common/dataUnavailable";

interface RaceResultTableProps {
  type: RankingType;
  seasonId: string;
  limit?: number;
}

export async function RankingTable({
  type,
  seasonId,
  limit,
}: RaceResultTableProps) {
  const ranking = await fetchJson<CupRanking>(
    `https://www.biathlonresults.com/modules/sportapi/api/CupResults?CupId=BT${seasonId}SWRLCP__${type}`,
    { cache: "no-store" },
  );
  if (!ranking?.Rows) return <DataUnavailable />;

  const rankingRows = limit ? ranking.Rows.slice(0, limit) : ranking.Rows;

  if (rankingRows.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Aucune course disputée pour le moment.
      </p>
    );
  }

  return (
    <Table>
      <TableCaption>Classement</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead> </TableHead>
          <TableHead> Athlète </TableHead>
          <TableHead className="text-right"> Points </TableHead>
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
                <Link
                  href={`/athletes/${rank.IBUId}?name=${encodeURIComponent(rank.Name)}&nat=${rank.Nat}`}
                  className="hover:underline"
                >
                  {rank.Name}
                </Link>
              </TableCell>
              <TableCell className="text-right whitespace-nowrap">
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
