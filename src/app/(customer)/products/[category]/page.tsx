import Categories from "@/components/home/Categories";
import Footer from "@/components/home/Footer";
import HeroFooter from "@/components/home/HeroFooter";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  console.log(category);
  return (
    <div className="w-full">
      <Categories />
      <HeroFooter />
      <Footer />
    </div>
  );
}
