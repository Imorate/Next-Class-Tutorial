import { BrandDatatable } from "@/components/brand/brand-datatable";
import { columns } from "@/components/brand/brand-datatable-columns";
import { getBrands } from "@/features/brand/brand.api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "برند",
  description: "صفحه مدیریت برند",
};

export default async function BrandPage() {
  const brandCollectionResponse = await getBrands(true);
  const brands = brandCollectionResponse.data ?? [];

  return (
    <div className="container mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">برند</h1>
      </div>

      <BrandDatatable columns={columns} data={brands} />
    </div>
  );
}
