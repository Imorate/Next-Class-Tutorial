import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PostsPage() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok || response.status === 400) {
    return notFound();
  }
  const posts = await response.json();
  return (
    <>
      <div className="p-3">
        <div className="overflow-x-auto rounded border border-gray-300 shadow-sm">
          <table className="min-w-full divide-y-2 divide-gray-200">
            <thead className="ltr:text-left rtl:text-right">
              <tr className="*:font-medium *:text-gray-900">
                <th className="px-3 py-2 whitespace-nowrap">Title</th>
                <th className="px-3 py-2 whitespace-nowrap">Body</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
              {posts.map((post) => {
                return (
                  <tr key={post.id} className="*:text-gray-900">
                    <td className="px-3 py-2 whitespace-nowrap font-medium underline hover:no-underline">
                      <Link href={`/posts/${post.id}`}>{post.title}</Link>
                    </td>
                    <td className="px-3 py-2">{post.body}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
