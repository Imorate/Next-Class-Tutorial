import Navbar from "@/components/navbar/navbar";

export default function MainLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100svh-4rem)]">{children}</main>
    </>
  );
}
