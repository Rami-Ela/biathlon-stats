"use client";

import { useSearchParams } from "next/navigation";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { NavigationMenuLink } from "../ui/navigation-menu";
import { NavigationMenuLinkProps } from "@radix-ui/react-navigation-menu";
import { DEFAULT_SEASON } from "@/types/competitions";

type Props = LinkProps & { children: ReactNode; seasonId: string | null };

export function LinkWithSeason({ href, seasonId, children, ...props }: Props) {
  const finalHref = `${href}?seasonId=${seasonId ?? DEFAULT_SEASON}`;

  return (
    <Link {...props} href={finalHref}>
      {children}
    </Link>
  );
}

type NavigationMenuLinkWithSeasonProps = NavigationMenuLinkProps & {
  children: ReactNode;
  seasonId: string;
};

export function NavigationMenuLinkWithSeason({
  href,
  children,
  seasonId,
  ...props
}: NavigationMenuLinkWithSeasonProps) {
  const finalHref = `${href}?seasonId=${seasonId ?? DEFAULT_SEASON}`;

  return (
    <NavigationMenuLink asChild {...props}>
      <Link href={finalHref ?? ""}> {children} </Link>
    </NavigationMenuLink>
  );
}
