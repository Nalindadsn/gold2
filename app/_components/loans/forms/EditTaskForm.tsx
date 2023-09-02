import React, { useState, useEffect } from "react";

const EditTaskForm = (props: any) => {
  const initialFormState = {
    id: null,
    name: "",
    karat: "",
    net_weight: "",
    total_weight: "",
    pound: "",
    status: "",
  };
  const [poundVal,setPoundVal]=useState("")
  const [task, setTask] = useState(
    props.editing ? props.currentTask : initialFormState
  );

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setTask({ ...task, [name]: value });
    console.log(task)
    
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
    <>
    {JSON.stringify(props.tasks)}
      <form className="bg-white p-2 mt-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (!task.name || !task.karat) return;
          props.editing ? props.updateTask(task.id, task) : props.addTask(task);
          resetAddTask();
        }}>
        {/* <div className="flex flex-col md:flex-row -mx-1 py-2 border-b">
  <div className="px-1"></div>
  <div className="px-1  text-right">Total Weight : 2.4975</div>
  <div className="px-1  text-right">Net Weight : 19.9800</div>
  <div className="px-1  text-right">total pound : 2.4975</div>
  </div> */}
        <div className="flex flex-wrap -mx-3 " key={task.id}>
          <div className="w-full md:w-full px-3 mb-2 mt-2">
            {/* <h2 className=" text-gray-800 text-lg">
              items
              <span className="bg-dark ml-2 text-blue-100 py-0 px-2 rounded-full text-sm ">
                NO OF ITEMS : 1
              </span>
            </h2> */}
            <div>
              <div className="flex  flex-col md:flex-row -mx-1 py-2 border-b">
                <div className="flex-1 px-1">
                  <input
                    className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    placeholder="Description"
                    type="text"
                    name="name"
                    value={task.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex-1 px-1">
                  <input
                    className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    placeholder="Karat"
                    type="text"
                    name="karat"
                    value={task.karat}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex-1 px-1">
                  <input
                    className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    placeholder="Net Weight"
                    type="text"
                    name="net_weight"
                    value={task.net_weight}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex-1 px-1">
                  <input
                    className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    placeholder="Total Weight"
                    type="text"
                    name="total_weight"
                    value={task.total_weight}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex-1 px-1">
                  <input
                    className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    placeholder="Pounds"
                    type="text"
                    name="pound"
                    value={task.pound}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex-1 px-1">
                  <select
                    name="status"
                    value={task.status}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required>
                    <option value="">-CHOOSE-</option>
                    <option>NOT ISSUE</option>
                    <option>ISSUE</option>
                  </select>
                 
                </div>
                
              </div>
              
        <button className="btn btn-primary me-2 mt-1 bg-blue-700">{props.editing ? "Update task" : "Add task"}</button>
        {props.editing && (
          <button onClick={resetAddTask} className="button muted-button">
            Cancel
          </button>
        )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditTaskForm;
