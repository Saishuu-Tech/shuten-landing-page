import { Resend } from "resend";
import WaitlistEmail from "~/emails/waitlist-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWaitlistEmail(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: `The Shuten Team <${process.env.RESEND_FROM_EMAIL || ""}>`,
      to: [email],
      subject: "You are in the Shuten waitlist!",
      react: WaitlistEmail(),
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    if (!data) {
      return { success: false, error: "Failed to send email" };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email service error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}
