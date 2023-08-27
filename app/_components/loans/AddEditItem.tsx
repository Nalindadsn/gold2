"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAlertService, useLoanService } from "_services";
import { useState,useCallback } from "react";
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
      router.push(`/loans/edit/${loan.id}`);
      // router.refresh()
      alertService.success(message, true);
    } catch (error: any) {
      alertService.error(error);
    }
  }
  const installment = (n: any,value:any) => {
    
    switch (n) {
      case 60:
        var val = ((value*250 )/100 )/60;
        
        break;
      case 48:
        var val = ((220 * value) / 100) / 48;
        break;
      case 36:
        var val = ((190 * value) / 100) / 36;
        break;
      case 24:
        var val = ((160 * value) / 100) / 24;
        break;
      case 18:
        var val = ((145 * value) / 100) / 18;
        break;
      case 12:
        var val = ((130 * value) / 100) / 12;
        break;
      case 6:
        var val = ((115 * value) / 100) / 6;
        break;

      default:
        var val= 0;
        break;
    }
    return val.toFixed(2);
  };
  const arr = (loan?.items)? loan?.items:[];

  const total_pounds = arr.reduce(function (acc: any, obj: any) {
    return (acc?acc:0 + parseFloat(obj.net_weight)/8);
  }, 0);

  const old_mkt_price = (loan?.estimated_price_old / total_pounds).toFixed(2);
  const old_cmp_price = (loan?.loan_price_old / total_pounds).toFixed(2);
  const old_exp_price = (loan?.expected_price_old / total_pounds).toFixed(2);
  const basic_estimate = (130000 * total_pounds).toFixed(2);
  const basic_estimate_final =loan?.expected_price_old
    //Math.round(loan.expected_price_old / 1000) * 1000 + 1000;





    const [reviews, setReviews] = useState([]);
    const [estimated_price_old, setEstimated_price_old] = useState("4");
    const [loan_price_old, setLoan_price_old] = useState("5");
    const [interest_old, setInterest_old] = useState("6");
    const [expected_price_old, setExpected_price_old] = useState("7");



    const [loading, setLoading] = useState(false);
    // --------------------------------------------------------
    const submitHandler = async (e:any) => {
      e.preventDefault();
      setLoading(true);
      try {
        await axios.post(
          `/api/loans`,
          {
            estimated_price_old,
            loan_price_old,
            interest_old,
            expected_price_old
          }
          // {
          //   headers: { authorization: `Bearer ${userInfo.token}` },
          // }
        );
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
        const { data } = await axios.get(`/api/loans`);
        setReviews(data);
      } catch (err) {
        //enqueueSnackbar(getError(err), { variant: 'error' });
      }
    }, []);
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      {JSON.stringify(loan?.items)}
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
      ----installments-60-{JSON.stringify(installment(60,basic_estimate_final))}----
      <br />
      ----installments-48-{JSON.stringify(installment(48,basic_estimate_final))}----
      <br />
      ----installments-36-{JSON.stringify(installment(36,basic_estimate_final))}----
      <br />
      ----installments-24-{JSON.stringify(installment(24,basic_estimate_final))}----
      <br />
      ----installments-18-{JSON.stringify(installment(18,basic_estimate_final))}----
      <br />
      ----installments-12-{JSON.stringify(installment(12,basic_estimate_final))}----
      <br />
      ----installments-6-{JSON.stringify(installment(6,basic_estimate_final))}----
      <br />
      <h1>{title}</h1>
      <div className="row">
        <div className="mb-3 col">
          <label className="form-label">estimated_price_old</label>
          <input
            {...fields.estimated_price_old}
            type="text"
            className={`form-control ${
              errors.estimated_price_old ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback">
            {errors.estimated_price_old?.message?.toString()}
          </div>
        </div>
        <div className="mb-3 col">
          <label className="form-label">loan_price_old</label>
          <input
            {...fields.loan_price_old}
            type="text"
            className={`form-control ${
              errors.loan_price_old ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback">
            {errors.loan_price_old?.message?.toString()}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="mb-3 col">
          <label className="form-label">interest_old</label>
          <input
            {...fields.interest_old}
            type="text"
            className={`form-control ${
              errors.interest_old ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback">
            {errors.interest_old?.message?.toString()}
          </div>
        </div>
        <div className="mb-3 col">
          <label className="form-label">
            expected_price_old
            {loan && (
              <em className="ms-1">
                (Leave blank to keep the same expected_price_old)
              </em>
            )}
          </label>
          <input
            {...fields.expected_price_old}
            type="expected_price_old"
            className={`form-control ${
              errors.expected_price_old ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback">
            {errors.expected_price_old?.message?.toString()}
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
            <form
            onSubmit={submitHandler}
            className="bg-white p-2 mt-4"
            style={{ marginLeft: '5%', marginRight: '5%' }}
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
                Write a review
              </h2>
              <div className="w-full md:w-full px-3 mb-2 mt-2">
                review
              
                <div></div>
                <div>
                  <input type="text"  onChange={(e) => setEstimated_price_old(e.target.value)}
                  name="review"/>
                  <input type="text"  onChange={(e) => setLoan_price_old(e.target.value)}
                  name="review"/>
                  <input type="text"  onChange={(e) => setInterest_old(e.target.value)}
                  name="review"/>
                  <input type="text"  onChange={(e) => setExpected_price_old(e.target.value)}
                  name="review"/>
                  <button type="submit">Submit</button>
  
                  {loading && '...'}
                </div>
              </div>
              <div className="w-full md:w-full flex items-start md:w-full px-3">
                <div className="-mr-1">
                  <input
                    type="submit"
                    className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                    value="Post Comment"
                  />
                </div>
              </div>
            </div>
          </form>
          {JSON.stringify(reviews)}

</>
  );
}
