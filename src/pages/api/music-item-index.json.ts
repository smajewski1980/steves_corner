import { getCollection } from "astro:content";

export async function GET() {
  const allMusicItems = await getCollection("music");

  const collFrontmatterData = allMusicItems.map((item) => ({
    slug: item.id,
    data: item.data,
  }));

  return new Response(JSON.stringify(collFrontmatterData), {
    headers: { "Content-Type": "application/json" },
  });
}
