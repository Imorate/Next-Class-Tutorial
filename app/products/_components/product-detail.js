import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProductDetail({ id }) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const text = await response.text();
  if (!text) {
    return notFound();
  }
  const product = JSON.parse(text);
  return (
    <>
      <div className="p-3">
        <div className="overflow-x-auto rounded border border-gray-300 shadow-sm">
          <table className="min-w-full divide-y-2 divide-gray-200">
            <thead className="ltr:text-left rtl:text-right">
              <tr className="*:font-medium *:text-gray-900">
                <th className="px-3 py-2 whitespace-nowrap">Title</th>
                <th className="px-3 py-2 whitespace-nowrap">Price</th>
                <th className="px-3 py-2 whitespace-nowrap">Category</th>
                <th className="px-3 py-2 whitespace-nowrap">Image</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
              <tr key={product.id} className="*:text-gray-900">
                <td className="px-3 py-2 whitespace-nowrap">{product.title}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {product.price}$
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {product.category}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={200}
                    height={250}
                    loading="eager"
                    className="w-40 h-auto"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
