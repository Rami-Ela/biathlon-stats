import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { NavigationMenuList } from "@radix-ui/react-navigation-menu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex-col">
          <nav className="w-full bg-cyan-600 text-white shadow-md z-50">
            <div className="max-w-4xl p-4 flex items-center">
              <NavigationMenu>
                <NavigationMenuList className="flex gap-4">
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/events"
                      className="p-2 hover:bg-cyan-500 rounded-md transition"
                    >
                      Événements
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/ranking"
                      className="p-2 hover:bg-cyan-500 rounded-md transition"
                    >
                      Classement
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </nav>
          <div>
            <Link href="/">
              <Image
                className="absolute top-0 right-0"
                src="/biathlon_logo.svg"
                alt="Vercel logomark"
                width={60}
                height={60}
              />
            </Link>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
