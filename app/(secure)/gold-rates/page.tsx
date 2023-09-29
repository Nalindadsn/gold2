"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Spinner } from "_components";
import { useRateService } from "_services";
import { useRouter } from 'next/navigation';

export default Rates;

function Rates() {
  const rateService = useRateService();
  const rates:any = rateService.rates;  

  

  const column: any = [
    {
      name: "ID",
      selector: (row: any) => row._id,
      sortable: true,
    },
    {
      name: "Company",
      selector: (row: any) => row.company,
      sortable: true,
    },
    {
      name: "Rate",
      selector: (row: any) =>parseFloat(row.gold_rate).toFixed(2),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row: any) =>(
        <>
        
<Link
          href={`/gold-rates/edit/${row._id}`}
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

    const newData=rates?.filter((row:any)=>(row.company).toLowerCase().includes((event.target.value).toLowerCase()))
    // console.log(newData)
    setRecords(newData);
    
  }

  

  useEffect(() => {
    
    
    rateService.getAll();
  }, [rates]);

  return (
    <>
   
      <div className="p-1 flex w-full clear-both flex-col md:flex-row -mx-1 py-2  mb-1">
        <h1 className="w-full text-2xl font-bold ">- Rates</h1>
        <Link
          href="/gold-rates/add"
          className="text-right btn btn-primary"
          style={{ whiteSpace: "nowrap" }}
        >
          + New Rate
        </Link>
      </div>
      

      {/* <TableBody /> */}
      <div className="flex w-full  -mx-1 pt-2 border-b md:border-b-0">
        <div className="w-full hidden md:block"></div>
        <div
          className="px-2 flex w-full  -mx-1 pt-2 border-b md:border-b-0"
          style={{ whiteSpace: "nowrap" }}
        >
          <label className="form-label mt-2">Finance Company </label>
          <input
           type="text" onChange={handleFilter}
            className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md "
            name="form_number"
          />
        </div>
        <div className="invalid-feedback"></div>
      </div>
      {rates?<DataTable
        columns={column}
        data={records?records:rates}
        pagination
        selectableRows
      ></DataTable>:<div>
      
    </div>
    
    }
      
    </>
  );

 
}
