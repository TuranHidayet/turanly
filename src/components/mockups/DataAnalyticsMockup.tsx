"use client";

import { useOnScreen } from "./useOnScreen";

export function DataAnalyticsMockup() {
  const [ref, visible] = useOnScreen(0.2);

  return (
    <div
      ref={ref}
      className={`mx-auto w-full max-w-[380px] transition-all duration-[1200ms] ${
        visible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
      }`}
    >
      <style>{`
        @keyframes mockup-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
      <div className="card p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full bg-green-400"
              style={{ animation: "mockup-glow 2.5s ease-in-out infinite" }}
            />
            <span className="text-sm font-medium text-zinc-500">Live Dashboard</span>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-600"
                style={{ animation: `mockup-glow 2s ease-in-out ${i * 0.3}s infinite` }}
              />
            ))}
          </div>
        </div>

        {/* KPI cards */}
        <div className="mb-5 grid grid-cols-3 gap-3">
          {[
            { label: "Active Users", value: "2,847", color: "text-primary", change: "+12%" },
            { label: "Revenue", value: "$12.4k", color: "text-green-500", change: "+8.3%" },
            { label: "Conv. Rate", value: "3.2%", color: "text-purple-500", change: "+2.1%" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-zinc-50 p-3 transition-all duration-700 dark:bg-zinc-800/50"
              style={{ transitionDelay: "0.3s" }}
            >
              <div className="text-[10px] text-zinc-400">{stat.label}</div>
              <div className={`text-base font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-[10px] text-green-500">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Mini chart bars */}
        <div className="mb-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">Weekly Page Views</span>
            <span className="text-xs font-medium text-primary">+23.5%</span>
          </div>
          <div className="flex items-end justify-between gap-1.5" style={{ height: 60 }}>
            {[40, 55, 35, 70, 50, 80, 65, 90, 75, 85].map((h, i) => (
              <div
                key={i}
                className="w-full rounded-t-sm bg-primary/40 transition-all duration-[1000ms] ease-out"
                style={{
                  height: visible ? `${h}%` : "0%",
                  transitionDelay: `${i * 0.08}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress rows */}
        <div className="space-y-3">
          {[
            { label: "Bounce Rate", pct: 32, color: "bg-green-400" },
            { label: "Avg Session", pct: 65, color: "bg-primary" },
            { label: "Goal Completion", pct: 78, color: "bg-purple-400" },
          ].map((row) => (
            <div key={row.label}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-zinc-500">{row.label}</span>
                <span className="font-medium text-zinc-600 dark:text-zinc-300">{row.pct}%</span>
              </div>
              <div className="overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                <div
                  className={`h-2 rounded-full ${row.color} transition-all duration-[1200ms] ease-out`}
                  style={{
                    width: visible ? `${row.pct}%` : "0%",
                    transitionDelay: "0.5s",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
