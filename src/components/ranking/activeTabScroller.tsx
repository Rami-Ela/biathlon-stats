"use client";

import { ReactNode, useEffect, useRef } from "react";

// On mobile the tab bar overflows: keep the selected tab visible on load
export function ActiveTabScroller({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    ref.current
      ?.querySelector('[aria-current="page"]')
      ?.scrollIntoView({ inline: "center", block: "nearest" });
  });

  return (
    <nav ref={ref} className={className}>
      {children}
    </nav>
  );
}
