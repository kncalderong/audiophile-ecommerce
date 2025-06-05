import Banner from "@/components/home/Banner";
import Categories from "@/components/home/Categories";
import HeroFooter from "@/components/home/HeroFooter";

export default function Home() {
  return (
    <div className="w-full">
      <Banner />
      <Categories />
      <HeroFooter />
    </div>
  );
}
