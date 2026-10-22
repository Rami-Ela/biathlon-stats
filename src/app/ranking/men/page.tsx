import { redirect } from "next/navigation";
import { DEFAULT_SEASON } from "@/types/competitions";

interface Props {
  searchParams: Promise<{ seasonId?: string }>;
}

// Kept so that old /ranking/men links keep working
export default async function MenRankingRedirect({ searchParams }: Props) {
  const seasonId = (await searchParams).seasonId ?? DEFAULT_SEASON;
  redirect(`/ranking?seasonId=${seasonId}&gender=M`);
}
