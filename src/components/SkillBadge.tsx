const LEVEL_STRENGTH: Record<string, number> = {
  intermediate: 1,
  advanced: 2,
  expert: 3,
};

interface SkillBadgeProps {
  name: string;
  level?: string;
}

export function SkillBadge({ name, level }: SkillBadgeProps) {
  const strength = level ? LEVEL_STRENGTH[level] ?? 0 : 0;

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 px-4 py-3 dark:border-zinc-800">
      <span className="text-sm font-medium">{name}</span>
      {strength > 0 && (
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((dot) => (
            <span
              key={dot}
              className={`h-1.5 w-1.5 rounded-full ${
                dot <= strength ? "bg-primary" : "bg-zinc-200 dark:bg-zinc-700"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
