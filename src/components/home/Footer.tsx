import { NavLinks } from "@/app/(customer)/layout";
import Logo from "../global/Logo";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <section className="w-full bg-store-gray-strong text-store-gray-mid py-16 ">
      <div className="container custom-box flex relative">
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[100px] h-1 bg-store-orange-dark md:left-0 md:translate-x-0"></div>
        <div className="flex flex-col gap-8 items-center w-full md:items-start lg:w-1/2">
          <Logo />
          <div className="flex flex-col gap-4 items-center md:flex-row md:gap-8 lg:hidden">
            <NavLinks />
          </div>
          <p className="text-sm text-subtitle opacity-80 text-center md:text-left">
            Audiophile is an all in one stop to fulfill your audio needs.
            We&apos;re a small team of music lovers and sound specialists who
            are devoted to helping you get the most out of personal audio. Come
            and visit our demo facility - we&apos;re open 7 days a week.
          </p>
          <div className="flex w-full flex-col gap-8 items-center md:flex-row md:gap-0 md:justify-between">
            <p className="text-sm text-subtitle opacity-80">
              Copyright 2021. All Rights Reserved
            </p>
            <SocialIcons className="lg:hidden" />
          </div>
        </div>
        <div className="w-1/2 hidden lg:flex flex-col items-end">
          <div className="flex flex-row justify-end gap-8 h-1/2">
            <NavLinks />
          </div>
          <SocialIcons className="h-1/2" />
        </div>
      </div>
    </section>
  );
}

function SocialIcons({ ...props }) {
  return (
    <div className={cn("flex gap-4 items-center", props.className)}>
      <Link href="#" className="block relative w-6 h-6">
        <Image
          src="/home/mobile/icon-facebook.svg"
          alt="facebook"
          fill
          style={{ objectFit: "cover" }}
        />
      </Link>
      <Link href="#" className="block relative w-6 h-6">
        <Image
          src="/home/mobile/icon-twitter.svg"
          alt="twitter"
          fill
          style={{ objectFit: "cover" }}
        />
      </Link>
      <Link href="#" className="block relative w-6 h-6">
        <Image
          src="/home/mobile/icon-instagram.svg"
          alt="instagram"
          fill
          style={{ objectFit: "cover" }}
        />
      </Link>
    </div>
  );
}
