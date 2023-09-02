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
  const [id, setID] = useState(null);
  const [name, setItmName] = useState("");
  const [karat, setKarat] = useState("");
  const [net_weight2, setNet_weight2] = useState("");
  const [total_weight, setTotal_weight] = useState("");
  const [pound, setPound] = useState("0");
  const [status, setStatus] = useState("NOT ISSUE");


  const [poundVal,setPoundVal]=useState("")
  const [task, setTask] = useState(
    props.editing ? props.currentTask : {
      id: null,
      name: "",
      karat: "",
      net_weight: "",
      total_weight: "",
      pound: "",
      status: "",
    }
  );

  const handleInputChange = (event: any) => {
    let { name, value } = event.target;
let a:any=(value/8).toFixed(4)
if(name=="net_weight"){
  setNet_weight2(a)
  
}
console.log(name,"-",value)
    // setNet_weight2(net_weight)
    setTask({ ...task, [name]: value });
    console.log(task)
    
    
console.log(name,"-",value)
  };

  useEffect(() => {
    setTask(props.currentTask);
  }, [props]);

  const resetAddTask = () => {
    props.setEditing(false);
    setTask({
      id: null,
      name: "",
      karat: "",
      net_weight: "",
      total_weight: "",
      pound: "",
      status: "",
    });
    props.setCurrentTask({
      id: null,
      name: "",
      karat: "",
      net_weight: "",
      total_weight: "",
      pound: "",
      status: "",
    });
    
  setNet_weight2("0")
  };


  const total_pounds = props.tasks.reduce(function (acc: any, obj: any) {
    return (
      acc + (parseFloat(obj.net_weight) ? parseFloat(obj.net_weight) : 0) / 8
    );
  }, 0);
  const itm_total_net = props.tasks.reduce(function (acc: any, obj: any) {
    return acc + (parseFloat(obj.net_weight) ? parseFloat(obj.net_weight) : 0);
  }, 0);
  const itm_total_weight = props.tasks.reduce(function (acc: any, obj: any) {
    return (
      acc + (parseFloat(obj.total_weight) ? parseFloat(obj.total_weight) : 0) 
    );
  }, 0);

  return (
    <>
    
    <div className="flex flex-col md:flex-row -mx-1 py-2 border-b">
            <div className="px-1">
             
            </div>
            <div className="px-1  text-right">
              Total Weight : {itm_total_weight.toFixed(4)}
            </div>
            <div className="px-1  text-right">
              Net Weight : {itm_total_net.toFixed(4)}
            </div>
            <div className="px-1  text-right">
              total pound : {total_pounds.toFixed(4)}
            </div>
          </div>
      <form className="bg-white"
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
                  
<div className="relative">
    <input type="text" id="floating_outlined" 
    className="block px-3 pb-0.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
    name="name"
    value={task.name}
    onChange={handleInputChange}/>
    <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Description</label>
</div>


                </div>
                <div className="flex-1 px-1">
                  
                         
<div className="relative">
    <input type="text" id="floating_outlined" 
    className="block px-3 pb-0.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
    
    name="karat"
    value={task.karat}
    onChange={handleInputChange}/>
    <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
      Karat</label>
</div>

                </div>
                <div className="flex-1 px-1">
                 
                       
<div className="relative">
    <input type="text" id="floating_outlined" 
    className="block px-3 pb-0.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
    
    name="net_weight"
    value={task.net_weight}
    onChange={handleInputChange}/>
    <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
      Net Weight</label>
</div>
    
                </div>
                <div className="flex-1 px-1">
                
                               
<div className="relative">
    <input type="text" id="floating_outlined" 
    className="block px-3 pb-0.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
    
    name="total_weight"
    value={task.total_weight}
    onChange={handleInputChange}/>
    <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
      Total Weight</label>
</div>
                </div>
                <div className="flex-1 px-1">
               

                               
<div className="relative">
    <input type="text" id="floating_outlined" 
    className="block px-3 pb-0.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " 
    
    name="pound"
    value={net_weight2}
    onChange={handleInputChange}/>
    <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
      Pounds</label>
</div>
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
