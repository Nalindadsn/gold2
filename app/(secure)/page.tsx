"use client";

import React, { useEffect } from "react";
import Chart from "_components/chart";
import Chart2 from "_components/chart2";
import { useLoanService, useUserService } from "_services";
import Link from "next/link";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";

function Page() {
  const loanService = useLoanService();
  const summary: any = loanService.summary;

  const userService = useUserService();
  const user: any = userService.currentUser;

  useEffect(() => {
    userService.getCurrent();
  }, []);

  useEffect(() => {
    loanService.getSummary();
  }, []);

  return (
    <div>
      {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates molestias distinctio quisquam libero nesciunt aut quos dolores, impedit ullam esse minus alias iusto, nihil rem pariatur aperiam illo! Obcaecati, officia. */}

      <main className=" overflow-hidden ">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6">
            <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
          </div>
          <div className="flex flex-wrap items-start justify-end -mb-3">
          <Link
              href={`/users/add`}
              className="inline-flex px-5 py-3 text-white bg-blue-600 hover:bg-purple-700 focus:bg-blue-700 rounded-md ml-6 mb-3"
            >
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
              >
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              New Customer
            </Link>
            {user?.role?<>
            
            
            <Link
              href={`/admins/add`}
              className="inline-flex px-5 py-3 text-white bg-blue-600 hover:bg-purple-700 focus:bg-blue-700 rounded-md ml-6 mb-3"
            >
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
              >
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              New Admin
            </Link>
            
            </>:""}
            
          </div>
        </div>
        <div>

</div>
        <h3 className="mt-0">Hi {user?.username}!</h3>
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-4 mt-2">
{!summary?<div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="rounded-full bg-gray-300 w-[4.5rem] h-[4.5rem] animate-pulse"></div>
          <div className="flex flex-col gap-2 w-9/12">
            <span className="w-11/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
            <span className="w-9/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
          </div>
        </div>:
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <span className="block text-2xl font-bold">
                {summary?.admins}
              </span>
              <span className="block text-gray-500">Admins</span>
            </div>
          </div>}
          {!summary?<div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="rounded-full bg-gray-300 w-[4.5rem] h-[4.5rem] animate-pulse"></div>
          <div className="flex flex-col gap-2 w-9/12">
            <span className="w-11/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
            <span className="w-9/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
          </div>
        </div>:
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <span className="block text-2xl font-bold">
                {summary?.coordinators}
              </span>
              <span className="block text-gray-500">Coordinators</span>
            </div>
          </div>}
{!summary?<div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="rounded-full bg-gray-300 w-[4.5rem] h-[4.5rem] animate-pulse"></div>
          <div className="flex flex-col gap-2 w-9/12">
            <span className="w-11/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
            <span className="w-9/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
          </div>
        </div>:
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            {summary?.user_progress_value < 0 ? (
              <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    strokeWidth="2"
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </svg>
              </div>
            ) : (
              <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            )}
            <div>
              <span className="inline-block text-2xl font-bold">
                {summary?.customers}
              </span>
              <span className="inline-block text-xl text-gray-500 font-semibold">
                ({summary?.user_progress_value}%)
              </span>
              <span className="block text-gray-500"> customers</span>
            </div>
          </div>}







          {!summary?
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="rounded-full bg-gray-300 w-[4.5rem] h-[4.5rem] animate-pulse"></div>
          <div className="flex flex-col gap-2 w-9/12">
            <span className="w-11/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
            <span className="w-9/12 bg-gray-300 h-2 rounded-full animate-pulse"></span>
          </div>
        </div>:
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
             
            </div>
            <div>
              <span className="block text-2xl font-bold"></span>
              <span className="block text-gray-500"></span>
            </div>
          </div>}


        </section>
        <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
          <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
            <div className="px-6 py-3 font-semibold border-b border-gray-100">
              Sales Progress
            </div>
            <div className="p-4 flex-grow">
              <div className=" flex items-center justify-center h-full px-0 py-16 bg-white text-gray-400 text-3xl font-semibold  border-2 border-gray-200 border-dashed rounded-md ">
                <Chart data={summary?.totalSales} />
              </div>
            </div>
          </div>
          {summary?.loan_list.map((i: any) => (
            <div
              key={i._id}
              className="flex items-center p-2 bg-white shadow rounded-lg"
            >
              <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-teal-100 rounded-full mr-1">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <span className="block text-xl font-bold">{i.form_number}</span>
                <span className="block text-gray-500">
                  LKR {i.expected_price_old}
                </span>
              </div>
            </div>
          ))}

          <div className="flex flex-col row-span-3 bg-white shadow rounded-lg">
            <div className="px-6 py-3 font-semibold border-b border-gray-100">
              Loan Summary{" "}
            </div>
            <div className="p-4 flex-grow">
              <div className="">
                {summary?.totalSales2.map((i:any)=>(
                  <div key={i._id}  className="border mb-2  shadow-sm">
                    <div  className="font-bold px-1 bg-gray-200">{new Date(i?._id).toLocaleDateString(undefined, {year: "numeric",
    month: "long",})}</div>
                    <div>
                    &nbsp;LKR {i?.totalSales.toFixed(2)}
                    </div>
                  </div>
                ))

                }
              

              </div>
            </div>
          </div>
          <div className="row-span-3 bg-white shadow rounded-lg">
            <div className="flex items-center justify-between px-6 py-3 font-semibold border-b border-gray-100">
              <span>Customers </span>
              <button
                type="button"
                className="inline-flex justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-600"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
              >
                Descending
                <svg
                  className="-mr-1 ml-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div style={{ maxHeight: " 24rem" }}>
              <ul className="p-6 space-y-6">
                {summary?.customer_list.map((i: any) => (
                  
                    <li key={i._id} className="flex items-center  shadow-sm mt-1 p-1">
                      <div className="h-10 w-10 mr-3  overflow-hidden">
                        <FaUserCircle className="float-left  text-4xl" />
                      </div>
                      <div className="text-gray-600">
                         {(((i.fullName).length )> 10)? i.fullName.substring(0,10) +"...": i.fullName}
                      </div>
                    </li>
                  
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Page;
