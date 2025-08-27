import { LegalPageLayout } from "./components/LegalPageLayout";
import privacyContent from "../../content/legal/privacy-2025-08-29.md?raw";

export default function PrivacyPolicy() {
  return <LegalPageLayout title="Privacy Policy" content={privacyContent} />;
}
