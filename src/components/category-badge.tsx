import { Badge } from "@/components/ui/badge";
import type { EggCategory } from "@/types/egg";

const LABELS: Record<EggCategory, string> = {
  applications: "Application",
  games: "Game",
  generic: "Generic",
};

export function CategoryBadge({ category }: { category: EggCategory }) {
  return <Badge variant={category}>{LABELS[category]}</Badge>;
}
