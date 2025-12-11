import Link from "next/link";
import { ClientComponent } from "./client-component";

interface Post {
  id: string;
  title: string;
  body: string;
}

export const revalidate = 60 * 5;
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

async function fetchPostWithDelay(id: string, delayMs: number = 5000) {
  console.log(`Fetching post ${id}`);

  await new Promise((resolve) => setTimeout(resolve, delayMs));

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  return res.json();
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post: Post = await fetchPostWithDelay(id);

  return (
    <main className="max-w-[800px] p-10 mx-auto">
      <Link href="/" className="text-blue-400 text-xl">
        Back
      </Link>

      <h1 className="mt-10">{post.title}</h1>
      <p>{post.body}</p>

      <div className="mt-10">
        <ClientComponent postId={Number(id)} />
      </div>
    </main>
  );
}
