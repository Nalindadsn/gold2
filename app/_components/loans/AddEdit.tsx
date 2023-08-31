"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAlertService, useLoanService } from "_services";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import UserTable from "./tables/UserTable";
import EditUserForm from "./forms/EditUserForm";
export { AddEdit };

function AddEdit({
  title,
  loan,
  user,
}: {
  title: string;
  loan?: any;
  user?: any;
}) {
  const router = useRouter();
  const alertService = useAlertService();
  const loanService = useLoanService();

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: loan,
  });

  const { errors } = formState;

  const fields = {
    // type: register("type", {
    //   required: "type",
    // }),
    estimated_price_old: register("estimated_price_old", {
      required: "estimated_price_old",
    }),
    loan_price_old: register("loan_price_old", {
      required: "loan_price_old",
    }),
    interest_old: register("interest_old", {
      required: "interest_old is required",
    }),
    expected_price_old: register("expected_price_old", {
      minLength: {
        value: 1,
        message: "expected_price_old must be at least 1 characters",
      },
      // expected_price_old only required in add mode
      validate: (value) =>
        !loan && !value ? "expected_price_old is required" : undefined,
    }),

    expected_month: register("expected_month", {
      required: "expected_month is required",
    }),
    decided_price: register("decided_price", {
      required: "decided_price is required",
    }),
    no_of_month: register("no_of_month", {
      required: "no_of_month is required",
    }),
    form_number: register("form_number", {
      required: "form_number is required",
    }),
  };

  const installment = (n: any, value: any) => {
    switch (n) {
      case 60:
        var val = (value * 250) / 100 / 60;

        break;
      case 48:
        var val = (220 * value) / 100 / 48;
        break;
      case 36:
        var val = (190 * value) / 100 / 36;
        break;
      case 24:
        var val = (160 * value) / 100 / 24;
        break;
      case 18:
        var val = (145 * value) / 100 / 18;
        break;
      case 12:
        var val = (130 * value) / 100 / 12;
        break;
      case 6:
        var val = (115 * value) / 100 / 6;
        break;

      default:
        var val = 0;
        break;
    }
    return val.toFixed(2);
  };

  const [decided_price, setDecidedPrice] = useState("");
  const [reviews, setReviews] = useState([]);
  const arr = reviews ? reviews : [];

  const total_pounds = arr.reduce(function (acc: any, obj: any) {
    return (
      acc + (parseFloat(obj.net_weight) ? parseFloat(obj.net_weight) : 0) / 8
    );
  }, 0);
  const itm_total_net = arr.reduce(function (acc: any, obj: any) {
    return acc + (parseFloat(obj.net_weight) ? parseFloat(obj.net_weight) : 0);
  }, 0);
  const itm_total_weight = arr.reduce(function (acc: any, obj: any) {
    return (
      acc + (parseFloat(obj.net_weight) ? parseFloat(obj.total_weight) : 0) / 8
    );
  }, 0);

  const old_mkt_price = (loan?.estimated_price_old / total_pounds).toFixed(2);
  const old_cmp_price = (loan?.loan_price_old / total_pounds).toFixed(2);
  const old_exp_price = (loan?.expected_price_old / total_pounds).toFixed(2);
  const basic_estimate = (130000 * total_pounds).toFixed(2);
  const basic_estimate_final = loan?.expected_price_old;
  //Math.round(loan.expected_price_old / 1000) * 1000 + 1000;

  const [name, setItmName] = useState("");
  const [karat, setKarat] = useState("");
  const [net_weight, setNet_weight] = useState("");
  const [total_weight, setTotal_weight] = useState("");
  const [pound, setPound] = useState("0");
  const [status, setStatus] = useState("NOT ISSUE");

  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  // --------------------------------------------------------
  const submitHandler = async (e: any) => {
    e.preventDefault();
    // console.log(name)
    setLoading(true);
    try {
      const data: any = {
        name: name,
        karat: karat,
        net_weight: net_weight,
        total_weight: total_weight,
        pound: parseFloat(net_weight) / 8,
        status: status ? status : "NOT ISSUE",
      };
      await loanService.updateItem(loan?.id, data);
      fetchReviews();
      setLoading(false);

      //enqueueSnackbar('Review submitted successfully', { variant: 'success' });
      setItmName("");
      setKarat("");
      setTotal_weight("");
      setNet_weight("");
      // toast.success('Review submitted successfully');
    } catch (err) {
      setLoading(false);

      // toast.success(err);
    }
  };
  // --------------------------------------------------------
  const submitHandlerDel = async (e: any, b: any) => {
    setLoading(true);
    try {
      await loanService.deleteItem(e, b);
      fetchReviews();
      setLoading(false);
    } catch (err) {
      setLoading(false);

      // toast.success(err);
    }
  };
  const fetchReviews = useCallback(async () => {
    try {
      if (loan) {
        const { data } = await axios.get(`/api/loans/${loan?.id}`);
        setReviews(data.items);
      } else {
        setReviews([]);
      }
    } catch (err) {
      //enqueueSnackbar(getError(err), { variant: 'error' });
    }
  }, []);
  let n: any = 1;
  const net_weight_cal: any = (parseFloat(net_weight) / 8).toFixed(4);
  useEffect(() => {
    // async () => {
    fetchReviews();
  }, [fetchReviews]);

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

  ///////////////task

  const tasksData: any = [];

  const initialFormState = {
    id: null,
    name: "",
    karat: "",
    net_weight: "",
    total_weight: "",
    pound: "",
  };

  const [tasks, setUsers] = useState(tasksData);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialFormState);

  const addUser = (user: any) => {
    user.id = tasks.length + 1;

    setUsers([...tasks, user]);
  };

  const deleteUser = (id: any) => {
    setEditing(false);
    setUsers(tasks.filter((user: any) => user.id !== id));
  };

  const editRow = (user: any) => {
    setEditing(true);

    setCurrentUser(user);
  };

  const updateUser = (id: any, updatedUser: any) => {
    setEditing(false);
    setUsers(tasks.map((user: any) => (user.id === id ? updatedUser : user)));
  };
  const taskArray: any = tasks.forEach(function (v: any) {
    delete v.id;
  });
  async function onSubmit(data: any) {
    alertService.clear();
    const dataV = data;
    dataV.user_id = user;
    if (loan) {
      dataV.items = [];
    } else {
      dataV.items = tasks;
    }
    // console.log(tasks)
    dataV.items = tasks;
    try {
      // create or update loan based on loan prop
      let message;
      if (loan) {
        await loanService.update(loan?.id, dataV);
        message = "Loan updated";
      } else {
        await loanService.create(dataV);
        message = "Loan added";
      }

      router.push(`/loans`);
      // router.refresh()
      alertService.success(message, true);
    } catch (error: any) {
      alertService.error(error);
    }
  }
  
const total_pounds_add = 
  tasks.reduce(function (acc: any, obj: any) {
    return (
      acc + (parseFloat(obj.net_weight) ? parseFloat(obj.net_weight) : 0) / 8
    );
  }, 0);
;
const itm_total_net_add = 
  tasks.reduce(function (acc: any, obj: any) {
    return acc + (parseFloat(obj.net_weight) ? parseFloat(obj.net_weight) : 0);
  }, 0);

const itm_total_weight_add =
  tasks.reduce(function (acc: any, obj: any) {
    return (
      acc + (parseFloat(obj.net_weight) ? parseFloat(obj.total_weight) : 0) / 8
    );
  }, 0);


  return (
    <>
      <>
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-6 pb-2 tracking-wider uppercase">
            - Order
          </h2>
          <div>
            <div className="relative mr-4 inline-block">
              <div className="text-gray-500 cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-printer"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                  <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" />
                  <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" />
                  <rect x="7" y="13" width="10" height="8" rx="2" />
                </svg>
              </div>
            </div>

            <div className="relative inline-block">
              <div className="text-gray-500 cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-refresh"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                  <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5" />
                  <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 space-x-1  md:grid-cols-2">
          <div>
            <div className="bg-white mb-2 m-1 p-3">

            <div className="mb-2 md:mb-1 md:flex items-center">
              <label className=" text-gray-800 block font-bold text-sm uppercase tracking-wide">
                Status
              </label>
              <span className="mr-4 inline-block  md:block">:</span>
              <div className="flex-1">{loan?.status}</div>
            </div>
            <div className="mb-2 md:mb-1 md:flex items-center">
              <label className=" text-gray-800 block font-bold text-sm uppercase tracking-wide">
                Order No
              </label>
              <span className="mr-4 inline-block  md:block">:</span>
              <div className="flex-1">{loan?._id}</div>
            </div>
            <div className="mb-2 md:mb-1 md:flex items-center">
              <label className=" text-gray-800 block font-bold text-sm uppercase tracking-wide">
                {" "}
                Created At
              </label>
              <span className="mr-4  md:block">:</span>
              <div className="flex-1">
                {loan ? formatDate(loan?.createdAt) : ""}
              </div>
            </div>
            <div className="mb-2 md:mb-1 md:flex items-center">
              <label className=" text-gray-800 block font-bold text-sm uppercase tracking-wide">
                {" "}
                Updated At
              </label>
              <span className="mr-4  md:block">:</span>
              <div className="flex-1">
                {loan ? formatDate(loan?.updatedAt) : ""}
              </div>
            </div>
            </div>

          </div>
            <div className="bg-white p-2 m-1">
              <div className=" flex items-center justify-between leading-none  md:p-4 ">
                <a
                  className="flex items-center no-underline  text-black"
                  href="#"
                >
                  <img
                    src="https://res.cloudinary.com/masterdevs/image/upload/v1627421291/avatars/gbhzxcjtftv0okqhuw5z.png"
                    loading="lazy"
                    width="60"
                    height="60"
                    decoding="async"
                    data-nimg="1"
                    className="block rounded-full"
                  />
                  <div className="ml-2 text-xl -mt-8">
                    <div className="text-gray-800 mt-1 font-bold">
                      <span>
                        {loan?.officer[0]?.firstName +
                          " " +
                          loan?.officer[0]?.lastName}
                      </span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="-mt-8">
                <label className="pl-20 text-gray-800 block  text-sm uppercase tracking-wide">
                  {" "}
                  NIC : {loan?.officer[0]?.username}
                </label>
                <div className="flex-1"></div>
              </div>
              <div className="m-2">CREATED BY</div>
            </div>
          <div>
            <div className=" bg-white">
              <div className="flex items-center justify-between leading-none  md:p-4">
                <a
                  className="flex items-center no-underline  text-black"
                  href="#"
                >
                  <img
                    src="https://res.cloudinary.com/masterdevs/image/upload/v1627421291/avatars/gbhzxcjtftv0okqhuw5z.png"
                    loading="lazy"
                    width="60"
                    height="60"
                    decoding="async"
                    data-nimg="1"
                    className="block rounded-full"
                  />
                  <div className="ml-2 text-xl -mt-5">
                    <div className="text-gray-800 mt-1 font-bold">
                      <span>
                        {loan?.customer[0]?.firstName +
                          " " +
                          loan?.customer[0]?.lastName}
                      </span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="-mt-8">
                <label className=" pl-20 text-gray-800 block  text-sm uppercase tracking-wide">
                  {" "}
                  NIC : {loan?.customer[0]?.username}
                </label>
                <div className="flex-1"></div>
              </div>
              <div className="m-2 text-bold">CUSTOMER</div>
            </div>
            <div></div>

            <input
              name="photo"
              id="fileInput"
              accept="image/*"
              className="hidden"
              type="file"
            />
          </div>
        </div>

        <div className="flex mb-8 justify-between"></div>

        {/* {console.log(loan)} */}


{loan?(
  <>
  
        <form
          onSubmit={submitHandler}
          className="bg-white p-2 mt-4"
          style={{ overflow: "hidden" }}
        >
          <div className="flex flex-col md:flex-row -mx-1 py-2 border-b">
            <div className="px-1">
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
            </div>
            <div className="px-1  text-right">
              Total Weight : {itm_total_weight.toFixed(4)}
            </div>
            <div className="px-1  text-right">
              Net Weight : {itm_total_net.toFixed(4)}
            </div>
            <div className="px-1  text-right">
              total pound : {total_pounds.toFixed(4)}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 ">
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <h2 className=" text-gray-800 text-lg">
                items
                <span className="bg-dark ml-2 text-blue-100 py-0 px-2 rounded-full text-sm ">
                  NO OF ITEMS : {reviews.length}
                </span>
              </h2>
              <div>
                <div className="flex  flex-col md:flex-row -mx-1 py-2 border-b">
                  <div className="flex-1 px-1">
                    <input
                      type="text"
                      onChange={(e) => setItmName(e.target.value)}
                      value={name}
                      name="name"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      placeholder="Description"
                      required
                    />
                  </div>
                  <div className="px-1  text-right">
                    <input
                      type="text"
                      onChange={(e) => setKarat(e.target.value)}
                      value={karat}
                      name="karat"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      placeholder="Karat"
                    />
                  </div>
                  <div className="px-1  text-right">
                    <input
                      type="text"
                      onChange={(e) => setNet_weight(e.target.value)}
                      value={net_weight}
                      name="net_weight"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      placeholder="Net Weight"
                      required
                    />
                  </div>
                  <div className="px-1  text-right">
                    <input
                      type="text"
                      onChange={(e) => setTotal_weight(e.target.value)}
                      value={total_weight}
                      name="total_weight"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      placeholder="Total Weight"
                      required
                    />
                  </div>
                  <div className="px-1  text-right">
                    <input
                      type="text"
                      onChange={(e) => setPound(e.target.value)}
                      value={net_weight_cal}
                      name="pound"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      placeholder="Pound"
                      required
                    />
                  </div>

                  <div className="px-1  text-right">
                    <select
                      onChange={(e) => setStatus(e.target.value)}
                      name="status"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    >
                      <option>NOT ISSUE</option>
                      <option>ISSUE</option>
                    </select>
                  </div>
                  <div className="px-1 pt-1  text-right">
                    <button
                      className="text-red-500 hover:text-red-600 text-sm font-semibold mt-1"
                      type="reset"
                    >
                      RESET
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary me-2 mt-1 bg-blue-700"
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm me-1"></span>
                  )}
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="bg-white p-2 mt-4">
          {reviews.map((i: any) => (
            <div key ={n++}>


<div className="flex w-full flex-col md:flex-row  p-1 border-b   rounded-lg shadow-lg bg-gray-800 mb-1">
    
  
  
  <div className="flex-2 px-1 w-full">
  <div className="ml-2 text-sm">
                      <span className="text-white">
                        <span className="  bg-orange-300 rounded-sm px-2 mr-3">
                      {n}
                    </span>
  {i?.name} &nbsp;
                        {i?.status == "NOT ISSUE" ? (
                          <span className="bg-green-700 text-blue-100 py-0 px-2 rounded-full text-sm ">
                            {i?.status}
                          </span>
                        ) : (
                          <span className="bg-red-600 text-blue-100 py-0 px-2 rounded-full text-sm ">
                            {i?.status}
                          </span>
                        )}
                      </span>
                      <br />
                      <div>
                        
<div className="flex w-full flex-col md:flex-row -mx-1 pt-2 border-b md:border-b-0">
  <div  className="bg-white text-gray-800 px-1 text-xs rounded-sm  mr-1 mb-1 md:mb-0 ">TOTAL WEIGHT - {i?.total_weight}</div>
  <div  className="bg-white text-gray-800 px-1 text-xs rounded-sm  mr-1 mb-1 md:mb-0 ">NET WEIGHT - {i?.net_weight}</div>
  <div  className="bg-white text-gray-800 px-1 text-xs rounded-sm  mr-1 mb-1 md:mb-0 ">POUNDS - {i?.pound}</div>
</div>
                      </div>
                    </div>
  </div>
  <div className="px-1 text-right">
                  <button
                    onClick={() => submitHandlerDel(loan?.id, { name: i?._id })}
                    // onClick={() => {

                    //   loanService.deleteItem(loan?.id, {name:i?._id});
                    //   fetchReviews();
                    // }  }
                    className="btn btn-sm btn-danger btn-delete-loan mr-2 mt-1"
                    style={{ width: "60px" }}
                    //  disabled={true}
                    // disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Delete</span>
                    )}
                  </button></div>
</div>

            </div>
          ))}
        </div>
  </>
):(
  <>

<div className="container bg-white">
          <div className="flex-row">
            <div className="flex-large">
              <div>


                
                <h2>{editing ? "Update Item" : "Add Item"}</h2>
                
          <div className="flex flex-col md:flex-row -mx-1 py-2 border-b">
            <div className="px-1">
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
            </div>
            <div className="px-1  text-right">
              Total Weight : {total_pounds_add.toFixed(4)}
            </div>
            <div className="px-1  text-right">
              Net Weight : {itm_total_net_add.toFixed(4)}
            </div>
            <div className="px-1  text-right">
              total pound : {total_pounds_add.toFixed(4)}
            </div>
          </div>
                <EditUserForm
                  editing={editing}
                  setEditing={setEditing}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  updateUser={updateUser}
                  addUser={addUser}
                />
              </div>
            </div>
            <div className="flex-large">


              <UserTable
                tasks={tasks}
                editRow={editRow}
                deleteUser={deleteUser}
              />
            </div>
          </div>
        </div>
  </>
)}


      </>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-2 mt-2"
        // style={{ marginLeft: "5%", marginRight: "5%" }}
      >
        {/* {JSON.stringify(loan?.items)} */}
        <br />
        ----total pound------{JSON.stringify(total_pounds)}----
        <br />
        ----old_mkt_price------{JSON.stringify(old_mkt_price)}----
        <br />
        ----old_cmp_price------{JSON.stringify(old_cmp_price)}----
        <br />
        ----old_exp_price------{JSON.stringify(old_exp_price)}----
        <hr />
        ----basic - estimate---{JSON.stringify(basic_estimate)}----
        <br />
        ----basic - estimate-f--{JSON.stringify(basic_estimate_final)}----
        <hr />
        ----installments-60-
        {JSON.stringify(installment(60, basic_estimate_final))}----
        <br />
        ----installments-48-
        {JSON.stringify(installment(48, basic_estimate_final))}----
        <br />
        ----installments-36-
        {JSON.stringify(installment(36, basic_estimate_final))}----
        <br />
        ----installments-24-
        {JSON.stringify(installment(24, basic_estimate_final))}----
        <br />
        ----installments-18-
        {JSON.stringify(installment(18, basic_estimate_final))}----
        <br />
        ----installments-12-
        {JSON.stringify(installment(12, basic_estimate_final))}----
        <br />
        ----installments-6-
        {JSON.stringify(installment(6, basic_estimate_final))}----
        <br />
        <h1 className="ml-3 block text-base font-semibold text-[#07074D] sm:text-xl">{title}</h1>
        <div className="flex flex-col md:flex-row -mx-1 py-2 border-b"><div className="px-1"></div><div className="px-1  text-right">Total Weight : 1.8750</div><div className="px-1  text-right">Net Weight : 123.0000</div><div className="px-1  text-right">total pound : 15.3750</div></div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          

          <div className="p-2 ml-1">
            <label className="form-label ml-2 ">Estimated Price (Old)</label>
            <input
              {...fields.estimated_price_old}
              type="text"
              className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                errors.estimated_price_old ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.estimated_price_old?.message?.toString()}
            </div>
          </div>
          <div className="p-2">
            <label className="form-label ml-2 ">Loan Price (Old)</label>
            <input
              {...fields.loan_price_old}
              type="text"
              className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                errors.loan_price_old ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.loan_price_old?.message?.toString()}
            </div>
          </div>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-2">
            <label className="form-label ml-2 ">Interest (Old)</label>
            <input
              {...fields.interest_old}
              type="text"
              className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                errors.interest_old ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.interest_old?.message?.toString()}
            </div>
          </div>

          <div className="p-2">
            <label className="form-label ml-2 ">Expected Price (Old)</label>
            <input
              {...fields.expected_price_old}
              type="expected_price_old"
              className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                errors.expected_price_old ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.expected_price_old?.message?.toString()}
            </div>
          </div>

          <div className="p-2">
            <label className="form-label ml-2 ">expected_month(Old)</label>
            <input
              {...fields.expected_month}
              type="expected_month"
              className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                errors.expected_month ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.expected_month?.message?.toString()}
            </div>
          </div>
          <div className="p-2">
            <label className="form-label ml-2 ">decided_price(Old)</label>
            <input
              {...fields.decided_price}
              type="decided_price"
              className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                errors.decided_price ? "is-invalid" : ""
              }`}
              onChange={(e) => setDecidedPrice(e.target.value)}
            />
            {decided_price}
            <div className="invalid-feedback">
              {errors.decided_price?.message?.toString()}
            </div>
          </div>
          <div className="p-2">
            <label className="form-label ml-2 ">No of Month</label>
            <select
              {...fields.no_of_month}
              className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                errors.no_of_month ? "is-invalid" : ""
              }`}
            >
              <option value="60">60</option>
              <option value="48">48</option>
              <option value="36">36</option>
              <option value="24">24</option>
              <option value="18">18</option>
              <option value="12">12</option>
              <option value="6">6</option>
            </select>
            {/* <input
              {...fields.no_of_month}
              type="no_of_month"
              className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                errors.no_of_month ? "is-invalid" : ""
              }`}
            /> */}
            <div className="invalid-feedback">
              {errors.no_of_month?.message?.toString()}
            </div>
          </div>
          <div className="p-2">
            <label className="form-label ml-2 ">form_number</label>
            <input
              {...fields.form_number}
              type="form_number"
              className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                errors.form_number ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.form_number?.message?.toString()}
            </div>
          </div>
        </div>
        <div className="mb-3">
          <button
            type="submit"
            disabled={formState.isSubmitting}
            className="btn btn-primary me-2 bg-blue-700"
          >
            {formState.isSubmitting && (
              <span className="spinner-border spinner-border-sm me-1"></span>
            )}
            Save
          </button>
          <button
            onClick={() => reset()}
            type="button"
            disabled={formState.isSubmitting}
            className="btn btn-secondary bg-gray-800"
          >
            Reset
          </button>
          <Link href="/loans" className="btn btn-link">
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}
