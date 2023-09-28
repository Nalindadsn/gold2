"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "_components";
import { useLoanService } from "_services";
import { useSearchParams } from "next/navigation";
export default Edit;
function Edit() {
  const router = useRouter();

  const loanService = useLoanService();
  const loan: any = loanService.loan;
  const searchParams = useSearchParams();
  const nic = searchParams.get("nic");
  useEffect(() => {
    if (!nic) return;
    loanService.getByNic(nic);
  }, [nic]);
  return loan ? (
    <>
      <div>
        <div className="container  p-0">
          <div className="flex    border bg-gray-800 text-white">
            <div className="w-full p-1">
              <div className="m-2">
          
                  <div>Full Name : {loan?.users?loan?.users[0]?.fullName:"FULL NAME"}</div>
         {/*                <div>NIC : {loan?.users?loan?.users[0]?.nic:"000000000V"}</div>
                 */}
              </div>
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
                        <h3 className="bg-gray-800 text-white font-bold p-1 whitespace-nowrap">
                          {/* {loan?.users[0]?.fullName}'s Loans */}
                        </h3>
                        {loan?.users[0]?.my_loans.map((i: any) => (
                          <div key={i?._id} className="my-1 px-1 w-full ">
                            <article className="overflow-hidden rounded-lg shadow-md border">
                              <header className="flex items-center justify-between leading-tight pb-0 p-2 md:p-4">
                                <h1 className="text-lg">
                                  <div className="no-underline hover:underline text-black text-sm ml-2">
                                    Ref No : {i?._id}
                                  </div>
                                  <div className="no-underline hover:underline text-black text-sm ml-2">
                                    Form Number : {i?.form_number}
                                  </div>
                                </h1>
                                <p className="text-grey-darker text-sm">
                                  {i?.createdAt}
                                </p>
                              </header>
                              <footer className="flex items-center justify-between leading-none p-2 pt-1 md:p-4">
                                <a
                                  className="flex items-center no-underline hover:underline text-black"
                                  href="#"
                                >
                                  <p className="ml-2 text-sm">
                                    Creditor : {i?.customer[0]?.fullName}
                                    <br />
                                    Loan LKR{" "}
                                    {parseFloat(i?.loan_amount).toFixed(
                                      2
                                    )} for {i?.no_of_month} month
                                  </p>
                                </a>
                                <a
                                  className="no-underline text-grey-darker hover:text-red-dark"
                                  href="#"
                                >
                                  <br />


                                  
                                  <span>{i?.status}</span>
                                </a>
                              </footer>
                            </article>
                          </div>
                        ))}
                      </h3>
                      
                    </div>
                    <div className="p-1  md:w-full border mt-1">
                      <h3 className="bg-gray-800 text-white font-bold p-1 whitespace-nowrap">
                        Related Loans
                      </h3>
                      {loan?.users[0]?.my_guarantors.map((i: any) => (
                        <div key={i?._id} className="my-1 px-1 w-full ">
                          <article className="overflow-hidden rounded-lg shadow-md border">
                            <header className="flex items-center justify-between leading-tight pb-0 p-2 md:p-4">
                              <h1 className="text-lg">
                                <div className="no-underline hover:underline text-black text-sm ml-2">
                                  Ref No : {i?._id}
                                </div>
                                <div className="no-underline hover:underline text-black text-sm ml-2">
                                  Form Number : {i?.form_number}
                                </div>
                              </h1>
                              <p className="text-grey-darker text-sm">
                                {i?.createdAt}
                              </p>
                            </header>
                            <footer className="flex items-center justify-between leading-none p-2 pt-1 md:p-4">
                              <a
                                className="flex items-center no-underline hover:underline text-black"
                                href="#"
                              >
                                <p className="ml-2 text-sm">
                                  Creditor : {i?.customer[0]?.fullName}
                                  <br />
                                  Loan LKR{" "}
                                  {parseFloat(i?.loan_amount).toFixed(
                                    2
                                  )} for {i?.no_of_month} month
                                </p>
                              </a>
                              <a
                                className="no-underline text-grey-darker hover:text-red-dark"
                                href="#"
                              >
                                <br />
                                <span>{i?.status}</span>
                              </a>
                            </footer>
                          </article>
                        </div>
                      ))}
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
