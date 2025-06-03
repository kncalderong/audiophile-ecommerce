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
    </section>
  );
}
