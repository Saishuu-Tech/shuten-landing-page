import { ExternalLink } from "lucide-react";

interface Vendor {
  company: string;
  purpose: string;
  location: string;
  url?: string;
  favicon?: string;
}

interface VendorTableProps {
  vendors: Vendor[];
  notes?: string[];
}

export function VendorTable({ vendors, notes }: VendorTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-4 px-2 font-semibold text-foreground text-base">
              Vendor
            </th>
            <th className="text-left py-4 px-2 font-semibold text-foreground text-base">
              Service Provided
            </th>
            <th className="text-left py-4 px-2 font-semibold text-foreground text-base">
              Location
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {vendors.map((vendor) => (
            <tr
              key={vendor.company}
              className="hover:bg-muted/20 transition-colors"
            >
              <td className="py-4 px-2">
                <div className="flex items-center gap-3">
                  {vendor.favicon && (
                    <img
                      src={vendor.favicon}
                      alt={`${vendor.company} logo`}
                      className="w-5 h-5 flex-shrink-0"
                      loading="lazy"
                    />
                  )}
                  <div>
                    {vendor.url ? (
                      <a
                        href={vendor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1"
                      >
                        {vendor.company}
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    ) : (
                      <span className="font-medium text-foreground">
                        {vendor.company}
                      </span>
                    )}
                  </div>
                </div>
              </td>
              <td className="py-4 px-2 text-muted-foreground">
                {vendor.purpose}
              </td>
              <td className="py-4 px-2 text-muted-foreground">
                {vendor.location}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {notes && notes.length > 0 && (
        <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-border">
          {notes.map((note, index) => (
            <p
              key={index}
              className="text-sm text-foreground leading-relaxed mb-2 last:mb-0"
            >
              <li>{note}</li>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
