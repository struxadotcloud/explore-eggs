import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center gap-4 px-4 py-20">
        <p className="font-mono text-5xl font-medium text-muted-foreground">
          404
        </p>
        <h1 className="font-heading text-xl font-medium">Page not found</h1>
        <p className="text-sm text-muted-foreground">
          The egg or page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex h-8 items-center rounded-md border border-border bg-background px-3 text-xs font-medium hover:bg-muted transition-colors"
        >
          Back to home
        </Link>
      </main>
      <Footer />
    </>
  );
}
