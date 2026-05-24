export type EggCategory = "applications" | "games" | "generic";

export interface EggVariable {
  name: string;
  description: string;
  envVariable: string;
  defaultValue: string;
  userViewable: boolean;
  userEditable: boolean;
  rules: string;
}

export interface EggScript {
  value: string;
  container: string;
  entrypoint: string;
}

export interface Egg {
  slug: string;
  name: string;
  author: string;
  description: string;
  category: EggCategory;
  tags: string[];
  sourceRepo: string;
  sourcePath: string;
  dockerImages: Record<string, string>;
  startup: string;
  variables: EggVariable[];
  features: string[];
  scripts?: Record<string, EggScript>;
  updatedAt: string;
}
