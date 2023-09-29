import React from "react";
let n=1;


const actual_karat=(gold_percentage:any,rate:any):any=>{
	let finalGrades = ["24","22","21","20","19","18","17","16","15","14","13","12"];

if(rate?.cmp_rate){
	if(gold_percentage >= 109.09){
    return {karat:"24",value:((rate.cmp_rate/22)*24).toFixed(2)}
	} else if(gold_percentage >= 100 && gold_percentage < 109.09) {
    return {karat:"22",value:((rate.cmp_rate/22)*22).toFixed(2)}
	}else if(gold_percentage >= 95.45 && gold_percentage < 100) {
    return {karat:"21",value:((rate.cmp_rate/22)*21).toFixed(2)}
	} else if(gold_percentage >= 90.91 && gold_percentage < 95.45) {
    return {karat:"20",value:((rate.cmp_rate/22)*20).toFixed(2)}
	} else if(gold_percentage >= 86.36 && gold_percentage < 90.91) {
    return {karat:"19",value:((rate.cmp_rate/22)*19).toFixed(2)}
	} else if(gold_percentage >= 81.82 && gold_percentage < 86.36) {
    return {karat:"18",value:((rate.cmp_rate/22)*18).toFixed(2)}
	} else if(gold_percentage >= 77.27 && gold_percentage < 81.82) {
    return {karat:"17",value:((rate.cmp_rate/22)*17).toFixed(2)}
	} else if(gold_percentage >= 72.73 && gold_percentage < 77.27) {
    return {karat:"16",value:((rate.cmp_rate/22)*16).toFixed(2)}
	} else if(gold_percentage >= 68.18 && gold_percentage < 72.73) {
    return {karat:"15",value:((rate.cmp_rate/22)*15).toFixed(2)}
	} else if(gold_percentage >= 63.64 && gold_percentage < 68.18) {
    return {karat:"14",value:((rate.cmp_rate/22)*14).toFixed(2)}
	} else if(gold_percentage >= 59.09 && gold_percentage < 63.64) {
    return {karat:"13",value:((rate.cmp_rate/22)*13).toFixed(2)}
	} else if(gold_percentage >= 54.55 && gold_percentage < 59.09) {
    return {karat:"12",value:((rate.cmp_rate/22)*12).toFixed(2)}
	} else {
    return {karat:"Less than 12 karat",value:0}
	}
}else{
  return {karat:"",value:0}
}

}
// const gPr =(parseFloat(task?.net_weight)/parseFloat(task?.total_weight))*100;

const TaskTable = (props:any) => (
  
  <>
{props.tasks.length > 0 ? (
        props.tasks.map((task:any) => (
          <div key ={n++}>
<div>
<div  className="bg-gray-800 text-sm overflow-hidden  ">
            <span className="font-bold text-white ml-2">{task?.name}</span> &nbsp;
            
            <span className="  text-orange-300 rounded-sm px-2 mr-3">
                                KARAT : {task.karat}
                              </span>
                          <span className={`${((task?.net_weight/task?.total_weight*100)==100)?" text-orange-300":" text-red-500 text-white"}  rounded-sm px-2 mr-3`}>
                            Actual : {(actual_karat(task?.net_weight/task?.total_weight*100,props.rate)).karat}
                          </span>
                          



                                  {task?.status == "NOT ISSUE" ? (
                                    <span className="bg-green-700 text-blue-100 py-0 px-2  text-sm ">
                                      {task?.status}
                                    </span>
                                  ) : (
                                    <span className="bg-red-600 text-blue-100 py-0 px-2  text-sm ">
                                      {task?.status}
                                    </span>
                                  )}
                                </div>

</div>

          <div className="flex w-full flex-col md:flex-row  p-1 border-b  shadow-sm  mb-1 border-1 border-gray-800">
              
            
            
            <div className="flex-2 px-1 w-full">
            <div className="ml-2 text-sm">
                              
                                <div>
                                  
          <div className="flex w-full flex-col md:flex-row -mx-1 pt-2 border-b md:border-b-0">
            <div  className="bg-white text-gray-800 px-1 text-xs rounded-sm  mr-1 mb-1 md:mb-0 ">TOTAL WEIGHT - {task?.total_weight}</div>
            <div  className="bg-white text-gray-800 px-1 text-xs rounded-sm  mr-1 mb-1 md:mb-0 ">NET WEIGHT - {task?.net_weight}</div>
            <div  className="bg-white text-gray-800 px-1 text-xs rounded-sm  mr-1 mb-1 md:mb-0 ">POUNDS - {task?.pound}</div>
          </div>
          
          <div className="flex w-full flex-col md:flex-row -mx-1 pt-2 border-b md:border-b-0 ">
            <span className={` px-2 ${((task?.net_weight/task?.total_weight*100)==100)?"  border-1 border-orange-600":"  border-1 border-red-500 "}`}>GOLD PERCENTAGE -  {parseFloat((task?.net_weight/task?.total_weight*100).toString()).toFixed(2)}%</span>
                          <span className={`md:ml-1 ${((task?.net_weight/task?.total_weight*100)==100)?" bg-orange-300":" bg-red-500 text-white"}   px-2 md:mr-3`}>
                            Amount per pound : {(actual_karat(task?.net_weight/task?.total_weight*100,props.rate)).value}
                          </span>

                            <span className={`md:ml-1 ${((task?.net_weight/task?.total_weight*100)==100)?" bg-orange-300":" bg-red-500 text-white"}   px-2 md:mr-3`}>
                            Amount : {(((actual_karat(task?.net_weight/task?.total_weight*100,props.rate)).value)*task?.pound).toFixed(2)}
                          </span>
                                
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
