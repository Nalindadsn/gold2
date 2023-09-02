"use client"
import React, { useState } from "react";
import TaskTable from "./tables/TaskTable";
import EditTaskForm from "./forms/EditTaskForm";

const App = () => {
  const tasksData:any[] = [];
  const initialFormState = { id: null, name: "", karat: "", net_weight: "", total_weight: "", pound: "" };

  const [tasks, setTasks] = useState(tasksData);
  const [editing, setEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(initialFormState);

  const addTask = (task:any) => {
    task.id = tasks.length + 1;
    setTasks([...tasks, task]);
      console.log(task)
  };

  const deleteTask = (id:any) => {
    setEditing(false);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editRow = (task:any) => {
    setEditing(true);

    setCurrentTask(task);
  };

  const updateTask = (id:any, updatedTask:any) => {
    setEditing(false);
    setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
  };

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          <div>
            <h2>{editing ? "Edit task" : "Add task"}</h2>
            <EditTaskForm
              editing={editing}
              setEditing={setEditing}
              currentTask={currentTask}
              setCurrentTask={setCurrentTask}
              updateTask={updateTask}
              addTask={addTask}
            />
          </div>
        </div>
        <div className="flex-large">
          <TaskTable tasks={tasks} editRow={editRow} deleteTask={deleteTask} />
        </div>
      </div>
    </div>
  );
};

export default App;
