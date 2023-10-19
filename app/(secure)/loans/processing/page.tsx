"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Spinner } from "_components";
import DataTable from "react-data-table-component";
import { useLoanService, useUserService } from "_services";
// import { FaUserCircle} from 'react-icons/fa';
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";

import {
  Navbar,
  Nav,
  Form,
  FormControl,
  NavDropdown,
  
} from "react-bootstrap";
export default Loans;

function Loans() {
  const loanService = useLoanService();
  const loans: any = loanService.loans;

  const userService = useUserService();
  const user:any = userService.currentUser;
  useEffect(() => {
    loanService.getByStatus("PROCESSING");
    
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
      selector: (row: any) => row.id,
      sortable: true,
    },
    
    {
        name: "Form No",
        selector: (row: any) => row.form_number,
        sortable: true,
      },
      
    {
      name: "action",
      selector: (row: any) => (
        <>
        
        <NavDropdown title="Action" id="basic-nav-dropdown">
            <NavDropdown.Item  href={`/loan-invoice/${row.id}?id=${row?.customer[0]?._id}`}>
            Backend Report
            </NavDropdown.Item>
            {(user?.role=="ADMIN" || user?.role=="ACCOUNTANT") && (row.status=="APPROVED" || row.status=="COMPLETED" ||  row.status=="PROCESSING" ||  row.status=="REJECTED" )?<>
            <NavDropdown.Item  href={`/loans/account/edit/${row.id}?id=${row?.customer[0]?._id}`}>Installments</NavDropdown.Item>
</>:<></>}
            {user?.role=="ADMIN"?<>

            <NavDropdown.Item  href={`/loans/edit/${row.id}?id=${row?.customer[0]?._id}`}>Edit</NavDropdown.Item>
            <NavDropdown.Item  href={`/loans/view/${row.id}?id=${row?.customer[0]?._id}`}>View</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item  
            onClick={() => loanService.delete(row.id)} 
            disabled={row.isDeleting}>
              {row.isDeleting ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              <span>Delete</span>
            )}

            </NavDropdown.Item>
            </>:<>
            { row.status=="APPROVED" || row.status=="REJECTED"?             <NavDropdown.Item  href={`/loans/view/${row.id}?id=${row?.customer[0]?._id}`}>View</NavDropdown.Item>
:            <NavDropdown.Item  href={`/loans/edit/${row.id}?id=${row?.customer[0]?._id}`}>Edit</NavDropdown.Item>
}
            </>
    }

          </NavDropdown>
          {row.isDeleting ? (<><span>Deleting </span><span className="spinner-border spinner-border-sm"></span></>
              
            ) : ""}
{/*         
        <a
            href={`/loan-invoice/${row.id}?id=${row?.customer[0]?._id}`}
            className="btn btn-sm btn-success me-1  focus:bg-yellow-500 whitespace-nowrap my-1"
          >
            Backend Report
          </a>
          {user?.role=="ADMIN"?<>
<Link
          href={`/loans/edit/${row.id}?id=${row?.customer[0]?._id}`}
          className="btn btn-sm btn-warning me-1  focus:bg-yellow-500 mb-1"
        >
          Edit
        </Link>
        <Link
          href={`/loans/view/${row.id}?id=${row?.customer[0]?._id}`}
          className="btn btn-sm btn-primary me-1  focus:bg-yellow-500 mb-1"
        >
          View
        </Link></>
        :
        row.status=="APPROVED" || row.status=="REJECTED"? <Link
          href={`/loans/view/${row.id}?id=${row?.customer[0]?._id}`}
          className="btn btn-sm btn-primary me-1  focus:bg-yellow-500 mb-1"
        >
         View
        </Link>
        :<Link
          href={`/loans/edit/${row.id}?id=${row?.customer[0]?._id}`}
          className="btn btn-sm btn-warning me-1  focus:bg-yellow-500 mb-1"
        >
          Edit
        </Link>} */}
<br/>

{/* 
          {user?.role=="ADMIN"?

          <button
            onClick={() => loanService.delete(row.id)}
            className="btn btn-sm btn-danger btn-delete-loan  focus:bg-red-700"
            style={{ width: "60px" }}
            disabled={row.isDeleting}
          >
            {row.isDeleting ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              <span>Delete</span>
            )}
          </button>
          :""} */}
        </>
      ),

    },

      {
        name: "Name",
        selector: (row: any) =><><FaUserCircle className="float-left mr-2 text-xl" />{row?.customer[0]?.fullName}</> ,
        sortable: true,
      },
      {
        name: "NIC",
        selector: (row: any) =><>{row?.customer[0]?.nic}</> ,
        sortable: true,
      },
      {
        name: "Expected Price",
        selector: (row: any) => row.expected_price_old,
        sortable: true,
      },
    {
      name: "Created At",
      selector: (row: any) => row.createdAt+" by " +row?.officer[0]?.fullName,
      sortable: true,
    },
  ];
  const [records, setRecords] = useState(null);
  const handleFilter = (event: any) => {
    const newData = loans?.filter((row: any) =>
      row?.customer[0]?.nic.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  return (
    <>
      <h1 className="text-2xl font-bold  pt-2 tracking-wider uppercase  ">
        - Loans Processing
      </h1>
{/* {JSON.stringify(loans)} */}
      <div>
        <div>
          <div>{/* <TableBody /> */}</div>
        </div>
      </div>

      <div className="flex w-full  -mx-1 pt-2 border-b md:border-b-0">
        <div className="w-full hidden md:block"></div>
        <div
          className="px-2 flex w-full  -mx-1 pt-2 border-b md:border-b-0"
          style={{ whiteSpace: "nowrap" }}
        >
          <label className="form-label mt-2">NIC</label>
          <input
           type="text" onChange={handleFilter}
            className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md "
            name="form_number"
          />
        </div>
        <div className="invalid-feedback"></div>
      </div>
{loans?<DataTable
        columns={column}
        data={records ? records : loans}
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
    if (loans?.length) {
      return loans.map((loan: any) => (
        <div
          key={loan.id}
          className="flex  flex-col md:flex-row -mx-1 py-2 border-b bg-white shadow-sm mb-1"
        >
          <div className="px-1 w-full">
            Form ID - {loan.form_number}
            <br />
            Estimated Amount - {loan.expected_price_old}
            <br />
            Order ID - {loan.id}
            <br />
            <div className="bg-white shadow-sm p-1">
              <FaUserCircle className="float-left mr-2 text-5xl" />{" "}
              {loan?.customer[0]?.fullName}{" "}
              {loan?.customer[0]?.gender}
              <br />
              {loan?.customer[0]?.nic}
            </div>
          </div>
          <div>
            <div
              className="bg-white  p-1 border-t md:border-0"
              style={{ whiteSpace: "nowrap" }}
            >
              CREATED BY : {loan?.officer[0]?.fullName}{" "}
              {loan?.officer[0]?.gender}
              {loan?.officer[0]?.nic}
              <br />
              CREATED AT :{formatDate(loan?.createdAt)}
            </div>
            {/* {JSON.stringify(loan?.customer[0]?._id)} */}
          </div>
          <div style={{ whiteSpace: "nowrap" }} className="p-1">
            {/* <Link href={`/loans/view/${loan.id}`} className="btn btn-sm btn-primary me-1">View</Link> */}
            <Link
              href={`/loans/edit/${loan.id}?id=${loan?.customer[0]?._id}`}
              className="btn btn-sm btn-primary me-1"
            >
              Edit
            </Link>
            <button
              onClick={() => loanService.delete(loan.id)}
              className="btn btn-sm btn-danger btn-delete-loan"
              style={{ width: "60px" }}
              disabled={loan.isDeleting}
            >
              {loan.isDeleting ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                <span>Delete</span>
              )}
            </button>
          </div>
        </div>
      ));
    }

    if (!loans) {
      return (
        <div>
          <div>
            <Spinner />
            <div className="row">
    <div className="skeleton"></div>
    <div className="skeleton"></div>
    <div className="skeleton"></div>
    <div className="skeleton"></div>
    <div className="skeleton"></div>
  </div>
          </div>
        </div>
      );
    }

    // if (loans?.length === 0) {
    //     return (
    //         <div>
    //             <div className="text-center">
    //                 <div className="p-2">No Loans To Display</div>
    //             </div>
    //         </div>
    //     );
    // }
  }
}
