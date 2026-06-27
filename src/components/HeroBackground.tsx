"use client";

const stars = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  size: 1 + Math.random() * 4,
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: 2 + Math.random() * 4,
  delay: Math.random() * 8,
  opacity: 0.5 + Math.random() * 0.5,
}));

const codeDrifts = [
  "const", "function", "return", "import", "export",
  "class", "await", "async", "fetch", "Route",
  "public", "private", "static", "throw", "catch",
  "const x =", "fn()", "<div>", "{}", "[]",
  "=>", "git", "npm i", "php", "sql", "api",
];

const driftingCode = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  text: codeDrifts[i % codeDrifts.length],
  top: Math.random() * 100,
  delay: Math.random() * 20,
  duration: 12 + Math.random() * 16,
  fromRight: Math.random() > 0.5,
  opacity: 0.2 + Math.random() * 0.25,
}));

const techWords = [
  "JS", "TS", "PHP", "SQL", "API", "UI", "UX", "CSS", "HTML",
  "Git", "npm", "web", ".py", ".js", "[]", "{}", "=>", "</>"
];

const shootingStars = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  top: 5 + Math.random() * 50,
  delay: 3 + Math.random() * 12,
}));

const orbitItems = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  size: 2 + Math.random() * 5,
  duration: 12 + Math.random() * 18,
  delay: Math.random() * 12,
  opacity: 0.3 + Math.random() * 0.4,
}));

export function HeroBackground() {
  return (
    <>
      <style>{`
        @keyframes hb-twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes hb-shoot {
          0% { transform: translateX(0) translateY(0); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateX(-600px) translateY(600px); opacity: 0; }
        }
        @keyframes hb-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }
        @keyframes hb-orbit {
          0% { transform: rotate(0deg) translateX(180px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(180px) rotate(-360deg); }
        }
        @keyframes hb-drift-right {
          0% { transform: translateX(-120vw) translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(120vw) translateY(-20px); opacity: 0; }
        }
        @keyframes hb-drift-left {
          0% { transform: translateX(120vw) translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(-120vw) translateY(20px); opacity: 0; }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden">
        {/* Stars */}
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-primary"
            style={{
              width: s.size,
              height: s.size,
              left: `${s.left}%`,
              top: `${s.top}%`,
              opacity: s.opacity,
              animation: `hb-twinkle ${s.duration}s ${s.delay}s infinite`,
            }}
          />
        ))}

        {/* Drifting code lines */}
        {driftingCode.map((d) => (
          <span
            key={d.id}
            className="absolute font-mono text-xs font-semibold text-primary/30 dark:text-primary/40"
            style={{
              top: `${d.top}%`,
              animation: `${d.fromRight ? "hb-drift-left" : "hb-drift-right"} ${d.duration}s ${d.delay}s infinite linear`,
              opacity: d.opacity,
            }}
          >
            {d.text}
          </span>
        ))}

        {/* Shooting stars */}
        {shootingStars.map((s) => (
          <div
            key={s.id}
            className="absolute h-px w-28 bg-gradient-to-l from-primary/90 to-transparent"
            style={{
              right: 0,
              top: `${s.top}%`,
              animation: `hb-shoot 2s ${s.delay}s infinite`,
            }}
          />
        ))}

        {/* Tech words floating */}
        {techWords.map((word, i) => (
          <span
            key={i}
            className="absolute font-mono text-sm font-bold text-accent/30 dark:text-accent/40"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              animation: `hb-float ${6 + Math.random() * 10}s ${Math.random() * 8}s infinite ease-in-out`,
            }}
          >
            {word}
          </span>
        ))}

        {/* Orbiting particles */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {orbitItems.map((o) => (
            <div
              key={o.id}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                animation: `hb-orbit ${o.duration}s ${o.delay}s infinite linear`,
              }}
            >
              <div
                className="rounded-full bg-accent"
                style={{
                  width: o.size,
                  height: o.size,
                  opacity: o.opacity,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
