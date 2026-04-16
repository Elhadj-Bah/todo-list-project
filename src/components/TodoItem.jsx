import { useState } from "react";

export default function TodoItem({ task, toggleTask, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== task.text) {
      editTask(task.id, trimmed);
    } else {
      setEditText(task.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleEdit();
    if (e.key === "Escape") {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <li className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-zinc-100 hover:border-zinc-300 hover:shadow-sm transition-all duration-200">
      {/* Checkbox */}
      <button
        onClick={() => toggleTask(task.id)}
        className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
          task.completed
            ? "bg-zinc-700 border-zinc-700"
            : "border-zinc-300 hover:border-zinc-500"
        }`}
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
      >
        {task.completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Text / Edit input */}
      {isEditing ? (
        <input
          autoFocus
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyDown}
          className="flex-1 text-sm font-medium bg-transparent border-b border-zinc-400 focus:outline-none text-zinc-800 py-0.5"
        />
      ) : (
        <span
          onDoubleClick={() => !task.completed && setIsEditing(true)}
          className={`flex-1 text-sm font-medium select-none transition-all duration-200 ${
            task.completed
              ? "line-through text-zinc-300"
              : "text-zinc-700 cursor-text"
          }`}
          title={!task.completed ? "Double-click to edit" : undefined}
        >
          {task.text}
        </span>
      )}

      {/* Priority badge */}
      {task.priority && !task.completed && (
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            task.priority === "high"
              ? "bg-zinc-800 text-zinc-100"
              : task.priority === "medium"
              ? "bg-zinc-500 text-zinc-100"
              : "bg-zinc-200 text-zinc-600"
          }`}
        >
          {task.priority}
        </span>
      )}

      {/* Action buttons */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        {!task.completed && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 rounded-lg text-zinc-300 hover:text-zinc-700 hover:bg-zinc-100 transition-all duration-150 cursor-pointer"
            aria-label="Edit task"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        )}
        <button
          onClick={() => deleteTask(task.id)}
          className="p-1.5 rounded-lg text-zinc-300 hover:text-zinc-700 hover:bg-zinc-100 transition-all duration-150 cursor-pointer"
          aria-label="Delete task"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </li>
  );
}
