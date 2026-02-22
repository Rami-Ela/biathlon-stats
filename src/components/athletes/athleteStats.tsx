import { CISBio } from "@/types/athletes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AthleteStatsProps {
  bio: CISBio;
}

export function AthleteStats({ bio }: AthleteStatsProps) {
  const {
    StatSeasons,
    StatShooting,
    StatShootingProne,
    StatShootingStanding,
    StatSkiing,
  } = bio;

  if (!StatSeasons || StatSeasons.length === 0) return null;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Stats par saison</CardTitle>
      </CardHeader>
      <CardContent className="px-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Saison</TableHead>
              <TableHead className="text-right">Tir %</TableHead>
              <TableHead className="text-right">Couché %</TableHead>
              <TableHead className="text-right">Debout %</TableHead>
              <TableHead className="text-right">Ski</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {StatSeasons.map((season, i) => (
              <TableRow key={season}>
                <TableCell className="font-medium">{season}</TableCell>
                <TableCell className="text-right">
                  {StatShooting?.[i] ?? "—"}
                </TableCell>
                <TableCell className="text-right">
                  {StatShootingProne?.[i] ?? "—"}
                </TableCell>
                <TableCell className="text-right">
                  {StatShootingStanding?.[i] ?? "—"}
                </TableCell>
                <TableCell className="text-right">
                  {StatSkiing?.[i] ?? "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
