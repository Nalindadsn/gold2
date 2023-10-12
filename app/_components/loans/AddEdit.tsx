"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  useAlertService,
  useGuarantorService,
  useLoanService,
} from "_services";
import { useCallback, useEffect, useState } from "react";
import { AddEdit as AddEditGuarantor } from "_components/guarantor";

import axios from "axios";

import TaskTable from "./tables/TaskTable";
import EditTaskForm from "./forms/EditTaskForm";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";

import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
export { AddEdit };

function AddEdit({
  title,
  loan,
  user,
  rate,
}: {
  title: string;
  loan?: any;
  user?: any;
  rate?: any;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const router = useRouter();
  const alertService = useAlertService();
  const loanService = useLoanService();
  const guarantorService = useGuarantorService();

  // get functions to build form with useForm() hook
  //   if(!loan){
  // loan.last_installment=
  //   }
  const { register, handleSubmit, watch, reset, formState } = useForm({
    defaultValues: loan,
    mode: "onChange",
  });
  const watchNoOfMonth = watch("no_of_month");
  const watchloan_amount = watch("loan_amount");
  const watchExpectedPriceOld = watch("expected_price_old");
  const { errors } = formState;

  const fields = {
    // type: register("type", {
    //   required: "type",
    // }),
    estimated_price_old: register("estimated_price_old", {
      required: "Estimated amount required",
      pattern: {
        value: /^[0-9]+$/,
        message: "Please enter a number",
      },
    }),
    loan_amount: register("loan_amount", {
      required: "Loan amount required",
    }),
    payable_in_hand: register("payable_in_hand", {
      required: "required",
    }),
    loan_price_old: register("loan_price_old", {
      required: "Loan amount is required",
    }),
    interest_old: register("interest_old", {
      required: "Interest rate is required",
    }),
    expected_price_old: register("expected_price_old", {
      required: "Expected price is required",
      minLength: {
        value: 1,
        message: "Expected price must be at least 1 characters",
      },
      // expected_price_old only required in add mode

      pattern: {
        value: /^[0-9]+$/,
        message: "Please enter a number",
      },
    }),

    mortgage_cmp: register("mortgage_cmp", {
      required: "Mortgage Company is required",
    }),

    monthly_installment: register("monthly_installment", {
      required: "This Field is required",
    }),

    mortgager_name: register("mortgager_name", {}),
    mortgage_branch: register("mortgage_branch", {
      // required: "Mortgager Name is required",
    }),
    mortgage_start_date: register("mortgage_start_date", {}),
    mortgage_end_date: register("mortgage_end_date", {}),
    mortgager_phone: register("mortgager_phone", {}),
    mortgage_interest_rate_month: register("mortgage_interest_rate_month", {}),
    mortgage_interest_rate_year: register("mortgage_interest_rate_year", {}),
    mortgage_invoice_number: register("mortgage_invoice_number", {}),
    requested_loan: register("requested_loan", {
      required: "Mortgager estimate is required",
    }),

    first_installment: register("first_installment", {
      required: "First_installment is required",
    }),

    last_installment: register("last_installment", {
      required: "Last installment date is required",
    }),

    status: register("status", {
      required: "Status is required",
    }),
    no_of_month: register("no_of_month", {
      required: "Month is required",
    }),
    no_of_month_expected: register("no_of_month_expected", {
      required: "Month is required",
    }),
    form_number: register("form_number", {
      required: "Form number is required",
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
  // expected_price
  const [addGuarantorSec, setAddGuarantorSec] = useState(false);
  const [expected_price, setExpected_price_old] = useState("0");
  const [no_of_month, setNo_of_month] = useState("0");
  const [reviews, setReviews] = useState([]);
  const [guarantorList, setGuarantor] = useState([]);
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
      acc + (parseFloat(obj.total_weight) ? parseFloat(obj.total_weight) : 0)
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
  // --------------------------------------------------------
  const submitHandlerDel = async (e: any, b: any) => {
    setLoading(true);
    try {
      await loanService.deleteItem(e, b);
      fetchReviews();

      let message;
      message = "Item Deleted ";

      alertService.error(message, true);

      setLoading(false);
    } catch (err) {
      setLoading(false);

      // toast.success(err);
    }
  };
  const submitHandlerDelUser = async (e: any, b: any) => {
    setLoading(true);
    try {
      await guarantorService.delete(e, b);

      let message;
      message = "Guarantor Removed";

      alertService.error(message, true);
      fetchGuarantor();

      setLoading(false);
      // router.push("/loans");
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
  const fetchGuarantor = useCallback(async () => {
    try {
      if (loan) {
        const { data } = await axios.get(`/api/loans/guarantors/${loan?.id}`);
        setGuarantor(data[0].guarantors);
      } else {
        setGuarantor([]);
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
    fetchGuarantor();
  }, [fetchReviews, fetchGuarantor]);

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
  const formatDate2 = (dateString: any) => {
    const options: any = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  ///////////////task
  const tasksData: any[] = [];
  const initialFormState = {
    id: null,
    name: "",
    karat: "",
    net_weight: "",
    total_weight: "",
    pound: "",
    per_pound: "",
  };

  const [tasks, setTasks] = useState(tasksData);
  const [editing, setEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(initialFormState);

  const addTask = (task: any) => {
    task.pound = task.net_weight / 8;
    task.per_pound = parseFloat(
      actual_karat((task?.net_weight / task?.total_weight) * 100).value
    ).toFixed(2);
    task.id = tasks.length + 1;
    setTasks([...tasks, task]);
  };

  const deleteTask = (id: any) => {
    setEditing(false);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editRow = (task: any) => {
    task.pound = task.net_weight / 8;
    // setPound(task.net_weight / 8);
    setEditing(true);
    setCurrentTask(task);
  };

  const updateTask = (id: any, updatedTask: any) => {
    setEditing(false);

    updatedTask.pound = updatedTask.net_weight / 8;
    updatedTask.per_pound = parseFloat(
      actual_karat((updatedTask.net_weight / updatedTask.total_weight) * 100)
        .value
    ).toFixed(2);

    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
  };

  const total_pounds_add = tasks.reduce(function (acc: any, obj: any) {
    return (
      acc +
      (parseFloat(obj.per_pound) ? parseFloat(obj.per_pound) : 0) *
        (parseFloat(obj.pound) ? parseFloat(obj.pound) : 0)
    );
  }, 0);

  const total_mx = arr.reduce(function (acc: any, obj: any) {
    return (
      acc +
      (parseFloat(obj.per_pound) ? parseFloat(obj.per_pound) : 0) *
        (parseFloat(obj.pound) ? parseFloat(obj.pound) : 0)
    );
  }, 0);

  const max_price: any = loan ? total_mx : total_pounds_add;

  const installmentV = (exp_price: any, mx_price: any, no_of_month: any) => {
    if (exp_price <= mx_price) {
      return installment(parseFloat(no_of_month), parseFloat(exp_price));
    } else {
      return installment(parseFloat(no_of_month), parseFloat(mx_price));
    }
  };
  const payment_values = (a: any, b: any, c: any) => {
    const basic = a - b;

    return (
      <span>
        {a <= max_price ? (
          <>
            <br />
            <span className="">
              <span className="mx-1 bg-green-500 rounded-full text-white py-0 px-2  text-sm whitespace-nowrap">
                LKR {max_price.toFixed(2)}
              </span>{" "}
              is Our Maximum Amount.
            </span>
          </>
        ) : (
          <>
            <br />
            <span className="mx-1 bg-yellow-500 text-white py-0 px-2 rounded-full text-sm whitespace-nowrap">
              LKR {(a - max_price).toFixed(2)}
            </span>
            Amount payable in hand <br />
            Maximum Amount: LKR {max_price.toFixed(2)}
          </>
        )}
      </span>
    );
  };
  const payment_values_amount = (a: any, b: any, c: any) => {
    const basic = a - b;

    return a <= max_price ? 0 : (a - max_price).toFixed(2);
  };

  async function onSubmit(data: any) {
    alertService.clear();
    var result = tasks.map(function (obj: any) {
      return {
        name: obj.name,
        karat: obj.karat,
        net_weight: obj.net_weight,
        total_weight: obj.total_weight,
        pound: obj.pound,
        per_pound: obj.per_pound,
      };
    });

    data.loan_amount = (
      parseFloat(watchExpectedPriceOld) <= max_price
        ? parseFloat(watchExpectedPriceOld).toFixed(2)
        : max_price.toFixed(2)
    ).toString();

    data.payable_in_hand = loan
      ? payment_values_amount(
          parseFloat(watchExpectedPriceOld),
          parseFloat(status),
          parseFloat(watchNoOfMonth)
        )
      : parseFloat(
          payment_values_amount(
            parseFloat(watchExpectedPriceOld),
            parseFloat(status),
            parseFloat(watchNoOfMonth)
          ).toString()
        ).toString(2);

    data.monthly_installment = parseFloat(
      installmentV(watchExpectedPriceOld, max_price, watchNoOfMonth)
    )
      .toFixed(2)
      .toString();

    const dataV: any = data;
    

    if (loan) {
    } else {
      dataV.user_id = user.id;
    }

    if (loan) {
      // dataV.items = [];
      dataV.items = reviews;
    } else {
      dataV.items = result;
    }
    // console.log(result)
    // dataV.items = result;
    try {
      // create or update loan based on loan prop
      let message;
      if (loan) {
        await loanService.update(loan?.id, dataV);
      
        message = "Loan updated";
      } else {
        await loanService.create(dataV);
        message = "Loan added";
        router.push(`/loans`);
      }

      // router.push(`/loans`);
      // router.refresh()
      alertService.success(message, true);
    } catch (error: any) {
      alertService.error(error);
    }
  }

  const actual_karat = (gold_percentage: any): any => {
    let finalGrades = [
      "24",
      "22",
      "21",
      "20",
      "19",
      "18",
      "17",
      "16",
      "15",
      "14",
      "13",
      "12",
    ];
    if (rate?.cmp_rate) {
      if (gold_percentage >= 109.09) {
        return { karat: "24", value: ((rate.cmp_rate / 22) * 24).toFixed(2) };
      } else if (gold_percentage >= 100 && gold_percentage < 109.09) {
        return { karat: "22", value: ((rate.cmp_rate / 22) * 22).toFixed(2) };
      } else if (gold_percentage >= 95.45 && gold_percentage < 100) {
        return { karat: "21", value: ((rate.cmp_rate / 22) * 21).toFixed(2) };
      } else if (gold_percentage >= 90.91 && gold_percentage < 95.45) {
        return { karat: "20", value: ((rate.cmp_rate / 22) * 20).toFixed(2) };
      } else if (gold_percentage >= 86.36 && gold_percentage < 90.91) {
        return { karat: "19", value: ((rate.cmp_rate / 22) * 19).toFixed(2) };
      } else if (gold_percentage >= 81.82 && gold_percentage < 86.36) {
        return { karat: "18", value: ((rate.cmp_rate / 22) * 18).toFixed(2) };
      } else if (gold_percentage >= 77.27 && gold_percentage < 81.82) {
        return { karat: "17", value: ((rate.cmp_rate / 22) * 17).toFixed(2) };
      } else if (gold_percentage >= 72.73 && gold_percentage < 77.27) {
        return { karat: "16", value: ((rate.cmp_rate / 22) * 16).toFixed(2) };
      } else if (gold_percentage >= 68.18 && gold_percentage < 72.73) {
        return { karat: "15", value: ((rate.cmp_rate / 22) * 15).toFixed(2) };
      } else if (gold_percentage >= 63.64 && gold_percentage < 68.18) {
        return { karat: "14", value: ((rate.cmp_rate / 22) * 14).toFixed(2) };
      } else if (gold_percentage >= 59.09 && gold_percentage < 63.64) {
        return { karat: "13", value: ((rate.cmp_rate / 22) * 13).toFixed(2) };
      } else if (gold_percentage >= 54.55 && gold_percentage < 59.09) {
        return { karat: "12", value: ((rate.cmp_rate / 22) * 12).toFixed(2) };
      } else {
        return { karat: "Less than 12 karat", value: 0 };
      }
    } else {
      return { karat: "", value: 0 };
    }
  };
  const gPr = (parseFloat(net_weight) / parseFloat(total_weight)) * 100;
  const submitHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data: any = {
        name: name,
        karat: karat,
        net_weight: net_weight,
        total_weight: total_weight,
        pound: parseFloat(net_weight) / 8,
        per_pound: actual_karat(gPr).value,
        status: status ? status : "NOT ISSUE",
      };
      await loanService.updateItem(loan?.id, data);
      fetchReviews();

      let message;
      message = "Item Added ";

      alertService.success(message, true);
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
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-6 pb-2 tracking-wider uppercase">
          -{loan ? "UPDATE " : "NEW"} Order
        </h2>
        <div>
          <div className="relative mr-4 inline-block">
            <div className="text-gray-500 cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center">
              <a href={`/loan-invoice/${loan?.id}`}>
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
              </a>
            </div>
          </div>

          <div className="relative inline-block"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 space-x-1  md:grid-cols-2">
        <div>
          {loan ? (
            <>
              <div
                className={`bg-white mb-2 m-1 p-3 shadow-sm border-t-4 
                ${loan?.status == "PENDING" ? "border-yellow-500" : ""}
                ${loan?.status == "APPROVED" ? "border-green-500" : ""}
                ${loan?.status == "REJECTED" ? "border-red-600" : ""}
                ${loan?.status == "PROCESSING" ? "border-blue-500" : ""}
                ${loan?.status == "COMPLETED" ? "border-gray-900" : ""}
                `}
              >
                <div className="mb-2 md:mb-1 md:flex items-center">
                  <label className=" text-gray-800 block font-bold text-sm uppercase tracking-wide">
                    {loan?.status == "PENDING" ? (
                      <span className="mx-1 bg-green-500 rounded-full text-white py-0 px-2  text-sm ">
                        {loan?.status}
                      </span>
                    ) : (
                      <></>
                    )}
                    Status
                  </label>
                </div>
                <div className="mb-2 md:mb-1 md:flex items-center">
                  <label className=" text-gray-800 block font-bold text-sm uppercase tracking-wide">
                    Order No &nbsp;&nbsp;&nbsp;
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
                {loan ? (
                  <div className="mb-2 md:mb-1 md:flex items-center">
                    <label className=" text-gray-800 block font-bold text-sm uppercase tracking-wide">
                      {" "}
                      CREATED BY
                    </label>
                    <span className="mr-4  md:block">:</span>
                    <div className="flex-1">{loan?.officer?.length>0?loan?.officer[0]?.fullName:""}</div>
                  </div>
                ) : (
                  <div className="mb-2 md:mb-1 md:flex items-center">
                    <label className=" text-gray-800 block font-bold text-sm uppercase tracking-wide">
                      {" "}
                      CREATING BY
                    </label>
                    <span className="mr-4  md:block">:</span>
                    <div className="flex-1">{user?.fullName}</div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        <div>
          <div className="bg-white p-2 m-1 shadow-sm border">
            <div className=" flex items-center justify-between leading-none  ">
              <Link
                href={`/users/edit/${loan ? loan?.customer?.length>0? loan?.customer[0]?._id:"null" : user?.id}`}
                className="flex items-center no-underline  text-black"
              >
                <FaUserCircle className="float-left  text-5xl" />

                <div className="text-xl -mt-3">
                  <div className="text-gray-800 mt-1 font-bold">
                    <span>
                    {loan ? loan?.customer?.length>0? loan?.customer[0]?.fullName :"": user?.fullName} 
                    </span>
                  </div>
                  
                </div>
              </Link>
            </div>
            <div className="mt-1 text-gray-800 block  text-sm uppercase tracking-wide">
              CUSTOMER{" "}
              <div className="float-right">NIC : {loan ? loan?.customer?.length>0? loan?.customer[0]?.nic :"": user?.nic}
              <a href={`/search?nic=${loan ? loan?.customer>0? loan?.customer[0]?.nic:"" : user?.nic}`} className="bg-blue-500 hover:bg-blue-800 focus:blue-800 px-2 text-white ml-2 text-sm ">FIND</a>
              </div>
            </div>
          </div>

          {loan ? (
            <>
              <div className="bg-white p-2 m-1 shadow-sm border">
                <div className="flex flex-col md:flex-row -mx-1  border-b text-white bg-gray-900">
                  <div className="px-1">
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                  </div>
                  <div className="px-1  text-right m-1 border-1">
                    Total Weight : {itm_total_weight.toFixed(4)}
                  </div>
                  <div className="px-1  text-right m-1 border-1">
                    Net Weight : {itm_total_net.toFixed(4)}
                  </div>
                  <div className="px-1  text-right m-1 border-1">
                    Total Pound : {total_pounds.toFixed(4)}
                  </div>
                </div>
                {payment_values(
                  parseFloat(watchExpectedPriceOld),
                  parseFloat(status),
                  parseFloat(watchNoOfMonth)
                )}{" "}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="flex mb-8 justify-between"></div>

      {/* {reviews.length > 0 || tasks.length > 0 ? ( */}
      <>
        <div className="shadow-sm border">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-2 "
            // style={{ marginLeft: "5%", marginRight: "5%" }}
          >
            <div className="">
            <div className="flex w-full  -mx-1 pt-2 border-b md:border-b-0">
                <div className="w-full hidden md:block"></div>
                <div
                  className="px-2 flex w-full  -mx-1 pt-2 border-b md:border-b-0"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <label className="form-label mt-2">Form Number</label>
                  <input
                    {...fields.form_number}
                    type="form_number"
                    className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                      errors.form_number ? "is-invalid" : ""
                    }`}
                  />
                </div>
                <div className="invalid-feedback">
                  {errors.form_number?.message?.toString()}
                </div>
              </div>
            <div className="grid grid-cols-1 space-x-1 bg-white md:grid-cols-3 p-1 shadow-md mt-3 border">
 <div className="p-2">
                  <label className="form-label ml-2 ">
                    {" "}
                    Loan Amount (Requested){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...fields.requested_loan}
                    type="requested_loan"
                    className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                      errors.requested_loan ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.requested_loan?.message?.toString()}
                  </div>
                </div>
                <div className="p-2">
                  <label className="form-label ml-2 ">
                    {" "}
                    Month (Requested){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...fields.no_of_month_expected}
                    type="no_of_month_expected"
                    className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                      errors.no_of_month_expected ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.no_of_month_expected?.message?.toString()}
                  </div>
                </div>



                
                <div className="p-2">
                  <label className="form-label ml-2 ">Status</label>

                  <select
                    {...fields.status}
                    className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                      errors.status ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">-select option</option>
                    <option className="PENDING">PENDING</option>
                    <option className="PROCESSING">PROCESSING</option>
                    <option className="APPROVED">APPROVED</option>
                    <option className="REJECTED">REJECTED</option>
                    <option className="COMPLETED">COMPLETED</option>
                  </select>

                  <div className="invalid-feedback">
                    {errors.status?.message?.toString()}
                  </div>
                </div>

</div>

<h3 className="text-xl font-bold border-t-2 pl-2 mt-3 pt-2">
                MORTGAGE DETAILS
              </h3>
              
              <div className="flex w-full  -mx-1 pt-2 border-b md:border-b-0">
                <div className="w-full hidden md:block"></div>
                <div
                  className="px-2 flex w-full  -mx-1 pt-2 border-b md:border-b-0"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <label className="form-label ml-2 mt-2">Invoice Number</label>
                  <input
                    {...fields.mortgage_invoice_number}
                    type="mortgage_invoice_number"
                    className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                      errors.mortgage_invoice_number ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.mortgage_invoice_number?.message?.toString()}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 space-x-1 bg-white md:grid-cols-2 p-1 -md mt-3 ">
              <div className="p-2">
                  <label className="form-label ml-2 ">
                    Mortgager <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...fields.mortgage_cmp}
                    type="mortgage_cmp"
                    className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                      errors.mortgage_cmp ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.mortgage_cmp?.message?.toString()}
                  </div>
                </div>

                <div className="p-2 ml-1">
                  <label className="form-label ml-2 ">
                    Estimated Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...fields.estimated_price_old}
                    type="text"
                    className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                      errors.estimated_price_old ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.estimated_price_old?.message?.toString()}
                  </div>
                </div>
                <div className="p-2">
                  <label className="form-label ml-2 ">
                    Loan Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...fields.loan_price_old}
                    type="text"
                    className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                      errors.loan_price_old ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.loan_price_old?.message?.toString()}
                  </div>
                </div>

                <div className="p-2">
                  <label className="form-label ml-2 ">
                    Interest Amount <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...fields.interest_old}
                    type="text"
                    className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                      errors.interest_old ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.interest_old?.message?.toString()}
                  </div>
                </div>
                {/* <div className="p-2">
                <label className="form-label ml-2 ">Status</label>

                <select
                  {...fields.status}
                  className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                    errors.status ? "is-invalid" : ""
                  }`}
                 
                >
                  <option value="">-select option</option>
                  <option className="PENDING">PENDING</option>
                  <option className="PROCESSING">PROCESSING</option>
                  <option className="APPROVED">APPROVED</option>
                  <option className="REJECTED">REJECTED</option>
                </select>

                <div className="invalid-feedback">
                  {errors.status?.message?.toString()}
                </div>
              </div> */}
              </div>


              <div className="grid grid-cols-1 md:grid-cols-2  border-t">
               

                <div className="p-2">
                  <label className="form-label ml-2 ">Branch</label>
                  <input
                    {...fields.mortgage_branch}
                    type="mortgage_branch"
                    className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                      errors.mortgage_branch ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.mortgage_branch?.message?.toString()}
                  </div>
                </div>

                <div className="p-2">
                  <label className="form-label ml-2 ">Mortgager Name</label>
                  <input
                    {...fields.mortgager_name}
                    type="mortgager_name"
                    className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                      errors.mortgager_name ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.mortgager_name?.message?.toString()}
                  </div>
                </div>

                <div className="p-2">
                  <label className="form-label ml-2 ">Contact </label>
                  <input
                    {...fields.mortgager_phone}
                    type="mortgager_phone"
                    className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                      errors.mortgager_phone ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.mortgager_phone?.message?.toString()}
                  </div>
                </div>
                <div></div>
                <div className="grid grid-cols-1 md:grid-cols-2 border-b">
                  <div className="p-2">
                    <label className="form-label ml-2 ">
                      Interest Rate % (Monthly)
                    </label>
                    <input
                      {...fields.mortgage_interest_rate_month}
                      type="mortgage_interest_rate_month"
                      className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                        errors.mortgage_interest_rate_month ? "is-invalid" : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.mortgage_interest_rate_month?.message?.toString()}
                    </div>
                  </div>

                  <div className="p-2">
                    {/* <div className="group w-72 md:w-80 lg:w-96">
      <label htmlFor="5" className="inline-block w-full text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Outline icon inline suffix</label>
      <div className="relative flex items-center">
        <input id="5" type="text" className="peer relative h-10 w-full rounded-md bg-gray-50 pl-4 pr-10 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 focus:drop-shadow-lg" />
        <span className="material-symbols-outlined absolute right-2 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">mail</span>
      </div>
    </div> */}
                    <div className="relative">
                      <label className="form-label ml-2 ">
                        Interest Rate % (Yearly)
                      </label>
                      <div className=" ">
                        <input
                          {...fields.mortgage_interest_rate_year}
                          type="mortgage_interest_rate_year"
                          className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                            errors.mortgage_interest_rate_year
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <div className="invalid-feedback">
                          {errors.mortgage_interest_rate_year?.message?.toString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 border-b">
                  <div className="p-2">
                    <label className="form-label ml-2 ">Loan Start Date</label>
                    <input
                      {...fields.mortgage_start_date}
                      type="date"
                      className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                        errors.mortgage_start_date ? "is-invalid" : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.mortgage_start_date?.message?.toString()}
                    </div>
                  </div>

                  <div className="p-2">
                    <label className="form-label ml-2 ">Loan End Date</label>
                    <input
                      {...fields.mortgage_end_date}
                      type="date"
                      className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                        errors.mortgage_end_date ? "is-invalid" : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.mortgage_end_date?.message?.toString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" border-gray-800 border-1 shadow-sm mb-3 mt-3">
              
              <div className="p-2">
                <div className="flex w-full  -mx-1 pt-2 border-b md:border-b-0">
                  <div className="px-1 w-full">
                    <label className="form-label ml-2 ">
                      Expected Price <span className="text-red-500">*</span>
                      {payment_values(
                        parseFloat(watchExpectedPriceOld),
                        parseFloat(status),
                        parseFloat(watchNoOfMonth)
                      )}{" "}
                    </label>

                    {/* <input
                      {...fields.expected_price_old}
                      type="text"
                      className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                        errors.expected_price_old ? "is-invalid" : ""
                      }`}
                      // onBlur={()=>()}
                      //  onChange={(e) => setExpected_price_old(e.target.value)}
                    /> */}
                    <input
                      {...fields.expected_price_old}
                      type="expected_price_old"
                      className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                        errors.expected_price_old ? "is-invalid" : ""
                      }`}

                      //  onChange={(e) => setExpected_price_old(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      {errors.expected_price_old?.message?.toString()}
                    </div>
                  </div>
                  <div className="px-1 ">
                    <div>
                     
                     
                      {/* {
                      
                      ((payment_values_amount(
                      parseFloat(watchExpectedPriceOld),
                      parseFloat(status),
                      parseFloat(watchNoOfMonth)
                    )) >0)?"":""
                    
                    } */}
                    {
                      parseFloat(watchExpectedPriceOld) <= max_price
                        ? ""
                        : <><br/></>
                    }


                      <label className="form-label  ">
                        No of Month
                        <span className="text-red-500">{" *"} </span>
                        <br />
                      </label>

                      {loan ? (
                        <>
                          <br />
                          Monthly Instalment :
                          {loan.expected_price_old <= max_price
                            ? installment(
                                parseFloat(loan.no_of_month),
                                parseFloat(loan.expected_price_old)
                              )
                            : installment(
                                parseFloat(loan.no_of_month),
                                parseFloat(max_price)
                              )}{" "}
                          - SAVED
                        </>
                      ) : (
                        <>
                          <br />
                          Monthly Instalment :
                          {expected_price <= max_price
                            ? installment(
                                parseFloat(watchNoOfMonth),
                                parseFloat(expected_price)
                              )
                            : installment(
                                parseFloat(watchNoOfMonth),
                                parseFloat(max_price)
                              )}
                        </>
                      )}

                      <select
                        {...fields.no_of_month}
                        className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                          errors.no_of_month ? "is-invalid" : ""
                        }`}
                      >
                        <option value="">-SELECT MONTH-</option>
                        <option value="60">60</option>
                        <option value="48">48</option>
                        <option value="36">36</option>
                        <option value="24">24</option>
                        <option value="18">18</option>
                        <option value="12">12</option>
                        <option value="6">6</option>
                      </select>

                      <div className="invalid-feedback">
                        {errors.no_of_month?.message?.toString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="invalid-feedback">
                  {errors.expected_price_old?.message?.toString()}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="p-2 ml-1">
                  <label className="form-label ml-2 ">
                    Loan Amount <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...fields.loan_amount}
                    type="text"
                    className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                      errors.loan_amount ? "is-invalid" : ""
                    }`}
                    value={
                      parseFloat(watchExpectedPriceOld) <= max_price
                        ? parseFloat(watchExpectedPriceOld).toFixed(2)
                        : max_price.toFixed(2)
                    }
                  />
                  <div className="invalid-feedback">
                    {errors.loan_amount?.message?.toString()}
                  </div>
                </div>
                <div className="p-2 ml-1">
                  <label className="form-label ml-2 ">
                    Payable in Hand <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...fields.payable_in_hand}
                    type="text"
                    className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                      errors.payable_in_hand ? "is-invalid" : ""
                    }`}
                    value={payment_values_amount(
                      parseFloat(watchExpectedPriceOld),
                      parseFloat(status),
                      parseFloat(watchNoOfMonth)
                    )}
                  />
                  {/* {(watchExpectedPriceOld - max_price).toFixed(2)}
                {payment_values_amount(
                    parseFloat(watchExpectedPriceOld),
                    parseFloat(status),
                    parseFloat(watchNoOfMonth)
                  )} */}
                  <div className="invalid-feedback">
                    {errors.payable_in_hand?.message?.toString()}
                  </div>
                </div>
                <div className="p-2 ml-1">
                  <label className="form-label ml-2 ">
                    Monthly Installment <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...fields.monthly_installment}
                    type="text"
                    className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                      errors.monthly_installment ? "is-invalid" : ""
                    }`}
                    value={installmentV(
                      watchExpectedPriceOld,
                      max_price,
                      watchNoOfMonth
                    )}
                  />
                  <div className="invalid-feedback">
                    {errors.monthly_installment?.message?.toString()}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-2">
                  <label className="form-label ml-2 ">
                    First Installment Date{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...fields.first_installment}
                    type="date"
                    className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                      errors.first_installment ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.first_installment?.message?.toString()}
                  </div>
                </div>

                <div className="p-2">
                  <label className="form-label ml-2 ">
                    Last Installment Date{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...fields.last_installment}
                    type="date"
                    className={`w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0 ${
                      errors.last_installment ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.last_installment?.message?.toString()}
                  </div>
                </div>

              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2"></div>
            <div className="my-3">
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
                className="btn btn-secondary bg-gray-900"
              >
                Reset
              </button>
              <Link href="/loans" className="btn btn-link">
                Cancel
              </Link>
            </div>
          </form>
          {loan && (
            <>
              <div className="flex  mt-3 pt-2 border-t">
                <h1 className="py-1 px-3 block text-base font-semibold  sm:text-xl w-full">
                  GUARANTOR DETAILS
                </h1>
                {loan ? (
                  <Button
                    variant="primary"
                    onClick={handleShow}
                    className="bg-blue-500 ml-2 btn-sm  whitespace-nowrap"
                  >
                    + New Guarantor
                  </Button>
                ) : (
                  ""
                )}
              </div>

              <div className="text-center bg-white shadow-md">
                {/* {JSON.stringify(loan?.guarantors)} */}
                {guarantorList.length > 0 ? "" : "No Guarantors Found"}
              </div>
              {}
{/* {JSON.stringify(guarantorList)} */}
              {/* {'user_id' in guarantorList[0]?"1":"0"} */}




              <div className="grid grid-cols-1 space-x-1 bg-white md:grid-cols-2 p-1 ">
{guarantorList?.length>0? ('user_id' in guarantorList[0]) ?<>


                {guarantorList.length>0?<>
                
                {
                  
                
                guarantorList.map((i: any) => (
                  <div key={i?._id}>
                    {loan ? (
                      <div>
                        <div
                          className={`bg-white mb-2 m-1 p-3  border-1 shadow-md`}
                        >
                          <div className="bg-white ">
                            <div className=" flex items-center justify-between leading-none  ">
                              <Link
                                className="flex items-center no-underline  text-black"
                                href={`/users/edit/${i?._id}?id=${loan._id}`}
                              >
                                {/* {i.guarantor._id} */}
                                <FaUserCircle className="float-left  text-5xl" />
                                <div className="text-xl -mt-3">
                                  <div className="text-gray-800 mt-1 p-1 font-bold">
                                    <span>{i?.user?.fullName + " "}</span>
                                  </div>
                                </div>
                              </Link>
                              <button
                                onClick={() =>
                                  submitHandlerDelUser(loan?.id, {
                                    name: i?._id,
                                  })
                                }
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
                              </button>
                            </div>
                          </div>
                          <div className=" md:mb-1 md:flex items-center">
                            <label className=" text-gray-800 block font-bold text-sm uppercase tracking-wide">
                              NIC
                            </label>
                            <span className="mr-4 inline-block  md:block">
                              :
                            </span>
                            <div className="flex-1">{i?.user?.nic}</div>
                          </div>
                          <div className="mb-2 md:mb-1 md:flex items-center">
                            <label className=" text-gray-800 block font-bold text-sm uppercase tracking-wide">
                              Relationship
                            </label>
                            <span className="mr-4 inline-block  md:block">
                              :
                            </span>
                            <div className="flex-1">{i?.relationship}</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
                
                </>:""}


</>:"" :""}
              </div>

              <>
                <Offcanvas show={show} onHide={handleClose}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Guarantors</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <AddEditGuarantor title="ADD GUARANTOR" loan={loan} />
                  </Offcanvas.Body>
                </Offcanvas>
              </>
            </>
          )}
        </div>

        {loan ? (
          <>
            <form
              onSubmit={submitHandler}
              className=" p-2 shadow-sm bg-gray-800 text-white border mt-5"
              style={{ overflow: "hidden" }}
            >
              <div className="flex flex-col md:flex-row -mx-1  border-b text-white bg-gray-900">
                <div className="px-1">
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                </div>
                <div className="px-1  text-right m-1 border-1">
                  Total Weight : {itm_total_weight.toFixed(4)}
                </div>
                <div className="px-1  text-right m-1 border-1">
                  Net Weight : {itm_total_net.toFixed(4)}
                </div>
                <div className="px-1  text-right m-1 border-1">
                  Total Pound : {total_pounds.toFixed(4)}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 ">
                <div className="w-full md:w-full px-3 mb-2 mt-2">
                  <h2 className=" text-gray-800 text-lg">
                    <div className="flex flex-col md:flex-row -mx-1 ">
                      <div className="w-full text-blue-100 ">
                        <br />
                        Items
                        <span className="bg-dark ml-2 text-blue-100 py-0 px-2 rounded-full text-sm border-1 ">
                          NO OF ITEMS : {reviews.length}
                        </span>
                      </div>

                      <div className="px-1  text-right text-white m-1 mt-0 border-1">
                        <span className=" whitespace-nowrap">
                          Amount per pound{" "}
                        </span>{" "}
                        <br />
                        <div className="bg-gray-800 text-white px-2">
                          {actual_karat(gPr).value}
                        </div>
                      </div>
                      <div className="px-1  text-right text-white m-1 mt-0 border-1">
                        Issuable
                        <br />
                        <div className="bg-gray-800 text-white px-2">
                          {(
                            actual_karat(gPr).value *
                            (parseFloat(net_weight) / 8)
                          ).toFixed(2)}
                        </div>
                      </div>
                      <div className="text-right whitespace-nowrap border">
                        <span
                          className={
                            net_weight == total_weight
                              ? "bg-gray-800 text-white px-2"
                              : "bg-red-500 text-white px-2"
                          }
                        >
                          Actual Karat :{" "}
                          {
                            actual_karat(
                              (parseFloat(net_weight) /
                                parseFloat(total_weight)) *
                                100
                            ).karat
                          }{" "}
                        </span>
                        <br />
                        Karat Percentage : {gPr.toFixed(2)}%
                      </div>
                    </div>
                  </h2>
                  <div>
                    <div className="flex  flex-col md:flex-row -mx-1 py-2 ">
                      <div className="px-1  text-right">
                        <label className="text-left w-full ml-2 text-sm">
                          Description
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setItmName(e.target.value)}
                          value={name}
                          name="name"
                          className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0"
                          placeholder="Description"
                          required
                        />
                      </div>
                      <div className="px-1  text-right">
                        <label className="text-left w-full ml-2 text-sm">
                          Karat
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setKarat(e.target.value)}
                          value={karat}
                          name="karat"
                          className=" w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0"
                          placeholder="Karat"
                          required
                        />
                      </div>

                      <div className="px-1  text-right">
                        <label className="text-left w-full ml-2 text-sm">
                          Total Weight
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setTotal_weight(e.target.value)}
                          value={total_weight}
                          name="total_weight"
                          className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0"
                          placeholder="Total Weight"
                          required
                        />
                      </div>
                      <div className="px-1  text-right">
                        <label className="text-left w-full ml-2 text-sm">
                          Net Weight
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setNet_weight(e.target.value)}
                          value={net_weight}
                          name="net_weight"
                          className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0"
                          placeholder="Net Weight"
                          required
                        />
                      </div>
                      <div className="px-1  text-right">
                        <label className="text-left w-full ml-2 text-sm">
                          Pound
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setPound(e.target.value)}
                          value={net_weight_cal}
                          name="pound"
                          className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0"
                          placeholder="Pound"
                          required
                        />
                      </div>

                      <div className="px-1  text-right">
                        <label className="text-left w-full ml-2 text-sm">
                          Condition
                        </label>
                        <select
                          onChange={(e) => setStatus(e.target.value)}
                          name="status"
                          className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-0"
                        >
                          <option>NOT ISSUE</option>
                          <option>ISSUE</option>
                        </select>
                      </div>
                      <div className="px-1 pt-1  text-right">
                        <label className="text-left w-full ml-2 text-sm">
                          &nbsp;
                        </label>

                        <button
                          className="text-red-500 hover:text-red-600 text-sm font-semibold mt-1"
                          type="reset"
                        >
                          RESET
                        </button>
                      </div>
                    </div>
                    <div className="border-gray-800 border-b border-b-1 pb-2">
                      {" "}
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary me-2 mt-1 bg-blue-700"
                      >
                        {loading && (
                          <span className="spinner-border spinner-border-sm me-1"></span>
                        )}
                        ADD ITEMS
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-2 ">
                {reviews.map((i: any) => (
                  <div key={n++}>
                    <div className="bg-gray-800 text-sm">
                      <span>
                        <span className="font-bold text-white ml-2">
                          {i?.name}
                        </span>{" "}
                        &nbsp;
                        <span className="  text-orange-300 rounded-sm px-2 mr-3">
                          Karat : {i?.karat}
                        </span>
                        <span
                          className={`${
                            (i?.net_weight / i?.total_weight) * 100 == 100
                              ? " text-orange-300"
                              : " text-red-500 "
                          }  rounded-sm px-2 mr-3`}
                        >
                          Actual :{" "}
                          {
                            actual_karat(
                              (i?.net_weight / i?.total_weight) * 100
                            ).karat
                          }
                        </span>
                        {i?.status == "NOT ISSUE" ? (
                          <span className="bg-green-700 text-blue-100 py-0 px-2  text-sm ">
                            {i?.status}
                          </span>
                        ) : (
                          <span className="bg-red-600 text-blue-100 py-0 px-2  text-sm ">
                            {i?.status}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex w-full flex-col md:flex-row  p-1 border-b    shadow-sm  mb-1 border-1 border-gray-800">
                      <div className="flex-2 px-1 w-full">
                        <div className="ml-2 text-sm">
                          <div>
                            <div className="flex w-full flex-col md:flex-row -mx-1 pt-2 border-b md:border-b-0">
                              <div className="bg-white text-gray-800 px-1 text-xs rounded-sm  mr-1 mb-1 md:mb-0 ">
                                TOTAL WEIGHT - {i?.total_weight}
                              </div>
                              <div className="bg-white text-gray-800 px-1 text-xs rounded-sm  mr-1 mb-1 md:mb-0 ">
                                NET WEIGHT - {i?.net_weight}
                              </div>
                              <div className="bg-white text-gray-800 px-1 text-xs rounded-sm  mr-1 mb-1 md:mb-0 ">
                                POUNDS - {i?.pound}
                              </div>
                            </div>
                            <div className="flex w-full flex-col md:flex-row -mx-1 pt-2 border-b md:border-b-0 border-t">
                              <span
                                className={`text-gray-800 px-2 ${
                                  (i?.net_weight / i?.total_weight) * 100 == 100
                                    ? "  border-1 border-orange-600"
                                    : "  border-1 border-red-500 "
                                }`}
                              >
                                GOLD PERCENTAGE -{" "}
                                {parseFloat(
                                  (
                                    (i?.net_weight / i?.total_weight) *
                                    100
                                  ).toString()
                                ).toFixed(2)}
                                %
                              </span>
                              <span
                                className={`md:ml-1 ${
                                  (i?.net_weight / i?.total_weight) * 100 == 100
                                    ? " bg-orange-300"
                                    : " bg-red-500 text-white"
                                }   px-2 md:mr-3`}
                              >
                                Amount per pound :{" "}
                                {
                                  actual_karat(
                                    (i?.net_weight / i?.total_weight) * 100
                                  ).value
                                }
                              </span>

                              <span
                                className={`md:ml-1 ${
                                  (i?.net_weight / i?.total_weight) * 100 == 100
                                    ? " bg-orange-300"
                                    : " bg-red-500 text-white"
                                }   px-2 md:mr-3`}
                              >
                                Amount :{" "}
                                {(
                                  actual_karat(
                                    (i?.net_weight / i?.total_weight) * 100
                                  ).value * i?.pound
                                ).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-1 text-right">
                        <button
                          onClick={() =>
                            submitHandlerDel(loan?.id, { name: i?._id })
                          }
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
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="container bg-white shadow-sm">
              <div className="flex-row">
                <div className="flex-large">
                  <div>
                    <h2 className="text-xl font-bold ml-2">
                      {editing ? "Edit Item" : "ADD ITEM"}
                    </h2>
                    <EditTaskForm
                      editing={editing}
                      setEditing={setEditing}
                      currentTask={currentTask}
                      setCurrentTask={setCurrentTask}
                      updateTask={updateTask}
                      addTask={addTask}
                      tasks={tasks}
                      rate={rate}
                    />
                  </div>
                </div>
                <div className="flex-large">
                  <TaskTable
                    tasks={tasks}
                    rate={rate}
                    editRow={editRow}
                    deleteTask={deleteTask}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </>
      {/* // ) : (
      //   ""
      // )} */}

      <div className="fixed bottom-0 right-0 text-red-600">
        {loading && (
          <>
            <span className="spinner-border spinner-border-sm text-red-600"></span>{" "}
            Loading
          </>
        )}
      </div>
      <div
        className={`fixed left-0 bottom-0 h-1 ${
          loan
            ? loan?.items?.length > 0
              ? "bg-yellow-500"
              : "bg-red-600"
            : tasks.length > 0
            ? "bg-blue-500"
            : "bg-red-600"
        }  w-full`}
      ></div>
    </>
  );
}
