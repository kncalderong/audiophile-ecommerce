import PictureComponent from "../global/PictureComponent";

const heroFooterMobile = "/categories/mobile/image-best-gear.jpg";
const heroFooterTablet = "/categories/tablet/image-best-gear.jpg";
const heroFooterDesktop = "/categories/desktop/image-best-gear.jpg";

export default function HeroFooter() {
  return (
    <section className="w-full bg-white pb-28">
      <div className="container custom-box flex flex-col gap-8 lg:flex-row-reverse lg:items-center lg:gap-0 lg:justify-between">
        <div className="w-full aspect-square block relative rounded-lg overflow-hidden md:aspect-auto md:h-[300px] lg:h-auto lg:aspect-[0.95] lg:w-[540px]">
          <PictureComponent
            alt="Banner"
            mobile={heroFooterMobile}
            tablet={heroFooterTablet}
            desktop={heroFooterDesktop}
          />
        </div>
        <div className="flex flex-col w-full gap-8 text-center lg:text-left lg:max-w-[445px]">
          <h4 className="lg:text-h2">
            Bringing you the{" "}
            <span className="text-store-orange-dark">best</span> audio gear
          </h4>
          <p className="text-sm text-subtitle opacity-80">
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
      </div>
    </section>
  );
}
