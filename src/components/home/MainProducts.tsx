import Link from "next/link";
import { CustomButton } from "../global/CustomButton";
import PictureComponent from "../global/PictureComponent";

const firstProductMobile = "/home/mobile/image-speaker-zx9.png";
const firstProductTablet = "/home/tablet/image-speaker-zx9.png";
const firstProductDesktop = "/home/desktop/image-speaker-zx9.png";

export default function MainProducts() {
  return (
    <section className="w-full bg-white pb-28">
      <div className="container custom-box flex flex-col gap-8">
        <div className="w-full rounded-lg bg-store-orange-dark text-store-gray-mid text-center flex flex-col gap-8 items-center px-8 py-16 overflow-hidden md:gap-12 md:py-20 lg:flex-row lg:gap-28 lg:px-28 lg:pb-0 lg:pt-28 lg:items-start">
          <div className="w-3/5 aspect-[0.85] block relative mb-4 max-w-[200px] lg:h-auto lg:aspect-[0.8] lg:w-[540px] lg:max-w-none lg:-mb-2">
            <div className="absolute top-1/2 left-1/2 border border-store-gray-mid rounded-full w-[185%] aspect-square -translate-x-1/2 -translate-y-1/2 opacity-40 z-0 md:w-[230%] lg:w-[125%]"></div>
            <div className="absolute top-1/2 left-1/2 border border-store-gray-mid rounded-full w-[210%] aspect-square -translate-x-1/2 -translate-y-1/2 opacity-40 z-0 md:w-[260%] lg:w-[110%]"></div>
            <div className="absolute top-1/2 left-1/2 border border-store-gray-mid rounded-full w-[360%] aspect-square -translate-x-1/2 -translate-y-1/2 opacity-40 z-0 md:w-[450%] lg:w-[200%]"></div>
            <PictureComponent
              alt="Banner"
              mobile={firstProductMobile}
              tablet={firstProductTablet}
              desktop={firstProductDesktop}
            />
          </div>
          <div className="flex flex-col w-full gap-6 items-center md:gap-8 lg:w-1/2 lg:items-start lg:text-left lg:pt-8 lg:gap-12">
            <h3 className="w-2/3 md:text-h2 md:w-1/3 lg:text-5xl">
              ZX9 SPEAKER
            </h3>
            <p className="text-sm text-subtitle opacity-80 md:w-1/2 lg:text-base lg:w-full">
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound.
            </p>
            <CustomButton
              variant={"secondary"}
              className="bg-black text-store-gray-mid z-10 hover:bg-gray-700 border-none"
            >
              <Link href="#">See Product</Link>
            </CustomButton>
          </div>
        </div>
      </div>
    </section>
  );
}
