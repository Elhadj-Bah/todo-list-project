import React, { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function handleAddTask() {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  }

  return (
    <>
      <h1>Bah's Tasks list</h1>
      <input
        type="text"
        placeholder="Enter your Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add to do</button>

      <ul>
        {tasks.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
