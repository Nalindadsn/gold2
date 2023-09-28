"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Spinner } from "_components";
import { useSettingService } from "_services";
import { useRouter } from 'next/navigation';

export default Settings;

function Settings() {
  const settingService = useSettingService();
  const settings:any = settingService.settings;  

  

  const column: any = [
    
    {
      name: "Company",
      selector: (row: any) => row.company,
      sortable: true,
    },
    {
      name: "Risk Management Value",
      selector: (row: any) =>parseFloat(row.risk_management_value).toFixed(2),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row: any) =>(
        <>
        
<Link
          href={`/settings/edit/${row._id}`}
          className="btn btn-sm btn-warning me-1  focus:bg-yellow-500"
        >
          Edit
        </Link>

        </>
      ),
      sortable: true,
    },

  ];
  const [records,setRecords]=useState(null)
  const handleFilter=(event:any)=>{

    const newData=settings?.filter((row:any)=>(row.company).toLowerCase().includes((event.target.value).toLowerCase()))
    // console.log(newData)
    setRecords(newData);
    
  }

  

  useEffect(() => {
    
    
    settingService.getAll();
  }, [settingService]);

  return (
    <>
   
      <div className="p-1 flex w-full clear-both flex-col md:flex-row -mx-1 py-2  mb-1">
        <h1 className="w-full text-2xl font-bold ">- Settings</h1>
        
      </div>
      

      {/* <TableBody /> */}
      <div className="flex w-full  -mx-1 pt-2 border-b md:border-b-0">
        <div className="w-full hidden md:block"></div>
    
        <div className="invalid-feedback"></div>
      </div>
      {settings?<DataTable
        columns={column}
        data={records?records:settings}
        pagination
        selectableRows
      ></DataTable>:<div>
      
    </div>
    
    }
      
    </>
  );

 
}
