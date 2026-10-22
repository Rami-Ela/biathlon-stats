import { Suspense } from "react";
import { RankingFilters } from "@/components/ranking/rankingFilters";
import { RankingTable } from "@/components/ranking/rankingTable";
import SeasonSelect from "@/components/season/seasonSelect";
import { DEFAULT_SEASON } from "@/types/competitions";
import {
  disciplines,
  genders,
  parseDiscipline,
  parseGender,
} from "@/utils/rankingTypes";

interface Props {
  searchParams: Promise<{ seasonId?: string; gender?: string; type?: string }>;
}

export default async function RankingPage({ searchParams }: Props) {
  const params = await searchParams;
  const seasonId = params.seasonId ?? DEFAULT_SEASON;
  const gender = parseGender(params.gender);
  const discipline = parseDiscipline(params.type);

  const disciplineTitle = disciplines.find((d) => d.id === discipline)?.title;
  const genderLabel = genders.find((g) => g.id === gender)?.label;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Classements</h1>
        <Suspense>
          <SeasonSelect className="w-[130px]" />
        </Suspense>
      </div>

      <RankingFilters
        seasonId={seasonId}
        gender={gender}
        discipline={discipline}
      />

      <section>
        <h2 className="mb-2 text-lg font-semibold">
          {disciplineTitle} - {genderLabel}
        </h2>
        <RankingTable seasonId={seasonId} type={`S${gender}${discipline}`} />
      </section>
    </div>
  );
}
