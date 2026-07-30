import { getCollection } from "astro:content";

export async function GET() {
  const posts = await getCollection("blog");

  const titles = posts.map((post) => ({
    title: post.data.title,
    slug: post.id,
  }));

  return new Response(JSON.stringify(titles), {
    headers: {
      "content-type": "application/json",
    },
  });
}
