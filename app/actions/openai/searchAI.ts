"use server";

import { isAuthenticated } from "@/app/lib/session/session";
import { OpenAiClient } from "@/lib/openapi-client";

export async function searchAI(
  query: string,
): Promise<{ response: string; isError: boolean }> {
  if (!(await isAuthenticated())) {
    return {
      response: "You must be signed in to use this feature.",
      isError: true,
    };
  }

  const client = new OpenAiClient();

  try {
    const response = await client.createChatCompletion(query);
    console.log("OpenAI response:", response);
    return { response, isError: false };
  } catch (err) {
    console.error("OpenAI error:", err);
    return {
      response: "An error occurred while fetching the AI response.",
      isError: true,
    };
  }
}
