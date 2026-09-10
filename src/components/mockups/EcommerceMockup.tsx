"use client";

import { useOnScreen } from "./useOnScreen";

export function EcommerceMockup() {
  const [ref, visible] = useOnScreen(0.2);

  return (
    <div
      ref={ref}
      className={`mx-auto w-full max-w-[340px] transition-all duration-[1200ms] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
    >
      <style>{`
        @keyframes mockup-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes mockup-slide-in {
          from { transform: translateX(-60px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes mockup-progress {
          from { width: 0%; }
        }
      `}</style>
      <div className="card p-8">
        {/* Header with cart icon */}
        <div className="mb-6 flex items-center justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"
            style={{ animation: "mockup-bounce 3s ease-in-out infinite" }}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-500">$1,284</div>
            <div className="text-xs text-zinc-400">Today&apos;s Revenue</div>
          </div>
        </div>

        {/* Order items */}
        <div className="space-y-3">
          {[
            { name: "Wireless Headphones", price: "$49", color: "bg-blue-100 dark:bg-blue-900/20" },
            { name: "Leather Backpack", price: "$89", color: "bg-purple-100 dark:bg-purple-900/20" },
            { name: "Coffee Mug Set", price: "$24", color: "bg-amber-100 dark:bg-amber-900/20" },
            { name: "USB-C Hub", price: "$35", color: "bg-emerald-100 dark:bg-emerald-900/20" },
          ].map((item, i) => (
            <div
              key={item.name}
              className="flex items-center gap-3 rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50"
              style={{
                animation: visible ? `mockup-slide-in 0.6s ease-out ${i * 0.15}s both` : "none",
              }}
            >
              <div className={`h-10 w-10 rounded-xl ${item.color}`} />
              <div className="flex-1">
                <div className="text-sm font-medium text-zinc-700 dark:text-zinc-200">{item.name}</div>
                <div className="text-xs text-zinc-400">Qty: {i + 1}</div>
              </div>
              <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">{item.price}</span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-5 rounded-lg bg-amber-50 p-3 dark:bg-amber-900/10">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-amber-600 dark:text-amber-400">Free Shipping</span>
            <span className="text-amber-600 dark:text-amber-400">$12 away</span>
          </div>
          <div className="overflow-hidden rounded-full bg-amber-200 dark:bg-amber-900/30">
            <div
              className="h-2 rounded-full bg-amber-500 transition-all duration-[1500ms] ease-out"
              style={{ width: visible ? "70%" : "0%", transitionDelay: "0.8s" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
