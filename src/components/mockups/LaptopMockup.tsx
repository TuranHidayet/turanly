"use client";

import { useEffect, useState } from "react";
import { useOnScreen } from "./useOnScreen";
import { SlideShow } from "./SlideShow";

export function LaptopMockup({ images }: { images: string[] }) {
  const [ref, visible] = useOnScreen(0.15);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setOpen(true), 400);
      return () => clearTimeout(t);
    }
  }, [visible]);

  return (
    <div
      ref={ref}
      className={`relative mx-auto w-full max-w-[480px] transition-all duration-1000 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
    >
      <style>{`
        @keyframes lid-glow {
          0% { opacity: 0; box-shadow: inset 0 0 0px rgba(99,102,241,0); }
          30% { opacity: 1; box-shadow: inset 0 0 60px rgba(99,102,241,0.15); }
          100% { opacity: 0; box-shadow: inset 0 0 0px rgba(99,102,241,0); }
        }
      `}</style>

      <div className="relative" style={{ perspective: "900px" }}>
        {/* Lid (screen) - rotates open */}
        <div
          className="relative z-10 origin-bottom transition-all duration-[1500ms] ease-out"
          style={{
            transform: open ? "rotateX(0deg)" : "rotateX(100deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Lid body - matte finish like real laptop lid */}
          <div className="rounded-t-xl border border-zinc-400/60 bg-zinc-800 shadow-md dark:border-zinc-600">
            {/* Screen area */}
            <div className="p-3 pb-1.5">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-black shadow-inner">
                {/* Screen off - glossy black */}
                <div
                  className={`absolute inset-0 z-20 bg-black transition-opacity duration-700 ${
                    open ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
                />

                {/* Screen reflection stripe */}
                <div
                  className={`absolute top-0 left-0 right-0 z-10 h-1/3 bg-gradient-to-b from-white/[0.06] to-transparent transition-opacity duration-700 ${
                    open ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Screen content */}
                <div
                  className={`absolute inset-0 transition-all duration-1000 delay-500 ${
                    open ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <SlideShow images={images} interval={4500} />
                </div>

                {/* Glow effect when opening */}
                <div
                  className={`absolute inset-0 z-10 transition-opacity duration-700 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                  style={{
                    animation: open ? "none" : "lid-glow 1.2s ease-out forwards",
                  }}
                />
              </div>
            </div>

            {/* Bottom bezel with logo */}
            <div className="flex justify-center pb-2">
              <div className="mb-0.5 h-1 w-16 rounded-full bg-zinc-600" />
            </div>
          </div>
        </div>

        {/* Hinge cylinder */}
        <div className="relative z-20 mx-auto -mt-[3px] h-3 w-[85%] rounded-sm bg-zinc-500 dark:bg-zinc-500">
          <div className="absolute inset-0 flex justify-center">
            <div className="h-3 w-24 rounded-sm bg-zinc-400 dark:bg-zinc-400" />
          </div>
        </div>

        {/* Keyboard deck */}
        <div className="relative rounded-b-xl border border-t-0 border-zinc-400/60 bg-zinc-700 pb-5 pt-3 shadow-lg dark:border-zinc-600">
          {/* Touchpad */}
          <div className="mx-auto mb-3 flex w-[85%] justify-end">
            <div className="h-14 w-[30%] rounded-sm border border-zinc-500 bg-zinc-600 shadow-inner" />
          </div>

          {/* Keyboard rows */}
          <div className="mx-auto w-[85%] space-y-0.5">
            {[
              [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
              [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5],
              [1.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.2],
              [2.4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.8],
            ].map((row, ri) => (
              <div key={ri} className="flex gap-[3px]">
                {row.map((w, ki) => (
                  <div
                    key={ki}
                    className="rounded-[2px] bg-zinc-500"
                    style={{
                      height: `${ri === 3 ? 22 : 20}px`,
                      flex: w,
                      opacity: 0.25 + (ri === 2 ? 0.08 : 0),
                      marginRight: ki === 6 && ri < 2 ? "6px" : "0",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom shadow */}
        <div
          className="mx-auto mt-1 h-4 w-3/5 rounded-full bg-black/15 blur-md"
          style={{
            opacity: open ? 1 : 0,
            transition: "opacity 0.8s ease-out",
            transitionDelay: open ? "0.6s" : "0s",
          }}
        />
      </div>
    </div>
  );
}
