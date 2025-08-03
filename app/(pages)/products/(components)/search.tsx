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

    if (query == '') {
      router.push("/products");
      return;
    }

    startTransition(async () => {
      const aiResponse = await searchAI(query);
      setResult(aiResponse);

      if (!result?.isError) {
        router.push(aiResponse.response);
      }
    });
  };

  return (
    <div className="flex-1 max-w-md mx-4 md:mx-8">
      <div className="relative">
        <form onSubmit={handleSubmit}>
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try asking AiE to search for furninure below 200$!"
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
