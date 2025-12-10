import Link from "next/link";

interface Post {
  id: string;
  title: string;
  body: string;
}

export const revalidate = 60 * 5;

export async function generateStaticParams() {
  return [];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post: Post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  ).then((res) => res.json());

  return (
    <main className="max-w-[800px] p-10 mx-auto">
      <Link href="/" className="text-blue-400 text-xl">
        Back
      </Link>

      <h1 className="mt-10">{post.title}</h1>
      <p>{post.body}</p>
    </main>
  );
}
