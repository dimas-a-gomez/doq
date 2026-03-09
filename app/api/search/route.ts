import { NextResponse } from "next/server";
import { getAllDocs } from "@/lib/mdx";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  if (!query) {
    return NextResponse.json([]);
  }

  const allDocs = getAllDocs();
  
  const results = allDocs
    .filter((doc) => {
      if (!doc) return false;
      const titleMatch = doc.meta.title?.toLowerCase().includes(query);
      const descMatch = doc.meta.description?.toLowerCase().includes(query);
      const contentMatch = doc.content?.toLowerCase().includes(query);
      return titleMatch || descMatch || contentMatch;
    })
    .map((doc) => ({
      title: doc?.meta.title || doc?.slug,
      description: doc?.meta.description || "",
      slug: doc?.slug,
    }))
    .slice(0, 10); // Limit to 10 results

  return NextResponse.json(results);
}
