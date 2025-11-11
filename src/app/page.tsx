import { NextEventHighlight } from "@/components/events/nextEventHighlight";
import { RankingTable } from "@/components/ranking/rankingTable";
import { DEFAULT_SEASON } from "@/types/competitions";

export default async function Home() {
  const seasonId = DEFAULT_SEASON;

  return (
    <div className="m-5 grid grid-cols-1 md:grid-cols-3">
      <div className="p-5">
        <NextEventHighlight seasonId={seasonId}></NextEventHighlight>
      </div>
      <div className="p-5">
        <h2 className="text-2xl font-bold">Top 10 hommes</h2>
        <RankingTable seasonId={seasonId} type="SMTS" limit={10}></RankingTable>
      </div>
      <div className="p-5">
        <h2 className="text-2xl font-bold">Top 10 femmes</h2>
        <RankingTable seasonId={seasonId} type="SWTS" limit={10}></RankingTable>
      </div>
    </div>
  );
}
