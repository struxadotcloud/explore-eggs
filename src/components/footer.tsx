export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Struxa. Open source.
        </p>
      </div>
    </footer>
  );
}
