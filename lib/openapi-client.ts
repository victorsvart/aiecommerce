import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat";

export class OpenAiClient {
  client: OpenAI;
  initialSystemPrompt: string;
  private cache = new Map<string, string>();

  constructor() {
    this.client = new OpenAI({ apiKey: process.env.OPEN_API_KEY });
    this.initialSystemPrompt =
      process.env.OPENAI_SYSTEM_PROMPT || "You are a helpful assistant.";
  }

  private createCacheKey(
    model: string,
    systemPrompt: string,
    userMessage: string,
  ) {
    return JSON.stringify({ model, systemPrompt, userMessage });
  }

  async createChatCompletion(userMessage: string): Promise<string> {
    const model = "gpt-4.1-nano";

    const cacheKey = this.createCacheKey(
      model,
      this.initialSystemPrompt,
      userMessage,
    );

    if (this.cache.has(cacheKey)) {
      console.log("Cache hit for prompt");
      return this.cache.get(cacheKey)!;
    }

    const messages: ChatCompletionMessageParam[] = [
      { role: "system", content: this.initialSystemPrompt },
      { role: "user", content: userMessage },
    ];

    const completion = await this.client.chat.completions.create({
      model,
      messages,
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error("No content returned from OpenAI");

    this.cache.set(cacheKey, content);
    return content;
  }
}
