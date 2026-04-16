import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    setTasks((prev) => [{ id: Date.now(), text, completed: false }, ...prev]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const editTask = (id, newText) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  const completionPct =
    tasks.length === 0 ? 0 : Math.round((counts.completed / tasks.length) * 100);

  return (
    <div className="min-h-screen flex items-start justify-center pt-16 pb-16 px-4" style={{ backgroundColor: "#7DAACB" }}>
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-zinc-800 shadow-lg shadow-zinc-300 mb-4">
            <svg className="w-6 h-6 text-zinc-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-zinc-800 tracking-tight">My Tasks</h1>
          <p className="text-sm text-zinc-400 mt-1">Stay organised, get things done.</p>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-zinc-200 border border-zinc-100 overflow-hidden">

          {/* Progress bar */}
          {tasks.length > 0 && (
            <div className="px-6 pt-5 pb-0">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-zinc-400">Progress</span>
                <span className="text-xs font-bold text-zinc-700">{completionPct}%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-zinc-600 to-zinc-400 rounded-full transition-all duration-500"
                  style={{ width: `${completionPct}%` }}
                />
              </div>
            </div>
          )}

          <div className="p-6">
            <TodoInput addTask={addTask} />
            <Filter filter={filter} setFilter={setFilter} counts={counts} />
            <TodoList
              tasks={filteredTasks}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              editTask={editTask}
              filter={filter}
            />
          </div>

          {/* Footer */}
          {tasks.length > 0 && (
            <div className="px-6 pb-5 flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-medium">
                {counts.pending} task{counts.pending !== 1 ? "s" : ""} left
              </span>
              {counts.completed > 0 && (
                <button
                  onClick={clearCompleted}
                  className="text-xs font-semibold text-zinc-400 hover:text-zinc-700 transition-colors duration-150 cursor-pointer"
                >
                  Clear completed
                </button>
              )}
            </div>
          )}
        </div>

        <p className="text-center text-xs text-zinc-300 mt-6">
          Double-click a task to edit it
        </p>
      </div>
    </div>
  );
}
