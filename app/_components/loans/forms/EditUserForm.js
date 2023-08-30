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
      <div
    className="flex  flex-col md:flex-row -mx-1 py-2 border-b">
    <div className="px-1  ">

      <label className="ml-2">Name</label>
      <input
        type="text"
        className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        name="name"
        value={task.name}
        onChange={handleInputChange}
      />
    </div>
      <div className="px-1  ">

      <label className="ml-2">Karat</label>
      <input
        type="text"
        className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        name="karat"
        value={task.karat}
        onChange={handleInputChange}
      />
      </div>
      <div className="px-1  ">

      <label className="ml-2">Net Weight</label>
      <input
        type="text"
        className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        name="net_weight"
        value={task.net_weight}
        onChange={handleInputChange}
      />
      </div>
      <div className="px-1  ">

      <label className="ml-2">Total Weight</label>
      <input
        type="text"
        className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        name="total_weight"
        value={task.total_weight}
        onChange={handleInputChange}
      />
      </div>
      <div className="px-1  ">

      <label className="ml-2">Pound</label>
      <input
        type="text"
        className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        name="pound"
        value={task.pound}
        onChange={handleInputChange}
      />
      </div>
      </div>
      <div className="w-full">
        
      <button>{props.editing ? "Update Item" : "Add Item"}</button>
      {props.editing && (
        <button onClick={resetAddUser} className="button muted-button">
          Cancel
        </button>
      )}
      </div>
    </form>
  );
};

export default EditUserForm;
