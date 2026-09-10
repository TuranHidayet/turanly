"use client";

import { useOnScreen } from "./useOnScreen";
import { SlideShow } from "./SlideShow";

export function PhoneMockup({ images }: { images: string[] }) {
  const [ref, visible] = useOnScreen(0.15);

  return (
    <div
      ref={ref}
      className={`relative mx-auto w-full max-w-[240px] transition-all duration-[1400ms] ease-out ${
        visible ? "translate-y-0 rotate-0 opacity-100" : "translate-y-20 rotate-12 opacity-0"
      }`}
    >
      {/* Phone body with shadow */}
      <div className="rounded-[3rem] border-[3px] border-zinc-300 bg-zinc-900 p-2 shadow-xl dark:border-zinc-500">
        {/* Notch area */}
        <div className="relative mx-auto mb-1 h-5 w-1/3 rounded-full bg-zinc-800">
          <div className="absolute top-1/2 left-1/2 h-2 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-700" />
        </div>

        {/* Screen */}
        <div className="aspect-[9/19.5] w-full overflow-hidden rounded-2xl bg-zinc-900">
          <SlideShow images={images} interval={5000} />
        </div>

        {/* Home indicator */}
        <div className="mx-auto mt-1 h-8 w-8 rounded-full border-2 border-zinc-600" />
      </div>
    </div>
  );
}
