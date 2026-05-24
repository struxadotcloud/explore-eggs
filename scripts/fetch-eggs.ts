#!/usr/bin/env bun

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const ROOT = join(new URL("..", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1"));

interface Config {
  sources: Array<{
    repo: string;
    branch: string;
    category: "applications" | "games" | "generic";
  }>;
}

interface GHContent {
  type: "file" | "dir";
  name: string;
  path: string;
  download_url: string | null;
  url: string;
}

interface RawEgg {
  meta?: { name?: string; version?: number };
  name?: string;
  author?: string;
  description?: string;
  features?: string[];
  docker_images?: Record<string, string>;
  startup?: string;
  scripts?: Record<
    string,
    { value?: string; container?: string; entrypoint?: string }
  >;
  variables?: Array<{
    name?: string;
    description?: string;
    env_variable?: string;
    default_value?: string;
    user_viewable?: boolean;
    user_editable?: boolean;
    rules?: string;
  }>;
}

import type { Egg, EggCategory, EggVariable } from "../src/types/egg";

const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "for", "with", "of", "in", "on", "to",
  "is", "it", "be", "as", "at", "by", "we", "he", "she", "they", "you",
  "this", "that", "are", "was", "were", "has", "have", "had", "not", "but",
  "from", "all", "can", "will", "your", "our", "its", "any", "may",
]);

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const reqHeaders: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
};

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: reqHeaders });
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status} ${res.statusText} — ${url}`);
  }
  return res.json() as Promise<T>;
}

async function listDir(repo: string, path: string, branch: string): Promise<GHContent[]> {
  const encoded = path ? encodeURIComponent(path).replace(/%2F/g, "/") : "";
  const url = `https://api.github.com/repos/${repo}/contents/${encoded}?ref=${branch}`;
  return fetchJSON<GHContent[]>(url);
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function deriveTags(name: string, description: string): string[] {
  const words = `${name} ${description}`.toLowerCase().match(/\b[a-z]{3,}\b/g) ?? [];
  return [...new Set(words.filter((w) => !STOP_WORDS.has(w)))].slice(0, 12);
}

function mapEgg(raw: RawEgg, category: EggCategory, repo: string, path: string): Egg | null {
  const name = raw.meta?.name ?? raw.name ?? "";
  if (!name.trim()) return null;

  const variables: EggVariable[] = (raw.variables ?? []).map((v) => ({
    name: v.name ?? "",
    description: v.description ?? "",
    envVariable: v.env_variable ?? "",
    defaultValue: v.default_value ?? "",
    userViewable: v.user_viewable ?? true,
    userEditable: v.user_editable ?? true,
    rules: v.rules ?? "",
  }));

  const scripts: Record<string, { value: string; container: string; entrypoint: string }> = {};
  for (const [key, script] of Object.entries(raw.scripts ?? {})) {
    if (script.value) {
      scripts[key] = {
        value: script.value,
        container: script.container ?? "",
        entrypoint: script.entrypoint ?? "",
      };
    }
  }

  return {
    slug: slugify(name),
    name: name.trim(),
    author: raw.author ?? "",
    description: raw.description ?? "",
    category,
    tags: deriveTags(name, raw.description ?? ""),
    sourceRepo: repo,
    sourcePath: path,
    dockerImages: raw.docker_images ?? {},
    startup: raw.startup ?? "",
    variables,
    features: raw.features ?? [],
    scripts: Object.keys(scripts).length > 0 ? scripts : undefined,
    updatedAt: new Date().toISOString(),
  };
}

async function walkDir(
  repo: string,
  branch: string,
  dirPath: string,
  category: EggCategory,
  depth = 0
): Promise<Egg[]> {
  if (depth > 4) return [];

  let items: GHContent[];
  try {
    items = await listDir(repo, dirPath, branch);
  } catch (err) {
    console.warn(`  Skipping ${dirPath || "/"}: ${err}`);
    return [];
  }

  const eggs: Egg[] = [];

  // Process files and dirs in parallel batches of 5 to stay under rate limits
  const jsonFiles = items.filter((i) => i.type === "file" && i.name.endsWith(".json"));
  const subDirs = items.filter((i) => i.type === "dir");

  for (let i = 0; i < jsonFiles.length; i += 5) {
    const batch = jsonFiles.slice(i, i + 5);
    const results = await Promise.allSettled(
      batch.map(async (file) => {
        if (!file.download_url) return null;
        await sleep(50 * (i % 5));
        const raw = await fetchJSON<RawEgg>(file.download_url);
        return mapEgg(raw, category, repo, file.path);
      })
    );
    for (const result of results) {
      if (result.status === "fulfilled" && result.value) eggs.push(result.value);
      else if (result.status === "rejected") console.warn(`  File error: ${result.reason}`);
    }
    if (i + 5 < jsonFiles.length) await sleep(100);
  }

  for (const dir of subDirs) {
    await sleep(80);
    const sub = await walkDir(repo, branch, dir.path, category, depth + 1);
    eggs.push(...sub);
  }

  return eggs;
}

async function main() {
  const config: Config = JSON.parse(readFileSync(join(ROOT, "eggs.config.json"), "utf8"));

  const allEggs: Egg[] = [];
  const slugsSeen = new Set<string>();

  for (const source of config.sources) {
    console.log(`\n[${source.category}] ${source.repo} @ ${source.branch}`);
    const eggs = await walkDir(source.repo, source.branch, "", source.category);

    let added = 0;
    for (const egg of eggs) {
      const key = `${egg.category}/${egg.slug}`;
      if (slugsSeen.has(key)) {
        egg.slug = `${egg.slug}-${source.repo.split("/")[0].slice(0, 5)}`;
      }
      slugsSeen.add(`${egg.category}/${egg.slug}`);
      allEggs.push(egg);
      added++;
    }
    console.log(`  → ${added} eggs`);
  }

  const outputPath = join(ROOT, "src", "data", "eggs.json");
  writeFileSync(outputPath, JSON.stringify(allEggs, null, 2));
  console.log(`\nTotal: ${allEggs.length} eggs written to src/data/eggs.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
