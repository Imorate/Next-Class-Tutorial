import { MediaDatatable } from "@/components/media/media-datatable";
import { columns } from "@/components/media/media-datatable-columns";
import { getAllMedia } from "@/features/media/media.api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "رسانه",
  description: "صفحه مدیریت رسانه",
};

export default async function MediaPage() {
  const mediaCollectionResponse = await getAllMedia();
  const mediaList = mediaCollectionResponse.data ?? [];

  return (
    <div className="container mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">رسانه</h1>
      </div>

      <MediaDatatable columns={columns} data={mediaList} />
    </div>
  );
}
