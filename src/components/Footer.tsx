export function Footer() {
  return (
    <footer className="border-t py-4 px-6 bg-card mt-auto">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        boothify {new Date().getFullYear()} • made by{" "}
        <a
          href="https://github.com/heytheretyo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          @tyonirwansyah
        </a>
      </div>
    </footer>
  );
}
