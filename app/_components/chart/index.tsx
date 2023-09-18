"use client"
import React from "react";
import "chart.js/auto";

import { Line } from "react-chartjs-2";


export default function Chart(data:any) {
  
const d=data.data
const data1:any = {
  labels:Array.isArray(d)? d.map((x:any) => x._id):null, 
  datasets: [
    {
      label: "Loans",
      data: Array.isArray(d)? d.map((x:any) => x.totalSales):null,
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
    // {
    //   label: "Second dataset",
    //   data: [33, 25, 35, 51, 54, 76],
    //   fill: false,
    //   borderColor: "#742774"
    // }
  ]
};


  return (
    <div className="Chart w-full ">
      {/* {JSON.stringify(a)} */}
      <Line data={data1} />
    </div>
  );
}
