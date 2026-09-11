import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getBrands } from "@/features/brand/brand.api";
import { BrandsResponse } from "@/features/brand/brand.type";
import Image from "next/image";
import Link from "next/link";

export default async function BrandGrid() {
  const brandsResponse: BrandsResponse = await getBrands();
  const brands = brandsResponse.data;
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {brands.map((brand) => (
        <Link key={brand._id} href={`/brand/${brand._id}`}>
          <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
            <Image
              className="w-full object-cover"
              src={brand.logo}
              alt={brand.name}
              width={300}
              height={186}
            />
            <CardHeader>
              <CardTitle className="text-center">{brand.name}</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
