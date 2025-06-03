import Image from "next/image";

type PictureProps = {
  mobile: string;
  tablet: string;
  desktop: string;
  alt: string;
};

export default function PictureComponent({
  mobile,
  tablet,
  desktop,
  alt,
}: PictureProps) {
  return (
    <>
      <Image
        alt={alt}
        src={mobile}
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
        className="block md:hidden"
      />
      <Image
        alt={alt}
        src={tablet}
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
        className="hidden md:block lg:hidden"
      />
      <Image
        alt={alt}
        src={desktop}
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
        className="hidden lg:block"
      />
    </>
  );
}
