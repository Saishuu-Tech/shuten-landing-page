import type { Components } from "react-markdown";

export const markdownComponents: Components = {
  h1: ({ children, ...props }) => (
    <h1 className="text-4xl font-bold text-foreground mb-4 mt-12 first:mt-0 leading-tight" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-2xl font-semibold text-foreground mb-6 mt-10 leading-tight" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-xl font-semibold text-foreground mb-4 mt-8 leading-tight" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="text-lg font-medium text-foreground mb-3 mt-6 leading-tight" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }) => (
    <h5 className="text-base font-medium text-foreground mb-2 mt-5 leading-tight" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }) => (
    <h6 className="text-base font-medium text-foreground mb-2 mt-4 leading-tight" {...props}>
      {children}
    </h6>
  ),
  p: ({ children }) => {
    // Check if this paragraph contains a date line (Last updated or Effective Date)
    const textContent =
      typeof children === "string"
        ? children
        : Array.isArray(children)
        ? children.join("")
        : String(children);

    const isDateLine = /^(Last updated|Effective Date):/i.test(
      textContent.trim()
    );

    if (isDateLine) {
      return (
        <p className="text-muted-foreground leading-relaxed mb-16 text-xs">
          {children}
        </p>
      );
    }

    return (
      <p className="text-foreground leading-relaxed mb-4 text-base">
        {children}
      </p>
    );
  },
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground ml-4">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground ml-4">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed text-base">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-border pl-6 py-2 mb-4 italic text-muted-foreground bg-muted/20 rounded-r">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isInline = !className;
    
    // Check if this is an address block
    const isAddressBlock = className?.includes("language-address");

    if (isInline) {
      return (
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground">
          {children}
        </code>
      );
    }

    // Special formatting for address blocks
    if (isAddressBlock) {
      return (
        <div className="whitespace-pre-line text-base text-foreground leading-relaxed mb-4">
          {children}
        </div>
      );
    }

    return (
      <code className="block bg-muted p-4 rounded-lg text-sm font-mono text-foreground overflow-x-auto mb-4">
        {children}
      </code>
    );
  },
  pre: ({ children }) => {
    // Check if this contains an address block by looking at the children
    const hasAddressBlock = children && typeof children === 'object' && 
      'props' in children && children.props?.className?.includes('language-address');

    if (hasAddressBlock) {
      return <>{children}</>;
    }

    return (
      <pre className="bg-muted p-4 rounded-lg text-sm font-mono text-foreground overflow-x-auto mb-4 border">
        {children}
      </pre>
    );
  },
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-foreground">{children}</em>,
  a: ({ href, children, className }) => {
    // Check if this is a heading link (created by rehype-autolink-headings)
    const isHeadingLink = className?.includes("heading-link");
    
    // If it's a heading link, render without special styling
    if (isHeadingLink) {
      return (
        <a href={href} className={className}>
          {children}
        </a>
      );
    }
    
    // Check if this is an email link
    const isEmailLink = href?.startsWith("mailto:");

    if (isEmailLink) {
      return (
        <a
          href={href}
          className="inline-flex items-center px-2 py-1 mr-0.5 text-xs font-medium bg-muted text-foreground border border-border rounded-lg hover:bg-muted/80 transition-colors"
        >
          {children}
        </a>
      );
    }

    return (
      <a
        href={href}
        className="text-foreground border-b-2 border-muted-foreground/30 pb-0.5 hover:border-foreground"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  },
  hr: () => <hr className="border-border my-8" />,
  table: ({ children }) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border-collapse border border-border rounded-lg">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-muted/50">{children}</thead>,
  tbody: ({ children }) => (
    <tbody className="divide-y divide-border">{children}</tbody>
  ),
  tr: ({ children }) => (
    <tr className="hover:bg-muted/20 transition-colors">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="border border-border px-4 py-3 text-left font-semibold text-foreground text-sm">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-border px-4 py-3 text-muted-foreground text-sm">
      {children}
    </td>
  ),
};
