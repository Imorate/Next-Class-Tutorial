import { CategoryDatatable } from "@/components/category/category-datatable";
import { columns } from "@/components/category/category-datatable-columns";
import { getCategories } from "@/features/category/category.api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "دسته بندی",
  description: "صفحه مدیریت دسته بندی",
};

export default async function CategoryPage() {
  const categoryCollectionResponse = await getCategories(true);
  const categories = categoryCollectionResponse.data ?? [];

  return (
    <div className="container mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">دسته بندی</h1>
      </div>

      <CategoryDatatable columns={columns} data={categories} />
    </div>
  );
}
