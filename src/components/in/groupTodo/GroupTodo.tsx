import React, { useState } from "react";
import "./groupTodo.scss";

interface Task {
  id: number;
  title: string;
  content: string;
}

interface GroupTodoProps {
  title: string;
}

export const GroupTodo: React.FC<GroupTodoProps> = ({ title }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: "", content: "" });

  const handleAddTask = () => {
    if (newTask.title && newTask.content) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now(), ...newTask }
      ]);
      setNewTask({ title: "", content: "" });
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="groupTodo">
      <div className="header">
        <h2>{title}</h2>
        <button className="add-task-button" onClick={handleAddTask}>
          Ajouter Tâche
        </button>
      </div>
      <div className="task-input">
        <input
          type="text"
          placeholder="Titre de la tâche"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Description de la tâche"
          value={newTask.content}
          onChange={(e) => setNewTask({ ...newTask, content: e.target.value })}
        />
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.content}</p>
            <button onClick={() => handleDeleteTask(task.id)}>Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupTodo;
