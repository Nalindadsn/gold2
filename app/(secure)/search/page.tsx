"use client";
import React from "react";
import { fetchSearchResults } from "./utils";
import ListItem from "./ListItem";
import SearchInput from "./SearchInput";
export default function Search() {
  const [loading, setLoading] = React.useState("");
  const [query, setQuery] = React.useState("");

  const [results, setResults]: any = React.useState([]);
  const fetchData = async () => {
    setLoading("loading...");
    const res = await fetchSearchResults(query);
    setResults(res);
    setLoading("");
  };
  React.useEffect(() => {
    fetchData();
  }, [query]);
  const emt = (e: any) => {
    setQuery("");
  };

  return (
    <div>
      <div className="container  p-0">
        <div className="flex    border bg-gray-800 text-white">
          <div className="w-full p-1">
            <span className="m-2">
              {results?.users?.length > 0 ? (
                loading ? (
                  "loading..."
                ) : (
                  <>
                    {results?.users[0]?.fullName}
                    <br />
                    {results?.users[0]?.nic}
                  </>
                )
              ) : (
                ""
              )}
            </span>
          </div>
          <div className="w-full p-1 css-b62m3t-container">
            <SearchInput
              className="w-full"
              value={query}
              onChangeText={(e: any) => {
                setQuery(e.target.value);
              }}
            />
          </div>
          <button onClick={emt} className="p-1">
            reset
          </button>
        </div>
      </div>

      <div className="container  p-0">
        {/* {JSON.stringify(results?.users)} */}
        {results?.users?.length > 0 ? (
          <>
            <div className=" ">
              <div className="flex flex-col md:flex-row w-full  space-x-1 ">
                <div className="p-1   md:w-full border mt-1">
                  <h3 className="bg-gray-800 text-white font-bold p-1">
                    {results?.users[0]?.fullName}'s Loans
                  </h3>
                  <div className="border">
                    {results?.users[0]?.my_loans?.map((i: any) => (
                        <div  key={i?._id} className="my-1 px-1 w-full ">
                          <article className="overflow-hidden rounded-lg shadow-md border">
                            <header className="flex items-center justify-between leading-tight pb-0 p-2 md:p-4">
                              <h1 className="text-lg">
                              <div
                                className="no-underline hover:underline text-black text-sm ml-2"
                              >
                                Ref No : {i?._id}
                              </div>
                              <div
                                className="no-underline hover:underline text-black text-sm ml-2"
                              >
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
                                  Loan LKR{" "}
                                  {parseFloat(i?.loan_amount).toFixed(2)} for{" "}
                                  {i?.no_of_month} month
                                </p>
                              </a>
                              <a
                                className="no-underline text-grey-darker hover:text-red-dark"
                                href="#"
                              >
                                <span>{i?.status}</span>
                              </a>
                            </footer>
                          </article>
                        </div>
                    ))}
                  </div>
                </div>

                <div className="p-1  md:w-full border mt-1">
                  <h3 className="bg-gray-800 text-white font-bold p-1 whitespace-nowrap">
                    Related Loans
                  </h3>
                  {results?.users[0]?.my_guarantors?.map((i: any) => (
                    
                      <div key={i?._id} className="my-1 px-1 w-full ">
                        <article className="overflow-hidden rounded-lg shadow-md border">
                          <header className="flex items-center justify-between leading-tight pb-0 p-2 md:p-4">
                            <h1 className="text-lg">
                              <div
                                className="no-underline hover:underline text-black text-sm ml-2"
                              >
                                Ref No : {i?._id}
                              </div>
                              <div
                                className="no-underline hover:underline text-black text-sm ml-2"
                              >
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
                                Loan LKR {parseFloat(i?.loan_amount).toFixed(
                                  2
                                )}{" "}
                                for {i?.no_of_month} month
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
          ""
        )}
      </div>
    </div>
  );
}
