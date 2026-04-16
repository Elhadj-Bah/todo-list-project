const messages = {
  all: {
    icon: (
      <svg className="w-12 h-12 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: "No tasks yet",
    subtitle: "Add something above to get started.",
  },
  pending: {
    icon: (
      <svg className="w-12 h-12 text-zinc-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "All caught up!",
    subtitle: "No active tasks remaining.",
  },
  completed: {
    icon: (
      <svg className="w-12 h-12 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: "Nothing completed yet",
    subtitle: "Finish a task to see it here.",
  },
};

export default function EmptyState({ filter }) {
  const { icon, title, subtitle } = messages[filter] ?? messages.all;

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      {icon}
      <p className="text-sm font-semibold text-zinc-400">{title}</p>
      <p className="text-xs text-zinc-300">{subtitle}</p>
    </div>
  );
}
