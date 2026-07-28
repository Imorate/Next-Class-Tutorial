import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
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
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
                        {products.map(product => {
                            return (
                                <tr key={product.id} className="*:text-gray-900">
                                    <td className="px-3 py-2 whitespace-nowrap font-medium underline hover:no-underline">
                                        <Link href={`/products/${product.id}`}>{product.title}</Link>
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">{product.price}</td>
                                    <td className="px-3 py-2 whitespace-nowrap">{product.category}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
