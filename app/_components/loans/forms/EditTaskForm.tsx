import React, { useState, useEffect } from "react";

const EditTaskForm = (props:any) => {
  const initialFormState = { id: null, name: "", karat: "",net_weight:"",total_weight:"",pound:"",status:"" };
  const [task, setTask] = useState(
    props.editing ? props.currentTask : initialFormState
  );

  const handleInputChange = (event:any) => {
    const { name, value } = event.target;

    setTask({ ...task, [name]: value });
  };

  useEffect(() => {
    setTask(props.currentTask);
  }, [props]);

  const resetAddTask = () => {
    props.setEditing(false);
    setTask(initialFormState);
    props.setCurrentTask(initialFormState);
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (!task.name || !task.karat) return;
        props.editing ? props.updateTask(task.id, task) : props.addTask(task);
        resetAddTask();
      }}
    >
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={task.name}
        onChange={handleInputChange}
      />
      <label>Taskname</label>
      <input
        type="text"
        name="karat"
        value={task.karat}
        onChange={handleInputChange}
      />
      <label>net weight</label>
      <input
        type="text"
        name="net_weight"
        value={task.net_weight}
        onChange={handleInputChange}
      />
      <label>total weight</label>
      <input
        type="text"
        name="total_weight"
        value={task.total_weight}
        onChange={handleInputChange}
      />
      <label>pound</label>
      <input
        type="text"
        name="pound"
        value={task.pound}
        onChange={handleInputChange}
      />
      <label>status</label>
      <input
        type="text"
        name="status"
        value={task.status}
        onChange={handleInputChange}
      />
      <button>{props.editing ? "Update task" : "Add task"}</button>
      {props.editing && (
        <button onClick={resetAddTask} className="button muted-button">
          Cancel
        </button>
      )}
    </form>
  );
};

export default EditTaskForm;
