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
  duration: 1.5 + Math.random() * 1.5,
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
            animation: `twinkle ${p.duration}s ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((s) => (
        <div
          key={s.id}
          className="absolute h-px w-20 bg-gradient-to-l from-primary/80 to-transparent"
          style={{
            right: 0,
            top: `${s.top}%`,
            animation: `shooting-star ${s.duration}s ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* Tech words floating */}
      <div className="absolute inset-0">
        {techWords.map((word, i) => (
          <span
            key={i}
            className="absolute font-mono text-xs font-bold text-primary/10 dark:text-primary/15"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              animation: `float-hover ${8 + Math.random() * 12}s ${Math.random() * 10}s infinite ease-in-out`,
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Orbiting particles */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {orbitItems.map((o) => (
          <div
            key={o.id}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              animation: `orbit ${o.duration}s ${o.delay}s infinite linear`,
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
  );
}
