"use server";

import { OpenAiClient } from "@/lib/openapi-client";

export async function searchAI(
  query: string,
): Promise<{ response: string; isError: boolean }> {
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
