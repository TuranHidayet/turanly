interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <div className="card group flex h-full flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-50 dark:hover:bg-zinc-800">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white dark:bg-primary/20 dark:group-hover:bg-primary">
        {icon}
      </div>
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      <p className="flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  );
}
