import { useState, useEffect } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Wait for DOM to be ready, then extract headings from actual rendered content
    const timer = setTimeout(() => {
      const article = document.querySelector("article .prose");
      if (!article) {
        console.log("TableOfContents: article .prose not found");
        return;
      }

      const headingElements = article.querySelectorAll(
        "h1, h2, h3, h4, h5, h6"
      );
      console.log(
        "TableOfContents: Found heading elements:",
        headingElements.length
      );

      const extractedHeadings: Heading[] = Array.from(headingElements)
        .map((element) => {
          const id = element.id;
          const text = element.textContent?.trim() || "";
          const level = parseInt(element.tagName.substring(1)); // H1 -> 1, H2 -> 2, etc.

          console.log(
            `Found heading: ${element.tagName} - ID: "${id}" - Text: "${text}"`
          );
          return { id, text, level };
        })
        .filter((heading) => heading.level > 1 && heading.id); // Skip h1 headings and headings without IDs

      console.log("TableOfContents: Filtered headings:", extractedHeadings);
      setHeadings(extractedHeadings);
    }, 100); // Small delay to ensure DOM is rendered

    return () => clearTimeout(timer);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that's intersecting and closest to the top
        const intersectingEntries = entries.filter(
          (entry) => entry.isIntersecting
        );

        if (intersectingEntries.length > 0) {
          // Sort by how close they are to the top (smallest boundingClientRect.top)
          intersectingEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );

          const targetId = intersectingEntries[0].target.id;
          setActiveId(targetId);
        }
      },
      {
        rootMargin: "-120px 0% -40% 0%", // Account for sticky header
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    // Observe all heading elements
    const elementsToObserve: Element[] = [];
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        elementsToObserve.push(element);
      }
    });

    return () => {
      elementsToObserve.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 120; // Account for sticky header (increased from 96px)
      const elementTop =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetTop = elementTop - headerHeight;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      // Update active state immediately
      setActiveId(id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="bg-muted/20 rounded-lg p-4 border border-border">
        <ul className="space-y-1">
          {headings.map(({ id, text, level }) => (
            <li key={id}>
              <button
                onClick={() => scrollToHeading(id)}
                className={`text-left w-full text-[0.8rem] transition-all duration-200 rounded-md ${
                  activeId === id
                    ? "text-primary font-semibold bg-primary/10 border-l-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
                style={{
                  paddingLeft: `${(level - 2) * 0.75 + 0.75}rem`, // Adjust for filtered h1
                }}
                title={text} // Add tooltip for long text
              >
                {text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
