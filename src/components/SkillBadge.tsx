interface SkillBadgeProps {
  name: string;
  level: string;
}

export function SkillBadge({ name, level }: SkillBadgeProps) {
  const levelColors: Record<string, string> = {
    expert: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    advanced: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-zinc-200 px-4 py-3 dark:border-zinc-800">
      <span className="text-sm font-medium">{name}</span>
      <span className={`ml-auto rounded-lg px-2 py-0.5 text-xs font-medium ${levelColors[level] || levelColors.intermediate}`}>
        {level}
      </span>
    </div>
  );
}
