import TodoItem from "./TodoItem";
import EmptyState from "./EmptyState";

export default function TodoList({ tasks, toggleTask, deleteTask, editTask, filter }) {
  if (tasks.length === 0) {
    return <EmptyState filter={filter} />;
  }

  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </ul>
  );
}
