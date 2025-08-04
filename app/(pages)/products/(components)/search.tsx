"use client";

import { searchAI } from "@/app/actions/openai/searchAI";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{
    response: string;
    isError: boolean;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (query == "") {
      router.push("/products");
      return;
    }

    startTransition(async () => {
      try {
        console.log('Searching for:', query);
        const aiResponse = await searchAI(query);
        console.log('AI Response received:', aiResponse);
        setResult(aiResponse);

        if (!aiResponse.isError) {
          // Clean up the response - remove backticks and extra whitespace
          let cleanResponse = aiResponse.response.trim();
          
          // Remove backticks if present
          if (cleanResponse.startsWith('`') && cleanResponse.endsWith('`')) {
            cleanResponse = cleanResponse.slice(1, -1);
          }
          
          // Remove quotes if present
          if ((cleanResponse.startsWith('"') && cleanResponse.endsWith('"')) ||
              (cleanResponse.startsWith("'") && cleanResponse.endsWith("'"))) {
            cleanResponse = cleanResponse.slice(1, -1);
          }
          
          // Ensure it starts with /products
          if (!cleanResponse.startsWith('/products')) {
            cleanResponse = `/products${cleanResponse}`;
          }
          
          // Validate the URL format
          try {
            new URL(cleanResponse, window.location.origin);
            console.log('AI Response:', aiResponse.response);
            console.log('Clean Response:', cleanResponse);
            router.push(cleanResponse);
          } catch (error) {
            console.error('Invalid URL generated:', cleanResponse);
            setResult({
              response: "Sorry, I couldn't understand your request. Please try again with different words.",
              isError: true
            });
          }
        }
      } catch (error) {
        console.error('Search error:', error);
        setResult({
          response: error instanceof Error ? error.message : "An error occurred while processing your request. Please try again.",
          isError: true
        });
      }
    });
  };

  return (
    <div className="w-full">
      <div className="relative">
        <form onSubmit={handleSubmit}>
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: 'smart home devices', 'accessories under 100', 'wearables'"
            className="pl-12 pr-4 py-3 text-base rounded-full border-2 border-blue-200 focus:border-blue-500 dark:border-slate-600 dark:focus:border-blue-400"
          />
        </form>
      </div>
      {isPending ? (
        <p className="text-sm text-slate-500 mt-2">Thinking...</p>
      ) : null}

      {result?.isError ? (
        <p className="text-sm text-red-500 mt-2">{result.response}</p>
      ) : null}
    </div>
  );
}
