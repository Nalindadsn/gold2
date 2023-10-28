"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "_components";
import { useLoanService } from "_services";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
export default Edit;
function Edit() {
  const router = useRouter();
  const loanService = useLoanService();
  const loan: any = loanService.loan;
  const searchParams = useSearchParams();
  const nic = searchParams.get("nic");
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
  useEffect(() => {
    if (!nic) return;
    loanService.getByNic(nic);
  }, [nic]);
  const total_loan_amount=(arr:any)=>{
    const total_pounds = arr?.reduce(function (acc: any, obj: any) {
      return (
        acc + parseFloat(obj.amount)
      );
    }, 0);
  
    return total_pounds;
  }
  const total_loan_fines=(arr:any)=>{
    const total_pounds = arr?.reduce(function (acc: any, obj: any) {
      return (
        acc + parseFloat(obj.fines)
      );
    }, 0);
  
    return total_pounds;
  }
 
  return loan ? (
    <>
      <div>
        <div className="container  p-0">
          <div className="flex flex-col md:flex-row w-full  bg-gray-800 text-white space-x-1">
            <div className="w-full p-1">
              {/* {loan?.users[0]?.fullName}'s Loans */}

{/* 4074 */}
              
              {loan?.users ? (
                (loan?.users).length > 0 ? (
                  <div className="m-2">
                    <div>Full Name : {loan?.users[0]?.fullName}</div>
                    <div>NIC : {loan?.users[0]?.nic} <a href={`/loans/add/${loan?.users[0]?._id}`} className="bg-blue-500 hover:bg-blue-800 focus:blue-800 px-2 text-white ml-2 text-sm ">ADD NEW LOAN</a></div>{" "}
                    {/* <div>NIC : { loan?.users[0]?.nic}</div> */}
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
            <div className="w-full p-1 text-right">
              {loan?.users?.length>0?<>{loan?.users[0]?.role}<br/>
              {formatDate(loan?.users[0]?.createdAt)}</>:"loading..."}
                            </div>
          </div>
        </div>
        <div className="container  p-0">
          {loan?.users ? (
            loan?.users?.length > 0 ? (
              <>
                <div className=" ">
                  <div className="flex flex-col md:flex-row w-full  space-x-1 ">
                    <div className="p-1   md:w-full border mt-1">
                      <h3 className="bg-gray-800 text-white font-bold p-1">
                        <div className="bg-gray-800 text-white font-bold p-1 whitespace-nowrap">
                          {loan?.users ? (
                            (loan?.users).length > 0 ? (
                              <>
                                <span>
                                  {loan?.users[0]?.fullName + `'s Loans`}
                                </span>
                              </>
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}
                        </div>
                        {loan?.users[0]?.my_loans.map((i: any) => (
                          <div key={i?._id} className="my-1 px-1 w-full ">
                            <article className="overflow-hidden rounded-lg shadow-md border bg-white">
                              <header className="flex flex-col md:flex-row w-full leading-tight pb-0 p-2 md:p-4">
                                <h1 className="text-lg">
                                  <div className=" text-black text-sm ml-2">
                                    Order ID :<Link href={`/loans/edit/${i?._id}`}>{i?._id}</Link> 
                                  </div>
                                  <div className=" text-black text-sm ml-2">
                                    Form Number : {i?.form_number}
                                  </div>
                                </h1>
                              </header>
                              <footer className="md:flex items-center justify-between leading-tight pb-0 p-2 md:p-4">
                                <p className="ml-2 text-sm  text-gray-600">
                                  Creditor : {i?.customer[0]?.fullName}
                                  <br />
                                  No of installments : {i?.installments?.length}
                                  <br />
                                  Amount : {total_loan_amount(i?.installments)}
                                  <br />
                                  Fines : {total_loan_fines(i?.installments)}
                                  <br />
                                  Amount + Fines : {parseFloat(total_loan_amount(i?.installments)+total_loan_fines(i?.installments)).toFixed(2)}
                                  {/* total_loan_amount */}
                                  <br />
                                  Loan LKR{" "}
                                  {parseFloat(i?.loan_amount).toFixed(
                                    2
                                  )} for {i?.no_of_month} month
                                </p>

                                <div className="md:text-right ml-2 md:ml-0">
                                  <div
                                    className={`font-bold 
                ${i?.status == "PENDING" ? "text-yellow-500" : ""}
                ${i?.status == "PROCEED" ? "text-green-500" : ""}
                ${i?.status == "REJECTED" ? "text-red-600" : ""}
                ${i?.status == "PROCESSING" ? "text-blue-500" : ""}
                ${i?.status == "PROSPECTED" ? "text-gray-900" : ""}
                `}
                                  >
                                    {i?.status}
                                  </div>
                                  <div className="text-grey-darker text-sm  text-gray-600">
                                    {formatDate(i?.createdAt)}
                                  </div>
                                </div>
                              </footer>
                            </article>
                          </div>
                        ))}
                      </h3>
                    </div>
                    <div className="p-1 bg-red-800  md:w-full border border-1 border-red-800 mt-1 m-0">
                      <h3 className="bg-red-800 text-white font-bold p-1 whitespace-nowrap">
                        Related Loans
                      </h3>
                      {loan?.users?.length>0? loan?.users[0]?.my_guarantors.map((i: any) => (
                        <div key={i?._id} className="my-1 px-1 w-full ">
                          <article className="overflow-hidden rounded-lg shadow-md border bg-white">
                            <header className="flex flex-col md:flex-row w-full leading-tight pb-0 p-2 md:p-4">
                              <h1 className="text-lg">
                                <div className=" text-black text-sm ml-2">
                                  Order ID : <Link href={`/loans/edit/${i?._id}`}>{i?._id}</Link> 
                                </div>
                                <div className=" text-black text-sm ml-2">
                                  Form Number : {i?.form_number}
                                </div>
                              </h1>
                            </header>
                            <footer className="md:flex items-center justify-between leading-tight pb-0 p-2 md:p-4">
                              <p className="ml-2 text-sm  text-gray-600">
                                Creditor : {i?.customer[0]?.fullName}
                                <br />

                                No of installments : {i?.installments?.length}
                                  <br />
                                  Amount : {total_loan_amount(i?.installments)}

                                  <br />
                                  Fines : {total_loan_fines(i?.installments)}
                                  <br />
                                  Amount + Fines : {parseFloat(total_loan_amount(i?.installments)+total_loan_fines(i?.installments)).toFixed(2)}

                                <br />
                                Loan LKR {parseFloat(i?.loan_amount).toFixed(
                                  2
                                )}{" "}
                                for {i?.no_of_month} month
                              </p>

                              <div className="md:text-right ml-2 md:ml-0">
                                <div
                                  className={`font-bold 
                ${i?.status == "PENDING" ? "text-yellow-500" : ""}
                ${i?.status == "PROCEED" ? "text-green-500" : ""}
                ${i?.status == "REJECTED" ? "text-red-600" : ""}
                ${i?.status == "PROCESSING" ? "text-blue-500" : ""}
                ${i?.status == "PROSPECTED" ? "text-gray-900" : ""}
                `}
                                >
                                  {i?.status}
                                </div>
                                <div className="text-grey-darker text-sm  text-gray-600">
                                  {formatDate(i?.createdAt)}
                                </div>
                              </div>
                            </footer>
                          </article>
                        </div>
                      )):""}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              "No Data Found"
            )
          ) : (
            ""
          )}
          {}
        </div>
      </div>
    </>
  ) : (
    <Spinner />
  );
}
