import { LegalPageLayout } from "./components/LegalPageLayout";
import { VendorTable } from "./components/VendorTable";
import subprocessorsData from "../../content/legal/subprocessors-2025-08-29.json";

export default function Subprocessors() {
  return (
    <LegalPageLayout title="Subprocessors" content="">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold text-foreground mb-4 mt-12 first:mt-0 leading-tight">
          Subprocessors
        </h1>

        <p className="text-muted-foreground leading-relaxed mb-16 text-xs">
          Last updated: {subprocessorsData.effectiveDate}
        </p>

        <p className="text-foreground leading-relaxed mb-4 text-base">
          {subprocessorsData.description}
        </p>

        <h2 className="text-3xl font-semibold text-foreground mb-6 mt-10 leading-tight">
          Current Subprocessors
        </h2>

        <p className="text-foreground leading-relaxed mb-6 text-base">
          The following table contains our current list of subprocessors, their
          services, and locations:
        </p>

        <VendorTable
          vendors={subprocessorsData.subprocessors}
          notes={subprocessorsData.notes}
        />
      </div>
    </LegalPageLayout>
  );
}
