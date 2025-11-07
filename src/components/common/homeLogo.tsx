"use client";

import { DEFAULT_SEASON } from "@/types/competitions";
import { useSearchParams } from "next/navigation";
import { LinkWithSeason } from "../season/linkWithSeason";
import Image from "next/image";

export const HomeLogo = () => {
  const searchParams = useSearchParams();
  const seasonId = searchParams.get("seasonId") ?? DEFAULT_SEASON;

  return (
    <LinkWithSeason href="/" seasonId={seasonId}>
      <Image
        className="absolute top-0 right-0"
        src="/biathlon_logo.svg"
        alt="Vercel logomark"
        width={60}
        height={60}
      />
    </LinkWithSeason>
  );
};
