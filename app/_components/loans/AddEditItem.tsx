"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAlertService, useLoanService } from "_services";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
export { AddEditItem };

function AddEditItem({ title, loan }: { title: string; loan?: any }) {
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
  };

  async function onSubmit(data: any) {
    alertService.clear();
    try {
      // create or update loan based on loan prop
      let message;
      if (loan) {
        await loanService.update(loan.id, data);
        message = "Loan updated";
      } else {
        await loanService.create(data);
        message = "Loan added";
      }

      // redirect to loan list with success message
      // router.refresh()
      alertService.success(message, true);
    } catch (error: any) {
      alertService.error(error);
    }
  }
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
  const arr = loan?.items ? loan?.items : [];

  const total_pounds = arr.reduce(function (acc: any, obj: any) {
    return acc ? acc : 0 + parseFloat(obj.net_weight) / 8;
  }, 0);

  const old_mkt_price = (loan?.estimated_price_old / total_pounds).toFixed(2);
  const old_cmp_price = (loan?.loan_price_old / total_pounds).toFixed(2);
  const old_exp_price = (loan?.expected_price_old / total_pounds).toFixed(2);
  const basic_estimate = (130000 * total_pounds).toFixed(2);
  const basic_estimate_final = loan?.expected_price_old;
  //Math.round(loan.expected_price_old / 1000) * 1000 + 1000;

  const [reviews, setReviews] = useState([]);
  const [itmName, setItmName] = useState("0");
  const [karat, setKarat] = useState("0");
  const [net_weight, setNet_weight] = useState("0");
  const [total_weight, setTotal_weight] = useState("0");
  const [pound, setPound] = useState("0");
  const [status, setStatus] = useState("NOT ISSUE");

  const [loading, setLoading] = useState(false);
  // --------------------------------------------------------
  const submitHandler = async (e: any) => {
    e.preventDefault();
    // console.log(itmName)
    setLoading(true);
    try {
      const data: any = {
        itmName: itmName,
        karat: karat,
        net_weight: net_weight,
        total_weight: total_weight,
        pound: pound,
        status: status ? status : "NOT ISSUE",
      };
      await loanService.updateItem(loan.id, data);
      setLoading(false);
      //enqueueSnackbar('Review submitted successfully', { variant: 'success' });

      // toast.success('Review submitted successfully');
      fetchReviews();
    } catch (err) {
      setLoading(false);

      // toast.success(err);
    }
  };
  const fetchReviews = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/loans/${loan.id}`);
      setReviews(data);
    } catch (err) {
      //enqueueSnackbar(getError(err), { variant: 'error' });
    }
  }, []);
  const net_weight_cal: any = (parseFloat(net_weight) / 8).toFixed(4);
  useEffect(() => {
    // async () => {
    fetchReviews();
  }, [fetchReviews]);
  return (
    <>
      {/* {console.log(loan)} */}
      {JSON.stringify(loan)}
      <form
        onSubmit={submitHandler}
        className="bg-white p-2 mt-4"
        style={{ marginLeft: "5%", marginRight: "5%" }}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">items</h2>
          <div className="w-full md:w-full px-3 mb-2 mt-2">
            items
            <div></div>
            <div>


              <div className="flex -mx-1 py-2 border-b">
                <div className="flex-1 px-1">
                    
              <input
                type="text"
                onChange={(e) => setItmName(e.target.value)}
                name="itmName"
                className="form-control"
                placeholder="Description"
              />
                </div>
                <div className="px-1 w-20 text-right">
                  
              <input
                type="text"
                onChange={(e) => setKarat(e.target.value)}
                name="karat"
                className="form-control"
                placeholder="Karat"
              />
                </div>
                <div className="px-1 w-20 text-right">
              <input
                type="text"
                onChange={(e) => setNet_weight(e.target.value)}
                name="net_weight"
                className="form-control"
                placeholder="Net Weight"
              />
                </div>
                <div className="px-1 w-20 text-right">
              <input
                type="text"
                onChange={(e) => setTotal_weight(e.target.value)}
                name="total_weight"
                className="form-control"
                placeholder="Total Weight"
              />
                </div>
                <div className="px-1 w-32 text-right">
                  
              <input
                type="text"
                onChange={(e) => setPound(e.target.value)}
                value={net_weight_cal}
                name="pound"
                className="form-control"
                placeholder="Pound"
              />
                </div>
                <div className="px-1 w-32 text-right">
                 
              <select onChange={(e) => setStatus(e.target.value)} name="status" 
                className="form-control">
                <option>NOT ISSUE</option>
                <option>ISSUE</option>
              </select>
                </div>
                <div className="px-1 w-20 text-right">
                  <a
                    href="#"
                    className="text-red-500 hover:text-red-600 text-sm font-semibold"
                  >
                    Delete
                  </a>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary me-2 bg-blue-700"
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm me-1"></span>
                )}
                Add Item
              </button>

              <button type="submit">Submit</button>

              {loading && "..."}
            </div>
          </div>
          
        </div>

        {JSON.stringify(reviews)}
      </form>
    </>
  );
}
