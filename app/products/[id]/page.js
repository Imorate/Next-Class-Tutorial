import ProductDetail from "@/app/products/_components/product-detail";

export default async function ProductPage({ params }) {
  const { id } = await params;
  return <ProductDetail id={id} />;
}
