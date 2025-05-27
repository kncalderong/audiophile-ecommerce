"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="grid h-screen place-content-center bg-white px-6">
      <div className="text-center">
        <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-4xl">
          Something went wrong!
        </h1>
        <button
          className="mt-6 px-4 py-2 text-sm text-white bg-black transition-colors rounded-md"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </main>
  );
}
