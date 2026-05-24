import Link from "next/link";
import { Layers, Gamepad2, Package } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import eggsData from "@/data/eggs.json";
import type { Egg, EggCategory } from "@/types/egg";

const eggs = eggsData as unknown as Egg[];

const CATEGORIES: {
  key: EggCategory;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    key: "applications",
    label: "Applications",
    description:
      "Web servers, databases, programming language runtimes, and more.",
    icon: Layers,
  },
  {
    key: "games",
    label: "Games",
    description: "Game server eggs for popular titles.",
    icon: Gamepad2,
  },
  {
    key: "generic",
    label: "Generic",
    description: "Utility, scripting, and miscellaneous server eggs.",
    icon: Package,
  },
];

export default function HomePage() {
  const counts = {
    total: eggs.length,
    applications: eggs.filter((e) => e.category === "applications").length,
    games: eggs.filter((e) => e.category === "games").length,
    generic: eggs.filter((e) => e.category === "generic").length,
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-card/30 px-4 py-20 text-center sm:px-6">
          <div className="mx-auto max-w-2xl">
            <h1 className="font-heading text-4xl font-medium tracking-tight sm:text-5xl">
              Eggs Explorer
            </h1>
            <p className="mt-4 text-muted-foreground text-base leading-relaxed">
              {counts.total > 0
                ? `Browse ${counts.total} egg definitions across ${CATEGORIES.length} categories.`
                : "Browse Pterodactyl & Pelican egg definitions across applications, games, and utilities."}
            </p>
          </div>
        </section>

        {/* Category cards */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const count = counts[cat.key];
              return (
                <Link key={cat.key} href={`/${cat.key}/`} className="group block">
                  <Card className="h-full transition-colors group-hover:border-border/60 group-hover:bg-card/80 cursor-pointer">
                    <CardHeader>
                      <CardTitle className="font-heading flex items-center gap-2">
                        <Icon className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                        {cat.label}
                        {count > 0 && (
                          <span className="ml-auto font-mono text-xs text-muted-foreground">
                            {count}
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription>{cat.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
