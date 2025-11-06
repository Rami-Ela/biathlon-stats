"use client";

import { useSearchParams } from "next/navigation";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { NavigationMenuLink } from "../ui/navigation-menu";
import { NavigationMenuLinkProps } from "@radix-ui/react-navigation-menu";
import { DEFAULT_SEASON } from "@/types/competitions";

type Props = LinkProps & { children: ReactNode };

export function LinkWithSeason({ href, children, ...props }: Props) {
  const searchParams = useSearchParams();
  const seasonId = searchParams.get("seasonId") ?? DEFAULT_SEASON;

  let finalHref = href;

  if (seasonId) {
    finalHref = `${href}?seasonId=${seasonId}`;
  }

  return (
    <Link {...props} href={finalHref}>
      {children}
    </Link>
  );
}

type NavigationMenuLinkWithSeasonProps = NavigationMenuLinkProps & {
  children: ReactNode;
};

export function NavigationMenuLinkWithSeason({
  href,
  children,
  ...props
}: NavigationMenuLinkWithSeasonProps) {
  const searchParams = useSearchParams();
  const seasonId = searchParams.get("seasonId") ?? DEFAULT_SEASON;

  let finalHref = href;

  if (seasonId) {
    finalHref = `${href}?seasonId=${seasonId}`;
  }

  return (
    <NavigationMenuLink asChild {...props}>
      <Link href={finalHref ?? ""}> {children} </Link>
    </NavigationMenuLink>
  );
}
