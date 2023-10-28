"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Spinner } from "_components";
import { useUserService } from "_services";
import { useRouter } from 'next/navigation';



export default Users;

function Users() {
  
  const router = useRouter();
  const userService = useUserService();
  const users:any = userService.users;

  
  const user:any = userService.currentUser;

  useEffect(() => {
    userService.getCurrent();
}, []);
const formatDate = (dateString: any) => {
  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
  const column: any = [
    {
      name: "ID",
      selector: (row: any) => (<>
      {/* <span  style={{ whiteSpace: "nowrap",marginBottom:"5px" }}>ID : {row.id}</span>  */}
        <div style={{ whiteSpace: "nowrap",marginBottom:"5px" }} className="">
                <Link
                  href={`/loans/add/${row.id}`}
                  className="btn btn-sm btn-primary me-1 text-white bg-blue-600 focus:bg-purple-700"
                >
                  Add Loan
                </Link>
                <Link
                  href={`/users/edit/${row.id}`}
                  className="btn btn-sm btn-warning me-1  focus:bg-yellow-500"
                >
                  Edit
                </Link>
  <br/>
  {user?.role=="ADMIN"?
   
                <button
                  onClick={() =>{ userService.delete(row.id);
                      setRecords(null)
                  
                  }
                  }
                  className="btn btn-sm btn-danger btn-delete-user focus:bg-red-700 mt-1"
                  style={{ width: "60px" }}
                  disabled={row.isDeleting}
                >
                  {row.isDeleting ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    <span>Delete</span>
                  )}
                </button>
  :""}             
              </div>
        </>),
      sortable: true,
    },
    {
      name: "Full Name",
      selector: (row: any) => row.fullName,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row: any) => row.gender,
      sortable: true,
    },
    {
      name: "NIC",
      selector: (row: any) => row.nic,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row: any) => (
      formatDate(row.createdAt)
),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => 
      row.status
,
      sortable: true,
    },
//     {
//       name: "action",
//       selector: (row: any) => (<>
//       <div style={{ whiteSpace: "nowrap" }} className="">
//               <Link
//                 href={`/loans/add/${row.id}`}
//                 className="btn btn-sm btn-primary me-1 focus:bg-blue-700"
//               >
//                 Add Loan
//               </Link>
//               <Link
//                 href={`/users/edit/${row.id}`}
//                 className="btn btn-sm btn-warning me-1  focus:bg-yellow-500"
//               >
//                 Edit
//               </Link>

// {user?.role=="ADMIN"?
 
//               <button
//                 onClick={() =>{ userService.delete(row.id);
//                     setRecords(null)
                
//                 }
//                 }
//                 className="btn btn-sm btn-danger btn-delete-user focus:bg-red-700"
//                 style={{ width: "60px" }}
//                 disabled={row.isDeleting}
//               >
//                 {row.isDeleting ? (
//                   <span className="spinner-border spinner-border-sm"></span>
//                 ) : (
//                   <span>Delete</span>
//                 )}
//               </button>
// :""}             
//             </div>
//       </>),
      
//       width: "fit-content",
//     },
  ];
  const [records,setRecords]=useState(null)
  const handleFilter=(event:any)=>{

    const newData=users?.filter((row:any)=>(row.nic).toLowerCase().includes((event.target.value).toLowerCase()))
    // console.log(newData)
    setRecords(newData);
    
  }

  

  useEffect(() => {
    
    userService.getAll();
  }, [users]);

  return (
    <>
      <div className="p-1 flex w-full clear-both flex-col md:flex-row -mx-1 py-2  mb-1">
        <h1 className="w-full text-2xl font-bold ">- Customers</h1>
        <Link
          href="/users/add"
          className="text-right btn btn-primary text-white bg-blue-600  focus:bg-purple-700"
          style={{ whiteSpace: "nowrap" }}
        >
          + New Customer
        </Link>
      </div>
      

      {/* <TableBody /> */}
      <div className="flex w-full  -mx-1 pt-2 border-b md:border-b-0">
        <div className="w-full hidden md:block"></div>
        <div
          className="px-2 flex w-full  -mx-1 pt-2 border-b md:border-b-0"
          style={{ whiteSpace: "nowrap" }}
        >
          <label className="form-label mt-2">NIC </label>
          <input
           type="text" onChange={handleFilter}
            className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md "
            name="form_number"
          />
        </div>
        <div className="invalid-feedback"></div>
      </div>
      {users?
      
      
      <DataTable
        columns={column}
        data={records?records:users}
        pagination
        selectableRows

      ></DataTable>:<div>
      <div>
        
        

      <div className="flex items-center p-8 bg-white shadow ">
          <div className="flex flex-col gap-2 w-9/12">
            <span className="w-11/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
            <span className="w-9/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
          </div>
          <div className="flex flex-col gap-2 w-9/12">
            <span className="w-11/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
            <span className="w-9/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
          </div>
          <div className="flex flex-col gap-2 w-9/12">
            <span className="w-11/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
            <span className="w-9/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
          </div>
          <div className="flex flex-col gap-2 w-9/12">
            <span className="w-11/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
            <span className="w-9/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
          </div>
        </div>
      <div className="flex items-center p-8 bg-white shadow ">
          <div className="flex flex-col gap-2 w-9/12">
            <span className="w-11/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
            <span className="w-9/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
          </div>
          <div className="flex flex-col gap-2 w-9/12">
            <span className="w-11/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
            <span className="w-9/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
          </div>
          <div className="flex flex-col gap-2 w-9/12">
            <span className="w-11/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
            <span className="w-9/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
          </div>
          <div className="flex flex-col gap-2 w-9/12">
            <span className="w-11/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
            <span className="w-9/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
          </div>
        </div>
      <div className="flex items-center p-8 bg-white shadow ">
          <div className="flex flex-col gap-2 w-9/12">
            <span className="w-11/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
            <span className="w-9/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
          </div>
          <div className="flex flex-col gap-2 w-9/12">
            <span className="w-11/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
            <span className="w-9/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
          </div>
          <div className="flex flex-col gap-2 w-9/12">
            <span className="w-11/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
            <span className="w-9/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
          </div>
          <div className="flex flex-col gap-2 w-9/12">
            <span className="w-11/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
            <span className="w-9/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
          </div>
        </div>
      <div className="flex items-center p-8 bg-white shadow ">
          <div className="flex flex-col gap-2 w-9/12">
            <span className="w-11/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
            <span className="w-9/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
          </div>
          <div className="flex flex-col gap-2 w-9/12">
            <span className="w-11/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
            <span className="w-9/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
          </div>
          <div className="flex flex-col gap-2 w-9/12">
            <span className="w-11/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
            <span className="w-9/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
          </div>
          <div className="flex flex-col gap-2 w-9/12">
            <span className="w-11/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
            <span className="w-9/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
          </div>
        </div>

      </div>
    </div>}
      
    </>
  );

  function TableBody() {
    if (users?.length) {
      return users.map((user:any) => (
        <>
          <div
            key={user.id}
            className="p-1 flex w-full clear-both flex-col md:flex-row -mx-1 py-2 border-b bg-white shadow-sm mb-1"
          >
            <div className="w-full">
              <div>ID : {user.id}</div>
              <div>Full Name : {user.fullName}</div>
              <div>Gender : {user.gender}</div>
              <div>NIC : {user.nic}</div>
            </div>
            <div style={{ whiteSpace: "nowrap" }} className="">
              <Link
                href={`/loans/add/${user.id}`}
                className="btn btn-sm btn-primary me-1"
              >
                Add Loan
              </Link>
              <Link
                href={`/users/edit/${user.id}`}
                className="btn btn-sm btn-warning me-1"
              >
                Edit
              </Link>
              <button
                onClick={() =>{ userService.delete(user.id);
                    setRecords(null)
                
                }
                }
                className="btn btn-sm btn-danger btn-delete-user"
                style={{ width: "60px" }}
                disabled={user.isDeleting}
              >
                {user.isDeleting ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  <span>Delete</span>
                )}
              </button>
            </div>
          </div>
        </>
      ));
    }

    if (!users) {
      return (
        <div>
          <div>
            <Spinner />
          </div>
        </div>
      );
    }

    // if (users?.length === 0) {
    //   return (
    //     <div>
    //       <div className="text-center">
    //         <div className="p-2">No Users To Display</div>
    //       </div>
    //     </div>
    //   );
    // }
  }
}
