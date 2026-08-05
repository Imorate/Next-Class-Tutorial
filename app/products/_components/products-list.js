import Image from "next/image";
import Link from "next/link";

export default async function ProductsList() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  return (
    <div className="p-3 flex flex-wrap gap-3">
      {products.map((product) => {
        return (
          <div
            key={product.id}
            className="bg-white border border-slate-200 shadow-sm w-full max-w-sm rounded-lg mx-auto mt-6 overflow-hidden"
          >
            <div className="aspect-3/2 w-full p-2 pb-0">
              <Image
                src={product.image}
                alt={product.title}
                width={150}
                height={200}
                className="w-full h-full object-scale-down rounded-lg border border-slate-100"
              />
            </div>
            <div className="p-4 sm:p-6">
              <h3 className="text-slate-900 text-base font-semibold">
                {product.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>
              <Link
                href={`/products/${product.id}`}
                className="block w-full mt-6 py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                View product
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
