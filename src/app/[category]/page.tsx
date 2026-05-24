import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SearchBar } from "@/components/search-bar";
import eggsData from "@/data/eggs.json";
import type { Egg, EggCategory } from "@/types/egg";

const eggs = eggsData as unknown as Egg[];
const VALID_CATEGORIES: EggCategory[] = ["applications", "games", "generic"];

const CATEGORY_LABELS: Record<EggCategory, string> = {
  applications: "Applications",
  games: "Games",
  generic: "Generic",
};

const CATEGORY_DESCRIPTIONS: Record<EggCategory, string> = {
  applications:
    "Web servers, databases, programming language runtimes, and other application servers.",
  games: "Game server eggs for popular titles across all genres.",
  generic:
    "Utility, scripting, and miscellaneous server eggs that don't fit elsewhere.",
};

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const label = CATEGORY_LABELS[category as EggCategory] ?? category;
  const description = CATEGORY_DESCRIPTIONS[category as EggCategory];
  return {
    title: label,
    description,
    openGraph: { title: label, description },
  };
}

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!VALID_CATEGORIES.includes(category as EggCategory)) {
    notFound();
  }

  const cat = category as EggCategory;
  const categoryEggs = eggs.filter((e) => e.category === cat);

  return (
    <>
      <Header />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8 border-b border-border pb-6">
          <h1 className="font-heading text-3xl font-medium">
            {CATEGORY_LABELS[cat]}
          </h1>
          <p className="mt-1.5 text-muted-foreground text-sm">
            {CATEGORY_DESCRIPTIONS[cat]}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {categoryEggs.length} egg{categoryEggs.length !== 1 ? "s" : ""}{" "}
            available
          </p>
        </div>
        <SearchBar eggs={categoryEggs} />
      </main>
      <Footer />
    </>
  );
}
