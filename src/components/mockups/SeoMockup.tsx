"use client";

import { useOnScreen } from "./useOnScreen";

export function SeoMockup() {
  const [ref, visible] = useOnScreen(0.2);
  const bars = [30, 55, 42, 78, 60, 92, 70];
  const barColors = ["#94a3b8", "#94a3b8", "#6366f1", "#6366f1", "#6366f1", "#10b981", "#10b981"];

  return (
    <div
      ref={ref}
      className={`mx-auto w-full max-w-[340px] transition-all duration-[1200ms] ${
        visible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
      }`}
    >
      <div className="card p-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">SEO Performance</span>
          </div>
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-600 dark:bg-green-900/30 dark:text-green-400">
            +243%
          </span>
        </div>

        {/* Bar chart */}
        <div className="flex items-end justify-between gap-2" style={{ height: 150 }}>
          {bars.map((h, i) => (
            <div key={i} className="flex w-full flex-col items-center gap-1">
              <div
                className="w-full rounded-t-md transition-all duration-[1200ms] ease-out"
                style={{
                  height: visible ? `${h}%` : "0%",
                  backgroundColor: barColors[i],
                  transitionDelay: `${i * 0.12}s`,
                }}
              />
            </div>
          ))}
        </div>

        {/* X-axis labels */}
        <div className="mt-3 flex justify-between text-[10px] text-zinc-400">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>

        {/* Trend line */}
        <div className="mt-5 flex items-center gap-2 rounded-lg bg-green-50 p-3 dark:bg-green-900/10">
          <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
          </svg>
          <div>
            <div className="text-xs font-medium text-green-600 dark:text-green-400">Organic Traffic</div>
            <div className="text-lg font-bold text-green-700 dark:text-green-300">12,847</div>
          </div>
        </div>
      </div>
    </div>
  );
}
