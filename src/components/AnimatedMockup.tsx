"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function useOnScreen(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible] as const;
}

function SlideShow({ images, interval = 4000 }: { images: string[]; interval?: number }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [images.length, interval]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-zinc-900">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          className={`object-cover transition-opacity duration-1000 ${i === idx ? "opacity-100" : "opacity-0"}`}
          sizes="(max-width: 768px) 100vw, 500px"
        />
      ))}
    </div>
  );
}

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

export function SupportMockup() {
  const [ref, visible] = useOnScreen(0.2);

  return (
    <div
      ref={ref}
      className={`mx-auto w-full max-w-[320px] transition-all duration-[1200ms] ${
        visible ? "scale-100 opacity-100" : "scale-[0.6] opacity-0"
      }`}
    >
      <style>{`
        @keyframes mockup-spin-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes mockup-spin-ccw { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes mockup-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes mockup-wrench {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
      `}</style>
      <div className="card flex items-center justify-center p-10">
        <svg viewBox="0 0 240 240" className="h-56 w-56">
          {/* Outer large gear */}
          <g style={{ animation: "mockup-spin-cw 8s linear infinite", transformOrigin: "120px 120px" }}>
            <circle
              cx="120" cy="120" r="65"
              fill="none"
              stroke="currentColor"
              className="text-primary"
              strokeWidth="10"
              strokeDasharray="28 12"
              opacity={0.25}
            />
            <circle
              cx="120" cy="120" r="55"
              fill="none"
              stroke="currentColor"
              className="text-primary"
              strokeWidth="6"
              strokeDasharray="18 8"
              opacity={0.3}
            />
          </g>

          {/* Middle gear - counter clockwise */}
          <g style={{ animation: "mockup-spin-ccw 6s linear infinite", transformOrigin: "120px 120px" }}>
            <circle
              cx="120" cy="120" r="38"
              fill="none"
              stroke="currentColor"
              className="text-accent"
              strokeWidth="8"
              strokeDasharray="22 10"
              opacity={0.5}
            />
          </g>

          {/* Inner gear */}
          <g style={{ animation: "mockup-spin-cw 4s linear infinite", transformOrigin: "120px 120px" }}>
            <circle
              cx="120" cy="120" r="20"
              fill="none"
              stroke="currentColor"
              className="text-primary"
              strokeWidth="5"
              strokeDasharray="12 6"
              opacity={0.6}
            />
          </g>

          {/* Center dot */}
          <circle cx="120" cy="120" r="5" fill="currentColor" className="text-primary" opacity={0.7} />

          {/* Data lines on the side */}
          <g className="text-zinc-400" style={{ animation: "mockup-float 4s ease-in-out infinite" }}>
            <rect x="165" y="100" width="45" height="4" rx="2" fill="currentColor" />
            <rect x="175" y="112" width="35" height="4" rx="2" fill="currentColor" opacity={0.6} />
            <rect x="170" y="124" width="40" height="4" rx="2" fill="currentColor" opacity={0.4} />
            <rect x="180" y="136" width="30" height="4" rx="2" fill="currentColor" opacity={0.3} />
          </g>

          {/* Wrench icon */}
          <g
            className="text-zinc-500"
            style={{ animation: "mockup-wrench 3s ease-in-out infinite", transformOrigin: "60px 140px" }}
          >
            <rect x="35" y="130" width="8" height="40" rx="3" fill="currentColor" />
            <rect x="28" y="120" width="22" height="14" rx="4" fill="currentColor" />
          </g>
        </svg>
      </div>
    </div>
  );
}

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
