import { cacheLife } from "next/cache";

export default async function PostsList() {
  "use cache";
  cacheLife("max");
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok || response.status === 400) {
    return notFound();
  }
  const posts = await response.json();
  return (
    <>
      <div className="p-3 flex flex-wrap gap-3">
        {posts.map((post) => {
          return (
            <div
              key={post.id}
              className="bg-white hover:bg-gray-800 hover:*:text-white transition-colors border border-l-emerald-700 border-l-4 border-slate-200 shadow-sm rounded-lg p-4 sm:p-6 w-full mx-5"
            >
              <h3 className="text-slate-900 text-base font-semibold">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {post.body}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
