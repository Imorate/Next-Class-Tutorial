import { ProductDatatable } from "@/components/product/product-datatable";
import { columns } from "@/components/product/product-datatable-columns";
import { getProducts } from "@/features/product/product.api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "محصول",
  description: "صفحه مدیریت محصول",
};

export default async function ProductPage() {
  const productCollectionResponse = await getProducts();
  const products = productCollectionResponse.data ?? [];

  return (
    <div className="container mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">محصول</h1>
      </div>

      <ProductDatatable columns={columns} data={products} />
    </div>
  );
}
