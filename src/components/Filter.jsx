const filters = [
  { value: "all", label: "All" },
  { value: "pending", label: "Active" },
  { value: "completed", label: "Done" },
];

export default function Filter({ filter, setFilter, counts }) {
  return (
    <div className="flex gap-1 mb-5 p-1 bg-zinc-100 rounded-xl">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
            filter === value
              ? "bg-white text-zinc-800 shadow-sm shadow-zinc-200"
              : "text-zinc-400 hover:text-zinc-600"
          }`}
        >
          {label}
          <span
            className={`text-xs font-bold px-1.5 py-0.5 rounded-full transition-colors duration-200 ${
              filter === value
                ? "bg-zinc-100 text-zinc-700"
                : "bg-zinc-200 text-zinc-400"
            }`}
          >
            {counts[value]}
          </span>
        </button>
      ))}
    </div>
  );
}
