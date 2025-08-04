import { NextRequest, NextResponse } from "next/server";
import { searchAI } from "@/app/actions/openai/searchAI";

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    
    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    console.log('Testing AI search with query:', query);
    const result = await searchAI(query);
    console.log('AI search result:', result);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Test AI search error:', error);
    return NextResponse.json(
      { error: "Failed to test AI search" },
      { status: 500 }
    );
  }
} 