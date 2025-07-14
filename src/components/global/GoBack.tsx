"use client";

import { useRouter } from "next/navigation";

export default function GoBack() {
  const router = useRouter();

  return (
    <p
      className="text-subtitle text-[15px] opacity-80 cursor-pointer"
      onClick={() => router.back()}
    >
      Go Back
    </p>
  );
}
