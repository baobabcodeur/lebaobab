import React, { useState } from "react";
import "./todo.scss";
import GroupTodo from "../../../components/in/groupTodo/GroupTodo";
// Assurez-vous que le chemin est correct

interface Group {
  id: number;
  title: string;
}

export const Todo = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [newGroupTitle, setNewGroupTitle] = useState("");

  const handleAddGroup = () => {
    if (newGroupTitle.trim()) {
      setGroups([
        ...groups,
        { id: Date.now(), title: newGroupTitle }
      ]);
      setNewGroupTitle("");
    }
  };

  return (
    <div className="todo">
      <div>
        <h1>Tableau de Tâches</h1>

      <div className="add-group">
        <input
          type="text"
          placeholder="Nom du nouveau groupe"
          value={newGroupTitle}
          onChange={(e) => setNewGroupTitle(e.target.value)}
        />
        <button onClick={handleAddGroup}>Ajouter Groupe</button>
      </div>
      </div>
      

      <div className="group-list">
        {groups.map(group => (
          <GroupTodo key={group.id} title={group.title} />
        ))}
      </div>
    </div>
  );
};

export default Todo;
