import Banner from "@/components/home/Banner";
import Categories from "@/components/home/Categories";
import Footer from "@/components/home/Footer";
import HeroFooter from "@/components/home/HeroFooter";
import MainProducts from "@/components/home/MainProducts";

export default function Home() {
  return (
    <div className="w-full">
      <Banner />
      <Categories />
      <MainProducts />
      <HeroFooter />
      <Footer />
    </div>
  );
}
