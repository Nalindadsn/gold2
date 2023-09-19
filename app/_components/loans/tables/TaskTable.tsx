import React from "react";
let n=1;
const TaskTable = (props:any) => (
  <>

{props.tasks.length > 0 ? (
        props.tasks.map((task:any) => (
          <div key ={n++}>


          <div className="flex w-full flex-col md:flex-row  p-1 border-b   rounded-lg shadow-sm  mb-1 border">
              
            
            
            <div className="flex-2 px-1 w-full">
            <div className="ml-2 text-sm">
                                <span >
            <span className="font-bold">{task?.name}</span> &nbsp;
                                  <span className="  bg-orange-300 rounded-sm px-2 mr-3">
                                KARAT : {task.karat}
                              </span>
                                  {task?.status == "NOT ISSUE" ? (
                                    <span className="bg-green-700 text-blue-100 py-0 px-2 rounded-full text-sm ">
                                      {task?.status}
                                    </span>
                                  ) : (
                                    <span className="bg-red-600 text-blue-100 py-0 px-2 rounded-full text-sm ">
                                      {task?.status}
                                    </span>
                                  )}
                                </span>
                                <br />
                                <div>
                                  
          <div className="flex w-full flex-col md:flex-row -mx-1 pt-2 border-b md:border-b-0">
            <div  className="bg-white text-gray-800 px-1 text-xs rounded-sm  mr-1 mb-1 md:mb-0 ">TOTAL WEIGHT - {task?.total_weight}</div>
            <div  className="bg-white text-gray-800 px-1 text-xs rounded-sm  mr-1 mb-1 md:mb-0 ">NET WEIGHT - {task?.net_weight}</div>
            <div  className="bg-white text-gray-800 px-1 text-xs rounded-sm  mr-1 mb-1 md:mb-0 ">POUNDS - {task?.pound}</div>
          </div>
                                </div>
                              </div>
            </div>
            <div className="px-1 text-right">
            <button
                className="btn btn-sm btn-warning  mr-2 mt-1"
                onClick={() => {
                  props.editRow(task);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger  mr-2 mt-1"
                onClick={() => props.deleteTask(task.id)}
              >
                Delete
              </button>
              </div>
          </div>
          
                      </div>
  
  ))
  ) : (
    <div>
      <div className="text-center" >No Items Found</div>
    </div>
  )}

 
  </>
);

export default TaskTable;
