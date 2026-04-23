import { useState } from "react";

export default function TodoInput({ addTask }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    addTask(trimmed);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-800 placeholder-zinc-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent transition-all duration-200"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-md shadow-zinc-200 transition-all duration-200 cursor-pointer"
      >
        Add
      </button>
    </form>
  );
}
