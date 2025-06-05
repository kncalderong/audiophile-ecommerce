import Image from "next/image";

export default function Logo() {
  return (
    <div className="relative w-[145px] h-[25px]">
      <Image
        alt="audiphile-logo"
        src={"/audiophile.svg"}
        fill
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
