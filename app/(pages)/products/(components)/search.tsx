import { Input } from "@/components/ui/input";
import {
  Search
} from "lucide-react";

export default async function SearchBar() {
  return (
    <>
      {/* Search */}
      <div className="flex-1 max-w-md mx-4 md:mx-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-12 pr-4 py-3 text-base rounded-full border-2 border-blue-200 focus:border-blue-500 dark:border-slate-600 dark:focus:border-blue-400"
          />
        </div>
      </div>
    </>
  );
}
