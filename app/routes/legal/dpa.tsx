import { LegalPageLayout } from "./components/LegalPageLayout";
import dpaContent from "../../content/legal/dpa-2025-08-29.md?raw";

export default function DataProcessingAgreement() {
  return (
    <LegalPageLayout title="Data Processing Agreement" content={dpaContent} />
  );
}
