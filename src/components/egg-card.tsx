import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { CategoryBadge } from "@/components/category-badge";
import type { Egg } from "@/types/egg";

export function EggCard({ egg }: { egg: Egg }) {
  const dockerCount = Object.keys(egg.dockerImages).length;

  return (
    <Link href={`/${egg.category}/${egg.slug}/`} className="group block h-full">
      <Card className="h-full gap-0 transition-colors group-hover:border-border/60 group-hover:bg-card/80 cursor-pointer">
        <CardHeader className="flex-1 border-b border-border">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="font-heading line-clamp-1 group-hover:text-primary transition-colors">
              {egg.name}
            </CardTitle>
            <CategoryBadge category={egg.category} />
          </div>
          <CardDescription className="line-clamp-2 mt-1">
            {egg.description || "No description provided."}
          </CardDescription>
        </CardHeader>
        <CardFooter className="text-xs text-muted-foreground justify-between">
          <span className="truncate max-w-[60%]">{egg.author}</span>
          <span>{dockerCount} image{dockerCount !== 1 ? "s" : ""}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
