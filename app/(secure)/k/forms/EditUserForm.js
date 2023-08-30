import React, { useState, useEffect } from "react";

const EditUserForm = props => {
  const initialFormState = { id: null, name: "", karat: "",net_weight:"",total_weight:"",pound:"" };
  const [task, setUser] = useState(
    props.editing ? props.currentUser : initialFormState
  );

  const handleInputChange = event => {
    const { name, value } = event.target;

    setUser({ ...task, [name]: value });
  };

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  const resetAddUser = () => {
    props.setEditing(false);
    setUser(initialFormState);
    props.setCurrentUser(initialFormState);
  };

  return (
    <form
      onSubmit={event => {

        event.preventDefault();
        console.log(task.name,task.karat,task.net_weight,task.total_weight,task.pound)
        if (!task.name || !task.karat || !task.net_weight || !task.total_weight || !task.pound) return;

        props.editing ? props.updateUser(task.id, task) : props.addUser(task);
        resetAddUser();
      }}
    >
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={task.name}
        onChange={handleInputChange}
      />
      <label>Karat</label>
      <input
        type="text"
        name="karat"
        value={task.karat}
        onChange={handleInputChange}
      />
      <label>Net Weight</label>
      <input
        type="text"
        name="net_weight"
        value={task.net_weight}
        onChange={handleInputChange}
      />
      <label>Total Weight</label>
      <input
        type="text"
        name="total_weight"
        value={task.total_weight}
        onChange={handleInputChange}
      />
      <label>Pound</label>
      <input
        type="text"
        name="pound"
        value={task.pound}
        onChange={handleInputChange}
      />
      <button>{props.editing ? "Update task" : "Add task"}</button>
      {props.editing && (
        <button onClick={resetAddUser} className="button muted-button">
          Cancel
        </button>
      )}
    </form>
  );
};

export default EditUserForm;
