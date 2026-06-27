"use client";

const particles = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  size: 1 + Math.random() * 3,
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: 3 + Math.random() * 5,
  delay: Math.random() * 10,
  opacity: 0.3 + Math.random() * 0.7,
}));

const techWords = [
  "JS", "TS", "PHP", "SQL", "API", "UI", "UX", "CSS", "HTML",
  "Git", "npm", "web", ".py", ".js", "[]", "{}", "=>", "</>"
];

const shootingStars = Array.from({ length: 3 }, (_, i) => ({
  id: i,
  top: Math.random() * 50,
  delay: 5 + Math.random() * 15,
}));

const orbitItems = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  size: 2 + Math.random() * 4,
  duration: 15 + Math.random() * 20,
  delay: Math.random() * 15,
  opacity: 0.2 + Math.random() * 0.3,
}));

export function HeroBackground() {
  return (
    <>
      <style>{`
        @keyframes hb-twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes hb-shoot {
          0% { transform: translateX(0) translateY(0); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateX(-500px) translateY(500px); opacity: 0; }
        }
        @keyframes hb-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        @keyframes hb-orbit {
          0% { transform: rotate(0deg) translateX(180px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(180px) rotate(-360deg); }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden">
        {/* Stars */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-primary"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              top: `${p.top}%`,
              opacity: p.opacity,
              animation: `hb-twinkle ${p.duration}s ${p.delay}s infinite`,
            }}
          />
        ))}

        {/* Shooting stars */}
        {shootingStars.map((s) => (
          <div
            key={s.id}
            className="absolute h-px w-24 bg-gradient-to-l from-primary/80 to-transparent"
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
            className="absolute font-mono text-xs font-bold text-primary/20 dark:text-primary/25"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              animation: `hb-float ${8 + Math.random() * 12}s ${Math.random() * 10}s infinite ease-in-out`,
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
