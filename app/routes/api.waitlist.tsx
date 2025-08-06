import type { ActionFunctionArgs } from "react-router";
import { data } from "react-router";
import { addToWaitlist } from "~/services/notion.server";
import { sendWaitlistEmail } from "~/services/mail.server";
import { checkRateLimit, getClientIp } from "~/services/rate-limit.server";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return data({ error: "Method not allowed" }, { status: 405 });
  }

  const ip = getClientIp(request);
  const rateLimit = await checkRateLimit(ip);

  if (!rateLimit.success) {
    return data(
      {
        error: "Too many requests. Please try again later.",
        retryAfter: rateLimit.reset,
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": rateLimit.limit.toString(),
          "X-RateLimit-Remaining": rateLimit.remaining.toString(),
          "X-RateLimit-Reset": new Date(rateLimit.reset).toISOString(),
        },
      }
    );
  }

  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();

    if (!email) {
      return data({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return data({ error: "Invalid email address" }, { status: 400 });
    }

    const notionResult = await addToWaitlist(email);
    if (!notionResult.success) {
      console.error("Failed to add to Notion:", notionResult.error);
      return data(
        { error: "Failed to add to waitlist. Please try again." },
        { status: 500 }
      );
    }

    const emailResult = await sendWaitlistEmail(email);
    if (!emailResult.success) {
      console.error("Failed to send email:", emailResult.error);
    }

    return data(
      {
        success: true,
        message: "Successfully added to waitlist!",
        emailSent: emailResult.success,
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": rateLimit.limit.toString(),
          "X-RateLimit-Remaining": rateLimit.remaining.toString(),
          "X-RateLimit-Reset": new Date(rateLimit.reset).toISOString(),
        },
      }
    );
  } catch (error) {
    console.error("Waitlist API error:", error);
    return data(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
