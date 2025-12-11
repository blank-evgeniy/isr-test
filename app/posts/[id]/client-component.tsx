"use client";

import { useEffect, useState } from "react";

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface ClientComponentProps {
  postId: number;
}

export const ClientComponent = ({ postId }: ClientComponentProps) => {
  const [comments, setComments] = useState<null | Comment[]>(null);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      const data = await res.json();
      setComments(data);
    };

    fetchComments();
  }, [postId]);

  if (!comments) {
    return <div className="bg-slate-600 animate-pulse h-10" />;
  }

  return (
    <div className="max-w-[800px] p-10 mx-auto space-y-4">
      {comments.map((comment) => (
        <div key={comment.id}>
          <h2>{comment.name}</h2>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
};
