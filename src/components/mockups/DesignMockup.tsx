"use client";

import { useOnScreen } from "./useOnScreen";

function PaletteSwatch({ color, delay }: { color: string; delay: number }) {
  return (
    <div
      className="h-12 w-full rounded-lg transition-all duration-500"
      style={{
        backgroundColor: color,
        animation: `mockup-pulse 4s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

export function DesignMockup() {
  const [ref, visible] = useOnScreen(0.2);
  const colors = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#06b6d4"];

  return (
    <div
      ref={ref}
      className={`mx-auto w-full max-w-[360px] transition-all duration-[1200ms] ${
        visible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
      }`}
    >
      <style>{`
        @keyframes mockup-pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 1; }
        }
      `}</style>
      <div className="card flex flex-col gap-3 p-8">
        {/* Window dots */}
        <div className="mb-3 flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>

        {/* Toolbar mockup */}
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
            </svg>
          </div>
          <div className="flex flex-wrap gap-2">
            {["A", "T", "S", "C", "B"].map((letter) => (
              <div
                key={letter}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-xs font-bold text-zinc-400 dark:bg-zinc-800"
              >
                {letter}
              </div>
            ))}
          </div>
        </div>

        {/* Color palette grid */}
        <div className="grid grid-cols-3 gap-3">
          {colors.map((c, i) => (
            <PaletteSwatch key={c} color={c} delay={i * 0.4} />
          ))}
        </div>

        {/* Loading bars */}
        <div className="mt-2 flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-2 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-700"
              style={{
                animation: `mockup-pulse 3s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
