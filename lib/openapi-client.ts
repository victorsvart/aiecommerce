import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat";
import fs from "fs";
import path from "path";
import { env } from "./env";

export class OpenAiClient {
  client: OpenAI;
  initialSystemPrompt: string;
  private cache = new Map<string, string>();
  private requestCount = 0;
  private lastReset = Date.now();
  private readonly RATE_LIMIT = 10; // requests per minute
  private readonly RATE_LIMIT_WINDOW = 60000; // 1 minute in ms

  constructor() {
    this.client = new OpenAI({ apiKey: env.OPEN_API_KEY });
    this.initialSystemPrompt = this.loadInitialSystemPrompt();
  }

  private loadInitialSystemPrompt() {
    try {
      const promptPath = path.join(process.cwd(), "prompt/initial_prompt.md");
      const prompt = fs.readFileSync(promptPath, "utf8");
      console.log('Loaded initial prompt:', prompt.substring(0, 200) + '...');
      return prompt;
    } catch (e) {
      console.error("Failed to load initial system prompt", e);
      return "";
    }
  }

  private createCacheKey(
    model: string,
    systemPrompt: string,
    userMessage: string,
  ) {
    return JSON.stringify({ model, systemPrompt, userMessage });
  }

  private checkRateLimit(): boolean {
    const now = Date.now();
    
    // Reset counter if window has passed
    if (now - this.lastReset > this.RATE_LIMIT_WINDOW) {
      this.requestCount = 0;
      this.lastReset = now;
    }

    // Check if we're over the limit
    if (this.requestCount >= this.RATE_LIMIT) {
      return false;
    }

    this.requestCount++;
    return true;
  }

  async createChatCompletion(userMessage: string): Promise<string> {
    console.log('Creating chat completion for:', userMessage);
    
    if (!this.checkRateLimit()) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }

    const model = "gpt-4o-mini"; // Updated to use the correct model name

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

    try {
      console.log('Sending request to OpenAI with messages:', messages);
      const completion = await this.client.chat.completions.create({
        model,
        messages,
        max_tokens: 500,
        temperature: 0.7,
      });

      const content = completion.choices[0]?.message?.content;
      console.log('OpenAI response content:', content);
      
      if (!content) throw new Error("No content returned from OpenAI");

      this.cache.set(cacheKey, content);
      return content;
    } catch (error) {
      console.error("OpenAI API error:", error);
      throw new Error("Failed to generate AI response. Please try again.");
    }
  }
}
