import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { href: "/applications", label: "Applications" },
  { href: "/games", label: "Games" },
  { href: "/generic", label: "Generic" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo-white.svg"
            alt="Struxa"
            width={20}
            height={20}
            className="hidden dark:block"
          />
          <Image
            src="/logo-dark.svg"
            alt="Struxa"
            width={20}
            height={20}
            className="block dark:hidden"
          />
          <span className="font-heading text-sm font-medium tracking-tight">
            Eggs Explorer
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
