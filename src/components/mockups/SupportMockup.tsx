"use client";

import { useOnScreen } from "./useOnScreen";

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
