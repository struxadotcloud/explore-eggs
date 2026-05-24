import Link from "next/link";
import { ChevronRight, Package, ExternalLink } from "lucide-react";
import { CategoryBadge } from "@/components/category-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Egg } from "@/types/egg";

export function EggDetail({ egg }: { egg: Egg }) {
  const dockerEntries = Object.entries(egg.dockerImages);
  const scriptEntries = Object.entries(egg.scripts ?? {});

  return (
    <div className="flex flex-col gap-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="size-3" />
        <Link
          href={`/${egg.category}/`}
          className="capitalize hover:text-foreground transition-colors"
        >
          {egg.category}
        </Link>
        <ChevronRight className="size-3" />
        <span className="text-foreground">{egg.name}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-heading text-3xl font-medium tracking-tight">
            {egg.name}
          </h1>
          <CategoryBadge category={egg.category} />
        </div>
        {egg.description && (
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            {egg.description}
          </p>
        )}
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-1">
          <span>
            Author:{" "}
            <span className="text-foreground font-medium">{egg.author}</span>
          </span>
          <span>
            Source:{" "}
            <a
              href={`https://github.com/${egg.sourceRepo}/blob/main/${egg.sourcePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-foreground font-medium hover:underline"
            >
              {egg.sourceRepo}
              <ExternalLink className="size-3" />
            </a>
          </span>
          {egg.updatedAt && (
            <span>
              Updated:{" "}
              <span className="text-foreground font-medium">
                {new Date(egg.updatedAt).toLocaleDateString()}
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Startup command */}
      {egg.startup && (
        <section className="flex flex-col gap-3">
          <h2 className="font-heading text-base font-medium">Startup Command</h2>
          <pre className="overflow-x-auto rounded-lg border border-border bg-code p-4 text-xs text-code-foreground">
            <code>{egg.startup}</code>
          </pre>
        </section>
      )}

      {/* Docker images */}
      {dockerEntries.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="font-heading text-base font-medium">Docker Images</h2>
          <Card>
            <CardContent className="p-0">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                      Label
                    </th>
                    <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                      Image
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dockerEntries.map(([label, image]) => (
                    <tr
                      key={label}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-4 py-2.5 font-medium">{label}</td>
                      <td className="px-4 py-2.5 font-mono text-muted-foreground">
                        {image}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Environment variables */}
      {egg.variables.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="font-heading text-base font-medium">
            Environment Variables
          </h2>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                        Name
                      </th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                        Variable
                      </th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                        Default
                      </th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                        Rules
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {egg.variables.map((v) => (
                      <tr
                        key={v.envVariable}
                        className="border-b border-border last:border-0"
                      >
                        <td className="px-4 py-2.5">
                          <div className="font-medium">{v.name}</div>
                          {v.description && (
                            <div className="text-muted-foreground mt-0.5">
                              {v.description}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-2.5 font-mono text-muted-foreground">
                          {v.envVariable}
                        </td>
                        <td className="px-4 py-2.5 font-mono">
                          {v.defaultValue || (
                            <span className="text-muted-foreground italic">
                              none
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          {v.rules}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Scripts */}
      {scriptEntries.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="font-heading text-base font-medium">Scripts</h2>
          <div className="flex flex-col gap-4">
            {scriptEntries.map(([key, script]) => (
              <Card key={key}>
                <CardHeader className="border-b border-border">
                  <CardTitle className="capitalize font-heading text-xs">
                    {key}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-3 flex flex-col gap-2">
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>
                      Container:{" "}
                      <span className="font-mono text-foreground">
                        {script.container}
                      </span>
                    </span>
                    <span>
                      Entrypoint:{" "}
                      <span className="font-mono text-foreground">
                        {script.entrypoint}
                      </span>
                    </span>
                  </div>
                  {script.value && (
                    <pre className="overflow-x-auto rounded-md border border-border bg-code p-3 text-xs text-code-foreground mt-1">
                      <code>{script.value}</code>
                    </pre>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Features */}
      {egg.features.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="font-heading text-base font-medium">Features</h2>
          <div className="flex flex-wrap gap-2">
            {egg.features.map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
              >
                <Package className="size-3" />
                {f}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
