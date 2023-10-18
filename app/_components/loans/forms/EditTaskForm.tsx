import React, { useState, useEffect } from "react";

const EditTaskForm = (props: any) => {
  const initialFormState = {
    id: null,
    name: "",
    karat: "",
    net_weight: "",
    total_weight: "",
    pound: "",
    per_pound: "",
    status: "",
  };
  const [id, setID] = useState(null);
  const [name, setItmName] = useState("");
  const [karat, setKarat] = useState("");
  const [poundV, setPoundV] = useState("");
  const [total_weight, setTotal_weight] = useState("");
  const [net_weight, setNet_weight] = useState("");
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
      per_pound: "",
      status: "",
    }
  );

  const handleInputChange = (event: any) => {
    let { name, value } = event.target;
let a:any=(value/8).toFixed(4)
if(name=="net_weight"){
  setPoundV(a)
  setNet_weight(value)
}
if(name=="total_weight"){
  setPoundV(a)
  setTotal_weight(value)
}

    // setPoundV(net_weight)
    setTask({ ...task, [name]: value });
    
    
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
      per_pound: "",
      status: "",
    });
    props.setCurrentTask({
      id: null,
      name: "",
      karat: "",
      net_weight: "",
      total_weight: "",
      pound: "",
      per_pound: "",
      status: "",
    });
    
  setPoundV("0")
  setTotal_weight("")
  setNet_weight("")
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
  
  const actual_karat=(gold_percentage:any):any=>{
    let finalGrades = ["24","22","21","20","19","18","17","16","15","14","13","12"];
  if(props.rate?.cmp_rate){
    if(gold_percentage >= 109.09){
      return {karat:"24",value:((props.rate.cmp_rate/22)*24).toFixed(0)}
    } else if(gold_percentage >= 100 && gold_percentage < 109.09) {
      return {karat:"22",value:((props.rate.cmp_rate/22)*22).toFixed(0)}
    }else if(gold_percentage >= 95.45 && gold_percentage < 100) {
      return {karat:"21",value:((props.rate.cmp_rate/22)*21).toFixed(0)}
    } else if(gold_percentage >= 90.91 && gold_percentage < 95.45) {
      return {karat:"20",value:((props.rate.cmp_rate/22)*20).toFixed(0)}
    } else if(gold_percentage >= 86.36 && gold_percentage < 90.91) {
      return {karat:"19",value:((props.rate.cmp_rate/22)*19).toFixed(0)}
    } else if(gold_percentage >= 81.82 && gold_percentage < 86.36) {
      return {karat:"18",value:((props.rate.cmp_rate/22)*18).toFixed(0)}
    } else if(gold_percentage >= 77.27 && gold_percentage < 81.82) {
      return {karat:"17",value:((props.rate.cmp_rate/22)*17).toFixed(0)}
    } else if(gold_percentage >= 72.73 && gold_percentage < 77.27) {
      return {karat:"16",value:((props.rate.cmp_rate/22)*16).toFixed(0)}
    } else if(gold_percentage >= 68.18 && gold_percentage < 72.73) {
      return {karat:"15",value:((props.rate.cmp_rate/22)*15).toFixed(0)}
    } else if(gold_percentage >= 63.64 && gold_percentage < 68.18) {
      return {karat:"14",value:((props.rate.cmp_rate/22)*14).toFixed(0)}
    } else if(gold_percentage >= 59.09 && gold_percentage < 63.64) {
      return {karat:"13",value:((props.rate.cmp_rate/22)*13).toFixed(0)}
    } else if(gold_percentage >= 54.55 && gold_percentage < 59.09) {
      return {karat:"12",value:((props.rate.cmp_rate/22)*12).toFixed(0)}
    } else {
      return {karat:"Less than 12 karat",value:0}
    }
  }else{
    return {karat:"",value:0}
  }
  
  }
  return (
    <>
    
    <div className="flex flex-col md:flex-row  border-b bg-gray-800 text-white">
            <div className="px-1">
             
            </div>
            <div className="px-1  text-right border-1 m-1">
              Total Weight : {itm_total_weight.toFixed(4)}
            </div>
            <div className="px-1  text-right border-1 m-1">
              Net Weight : {itm_total_net.toFixed(4)}
            </div>
            <div className="px-1  text-right  border-1 m-1">
              Total Pound : {total_pounds.toFixed(4)}
            </div>
          </div>
          <div className="flex flex-col md:flex-row px-3 bg-gray-800 text-white">
<div className="w-full"><br/>Items
                    <span className="bg-dark ml-2 text-blue-100 py-0 px-2 rounded-full text-sm border ">
                      NO OF ITEMS : 
                      {props.tasks.length}
                    </span></div>
                    
                <div className="px-1  text-right m-1 border-1">
               <span className=" whitespace-nowrap">Amount per pound </span> <br/> 
               <div className="bg-gray-800 text-white px-2">
                {actual_karat((parseFloat(net_weight)/parseFloat(total_weight))*100).value}
                </div>
                </div>
                <div className="px-1  text-right m-1 border-1">
                Issuable  <br/>
                <div className="bg-gray-800 text-white px-2">
                  {((actual_karat((parseFloat(net_weight)/parseFloat(total_weight))*100).value)*(parseFloat(net_weight) / 8)).toFixed(2)}
                  </div> 
                </div>
                    <div className="text-right whitespace-nowrap border mt-1">
                    <span className={net_weight==total_weight?"bg-gray-800 text-white px-2":"bg-red-500 text-white px-2"}>Actual Karat :  
                    {/* <span className="bg-gray-800 text-white px-2">Actual Karat :   */}
                      {(actual_karat((parseFloat(net_weight)/parseFloat(total_weight))*100)).karat} 
                    </span>
                      
                      
                      <br/>
                      Karat Percentage :
                       {((parseFloat(net_weight)/parseFloat(total_weight))*100).toFixed(2)}%
                    </div>
                    </div>

      <form className="bg-gray-800"
        onSubmit={(event) => {
          event.preventDefault();
          if (!task.name || !task.karat) return;
          props.editing ? props.updateTask(task.id, task) : props.addTask(task);
          resetAddTask();
        }}>
     
        <div className="flex flex-wrap -mx-3 " key={task.id}>
          <div className="w-full md:w-full px-3 mb-2 mt-2 mr-2">
            <div>
              <div className="flex  flex-col md:flex-row -mx-1 py-2 border-b">
                <div className="flex-1 px-1">
                <label className="text-left w-full ml-2 text-sm text-gray-50">Description</label>

                <input
                    className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    placeholder="Description"
                    type="text"name="name"
                    value={task.name}
                    onChange={handleInputChange}
                  />


                </div>
                <div className="flex-1 px-1">
                <label className="text-left w-full ml-2 text-sm text-gray-50">Karat</label>

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
                <label className="text-left w-full ml-2 text-sm text-gray-50">Total Weight</label>

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
                <label className="text-left w-full ml-2 text-sm text-gray-50">Net Weight</label>

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
                <label className="text-left w-full ml-2 text-sm text-gray-50">Pounds</label>

                  <input
                    className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    placeholder="Pounds"
                    type="text"
                    name="pound"
                    value={poundV}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex-1 px-1">
                <label className="text-left w-full ml-2 text-sm text-gray-50">&nbsp;</label>

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
              <div className="border-b border-b-1 border-gray-800"><button className="btn btn-primary me-2 mt-1 bg-blue-700">{props.editing ? "Update task" : "ADD ITEM"}</button>
        {props.editing && (
          <button onClick={resetAddTask} className="button muted-button">
            Cancel
          </button>
        )}</div>
        
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditTaskForm;
