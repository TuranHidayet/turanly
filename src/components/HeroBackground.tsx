"use client";

const snippets = [
  "const app = express()", "function App() {", '<div className="hero">',
  "npm run dev", 'git commit -m "init"', 'import React from "react"',
  "app.listen(3000)", "export default App", "const [state, setState]",
  "useEffect(() => {", "php artisan serve", 'Route::get("/"',
  "public function index()", "$request->validate()", "composer install",
  "git push origin main", "body { margin: 0 }", "try {",
  'console.log("hello")', "--primary: #2563eb", "padding: 2rem",
  "flex: 1", "transition: all 0.3s", "grid-template-columns",
  "background: #0f172a", "middleware(['auth'])", "async function load()",
  "return response()->json", "fetch('/api/data')", "if (error) throw",
  "setTimeout(() => {", "addEventListener('click'", "e.preventDefault()",
  "dispatch({ type: 'SET'", "SELECT * FROM users", "INSERT INTO posts",
  "class UserController", "@media (max-width: 768px)", "z-index: 10",
];

const colors = [
  "text-blue-400", "text-emerald-400", "text-purple-400", "text-cyan-400",
  "text-amber-400", "text-rose-400", "text-lime-400", "text-indigo-400",
];

const directions = ["fall", "drift-left", "drift-right", "rise"] as const;

function randomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    text: randomItem(snippets),
    color: randomItem(colors),
    direction: randomItem(directions),
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 12 + Math.random() * 20,
    delay: Math.random() * 20,
    fontSize: 10 + Math.random() * 4,
    opacity: 0.06 + Math.random() * 0.08,
  }));
}

const particles = generateParticles(50);

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute whitespace-nowrap font-mono ${p.color}`}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            fontSize: `${p.fontSize}px`,
            opacity: p.opacity,
            animation: `${p.direction} ${p.duration}s ${p.delay}s infinite linear`,
          }}
        >
          {p.text}
        </span>
      ))}
    </div>
  );
}
