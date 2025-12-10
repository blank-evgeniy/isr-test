export default async function Home() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();

  return (
    <div className="flex flex-col gap-4 max-w-[800px] p-10 mx-auto">
      {data.map((item) => (
        <a
          href={`/posts/${item.id}`}
          key={item.id}
          className="border rounded-lg p-2"
        >
          <h2>{item.title}</h2>
        </a>
      ))}
    </div>
  );
}
