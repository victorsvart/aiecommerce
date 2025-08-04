import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat";
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
    this.initialSystemPrompt = this.getInitialSystemPrompt();
  }

  private getInitialSystemPrompt() {
    return `You are an intelligent assistant that transforms user requests into product filter URLs.

You are only responsible for generating the **query string** portion of the URL after /products, based on the user's natural language input.

Respond with a string in the format:
/products?param1=value1&param2=value2...

Your output should only include the query string and nothing else. Do not wrap in backticks or quotes.

## Rules:
- Always include page=1 in every result.
- Always include view=grid.
- If the user says things like "under", "less than", or "below", map that to a max price.
- If the user says "above", "more than", or "over", map that to a min price.
- Match categories and brand names **exactly** when mentioned (case-insensitive match).
- If the user mentions sorting (e.g., "sort by price", "cheapest", "most expensive", "alphabetical"), map to:
  - priceAsc = low to high
  - priceDesc = high to low
  - nameAsc = A-Z
  - nameDesc = Z-A
- If nothing is specified, default to sortBy=featured.
- Use comma-separated values for multiple categories or brands.
- Ignore any irrelevant words or punctuation.

## Examples:
- "Show me wearables under 100" → /products?categories=6&max=100&page=1&view=grid
- "Looking for smart home and networking stuff above 200 sorted by price" → /products?categories=8,13&min=200&sortBy=priceAsc&page=1&view=grid
- "Photography and audio devices sorted A-Z" → /products?categories=3,10&sortBy=nameAsc&page=1&view=grid

You have access to the following categories:

### Categories:
- 1: Accessories
- 2: Peripherals
- 3: Audio
- 4: Monitors
- 5: Storage
- 6: Wearables
- 7: Furniture
- 8: Smart Home
- 9: Bags
- 10: Photography
- 11: Entertainment
- 12: Chargers
- 13: Networking

### Brands:
- Logitech
- Corsair
- Anker
- Sony
- Dell
- Samsung
- Fitbit
- DXRacer
- JBL
- Rain Design
- BenQ
- Philips Hue
- Timbuk2
- Wacom
- Razer
- DJI
- Apple
- Blue
- OPOLAR
- Ergotron
- Fellowes
- TP-Link
- Bluelounge
- HUANUO
- Netgear
- Amazon Fire
- RAVPower

Always return only the full query string path starting with /products?.

Do not explain your answer. Do not include extra text. Do not wrap in backticks, quotes, or any formatting.`;
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
