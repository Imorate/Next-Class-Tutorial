import { notFound } from "next/navigation";

export const dynamicParams = true;

export async function generateStaticParams() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();
  return posts
    .filter((post) => post.id <= 10)
    .map((post) => ({ id: String(post.id) }));
}

export default async function PostPage({ params }) {
  const { id } = await params;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );
  if (!response.ok || response.status === 404) {
    return notFound();
  }
  const post = await response.json();
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
              <tr key={post.id} className="*:text-gray-900">
                <td className="px-3 py-2 whitespace-nowrap">{post.title}</td>
                <td className="px-3 py-2 whitespace-nowrap">{post.body}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
