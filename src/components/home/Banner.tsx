import Link from "next/link";
import { CustomButton } from "../global/CustomButton";
import PictureComponent from "../global/PictureComponent";
const bannerMobile = "/home/mobile/image-header.jpg";
const bannerTablet = "/home/tablet/image-header.jpg";
const bannerDesktop = "/home/desktop/image-hero.jpg";

export default function Banner() {
  return (
    <section className="w-full h-[calc(100vh-90px)]">
      <div className="w-full absolute left-0 top-0 z-0 block aspect-[0.625] md:aspect-square lg:aspect-auto lg:h-screen">
        <PictureComponent
          alt="Banner"
          mobile={bannerMobile}
          tablet={bannerTablet}
          desktop={bannerDesktop}
        />
      </div>
      <div className="w-full absolute left-0 top-0 z-10 aspect-[0.625] md:aspect-square lg:aspect-auto h-[calc(100vh-90px)] lg:container lg:mx-auto lg:relative">
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[20%] flex flex-col gap-4 items-center z-10 w-4/5 text-store-gray-mid text-center md:w-[45%] lg:left-0 lg:translate-x-0 lg:bottom-1/3 lg:gap-8 lg:w-1/3 lg:items-start lg:text-left">
          <p className="uppercase text-overline opacity-80 ">new product</p>
          <h2 className="md:text-5xl">XX99 MARK II HEADPHONES</h2>
          <p className="text-sm text-subtitle my-2 opacity-80 lg:text-base">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast
          </p>
          <CustomButton variant="primary" size="md">
            <Link href="#">see product</Link>
          </CustomButton>
        </div>
      </div>
    </section>
  );
}
