import ProductsList from "@/app/products/_components/products-list";
import LoadingComponent from "@/components/loading-component";
import { Suspense } from "react";

export default async function ProductsPage() {
  return (
    <Suspense fallback={<LoadingComponent title="Loading products..." />}>
      <ProductsList />
    </Suspense>
  );
}
