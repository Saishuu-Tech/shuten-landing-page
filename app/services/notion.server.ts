import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export async function addToWaitlist(email: string) {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DB || "",
      },
      properties: {
        Email: {
          type: "email",
          email: email,
        },
        Name: {
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: email,
              },
            },
          ],
        },
        Source: {
          type: "select",
          select: {
            name: "shuten.io",
          },
        },
        "Date Added": {
          type: "date",
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    });

    if (!response) {
      return { success: false, error: "Failed to add to Notion database" };
    }

    return { success: true, data: response };
  } catch (error) {
    console.error("Notion service error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to add to waitlist",
    };
  }
}
