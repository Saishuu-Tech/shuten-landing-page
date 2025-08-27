import { LegalPageLayout } from "./components/LegalPageLayout";
import termsContent from "../../content/legal/terms-2025-08-29.md?raw";

export default function TermsOfUse() {
  return <LegalPageLayout title="Terms of Use" content={termsContent} />;
}
