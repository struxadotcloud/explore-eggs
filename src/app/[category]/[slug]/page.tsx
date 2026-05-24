import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { EggDetail } from "@/components/egg-detail";
import eggsData from "@/data/eggs.json";
import type { Egg, EggCategory } from "@/types/egg";

const eggs = eggsData as unknown as Egg[];
const VALID_CATEGORIES: EggCategory[] = ["applications", "games", "generic"];

export const dynamicParams = false;

export function generateStaticParams() {
  return eggs.map((e) => ({ category: e.category, slug: e.slug }));
}

export default async function EggDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  if (!VALID_CATEGORIES.includes(category as EggCategory)) {
    notFound();
  }

  const egg = eggs.find(
    (e) => e.category === category && e.slug === slug
  );

  if (!egg) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <EggDetail egg={egg} />
      </main>
      <Footer />
    </>
  );
}
