import { MarkdownRenderer } from "./MarkdownRenderer";
import { TableOfContents } from "./TableOfContents";

interface LegalPageLayoutProps {
  title: string;
  content: string;
  children?: React.ReactNode;
}

export function LegalPageLayout({
  title,
  content,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 left-0 right-0 z-10 px-6 py-4 md:px-12 md:py-6 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-xl md:text-2xl tracking-tight">
            <a
              href="/"
              className="mr-2 font-bold hover:text-muted-foreground transition-colors"
            >
              Saishuu
            </a>
            <span className="mr-2 select-none text-muted-foreground">|</span>
            <span className="text-primary font-semibold select-none mr-2">
              Shuten
            </span>
            <span className="text-muted-foreground select-none">·</span>
            <span className="ml-2 text-muted-foreground font-normal text-lg">
              {title}
            </span>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 md:px-12 md:py-12">
        <div className="flex gap-12">
          {/* Article Content */}
          <article className="flex-1 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              {children ? children : <MarkdownRenderer content={content} />}
            </div>
          </article>

          {/* Table of Contents */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <TableOfContents content={content} />
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-6 md:px-12 md:py-8 text-center border-t border-border/50">
        <p className="text-sm text-muted-foreground/70">
          A product of{" "}
          <a
            href="https://www.saishuu.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors underline"
          >
            Saishuu Technologies
          </a>
        </p>
        <p className="text-xs text-muted-foreground/50 mt-2">
          © {new Date().getFullYear()} Saishuu Technologies. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
