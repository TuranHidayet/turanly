interface TimelineItemProps {
  role: string;
  company: string;
  period: string;
  description: string;
  location: string;
}

export function TimelineItem({ role, company, period, description, location }: TimelineItemProps) {
  return (
    <div className="relative pl-8 pb-8 border-l-2 border-zinc-200 dark:border-zinc-800 last:pb-0">
      <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-primary bg-white dark:bg-zinc-950" />

      <div className="mb-1 flex flex-wrap items-center gap-2 text-sm">
        <span className="font-medium">{role}</span>
        <span className="text-zinc-400">—</span>
        <span className="text-zinc-500">{company}</span>
      </div>

      <p className="mb-2 text-xs text-zinc-400">{period} · {location}</p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  );
}
