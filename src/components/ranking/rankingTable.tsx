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
}

export async function RankingTable({ type }: RaceResultTableProps) {
  const res = await fetch(
    `https://www.biathlonresults.com/modules/sportapi/api/CupResults?RT=385698&CupId=BT2425SWRLCP__${type}`
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
        {ranking.Rows.map((rank) => {
          return (
            <TableRow key={rank.IBUId}>
              <TableCell>{`${rank.Rank}`}</TableCell>
              <TableCell>
                {getFlagCountry(rank.Nat)}
                <span> {rank.Name} </span>
              </TableCell>
              <TableCell>{rank.Score}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
