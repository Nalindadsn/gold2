"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAlertService, useLoanService } from "_services";
import { useCallback, useEffect,useState } from "react";
import axios from "axios";
export { AddEdit };

function AddEdit({ title, loan,user }: { title: string; loan?: any ;user?:any}) {
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
    const dataV=data;
    dataV.user_id="64e5a42d5b71e33051b67ef6"
    try {
      // create or update loan based on loan prop
      let message;
      if (loan) {
        await loanService.update(loan.id, dataV);
        message = "Loan updated";
      } else {
        await loanService.create(dataV);
        message = "Loan added";
      }

      // redirect to loan list with success message
      router.push(`/loans`);
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
        fetchReviews();
        setLoading(false);
        //enqueueSnackbar('Review submitted successfully', { variant: 'success' });
  
        // toast.success('Review submitted successfully');
      } catch (err) {
        setLoading(false);
  
        // toast.success(err);
      }
    };
    const fetchReviews = useCallback(async () => {
      try {
        const { data } = await axios.get(`/api/loans/${loan.id}`);
        setReviews(data.items);
      } catch (err) {
        //enqueueSnackbar(getError(err), { variant: 'error' });
      }
    }, []);
    let n:any=1;
    const net_weight_cal: any = (parseFloat(net_weight) / 8).toFixed(4);
    useEffect(() => {
      // async () => {
      fetchReviews();
    }, [fetchReviews]);
  
  return (
    <>
    
    
    <>
      {/* {console.log(loan)} */}
      <div style={{ overflow: "hidden" }}>{JSON.stringify(loan)}</div>

      <form 
        onSubmit={submitHandler}
        className="bg-white p-2 mt-4"
        style={{ overflow: "hidden" }}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">items</h2>
          <div className="w-full md:w-full px-3 mb-2 mt-2">
            items
            <div></div>
            <div  style={{overflowX:"auto"}}>
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
                  <select
                    onChange={(e) => setStatus(e.target.value)}
                    name="status"
                    className="form-control"
                  >
                    <option>NOT ISSUE</option>
                    <option>ISSUE</option>
                  </select>
                </div>
                <div className="px-1 w-20 text-right">
                  
                  <button className="text-red-500 hover:text-red-600 text-sm font-semibold mt-1" type="reset">
                    RESET
                  </button>
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
      </form>
<div className="bg-white p-2 mt-4">

      {reviews.map((i: any) => (
        <>
        
          <article className="overflow-hidden rounded-lg shadow-lg bg-gray-800 mb-3">
            <div className="flex items-center justify-between leading-none p-2 md:p-4">
              <a
                className="flex items-center no-underline  text-black"
                href="#"
              >
                <span className="bg-orange-300 rounded-lg p-3 mr-3">{n++}</span>
                <p className="ml-2 text-sm">
                  <span className="text-white">{i?.name} &nbsp;
                  {
                    i?.status=="NOT ISSUE"?(
                      <span className="bg-green-700 text-blue-100 py-0 px-2 rounded-full text-sm ">{i?.status}</span>

                    ):(
                      <span className="bg-red-600 text-blue-100 py-0 px-2 rounded-full text-sm ">{i?.status}</span>

                    )
                  }
              </span>
                  <br />
                  <div>
                    
                    <span className="bg-white text-gray-800 px-1 text-xs rounded-sm mt-20 mr-1 ">
                      TOTAL WEIGHT - {i?.total_weight}
                    </span>
                    <span className="bg-white text-gray-800 px-1 text-xs rounded-sm mt-20 mr-1">
                      NET WEIGHT - {i?.net_weight}
                    </span>
                    <span className="bg-white text-gray-800 px-1 text-xs rounded-sm mt-20 mr-1">
                      POUNDS - {i?.net_weight}
                    </span>
                  </div>
                </p>
              </a>
              
          <button
            onClick={() => loanService.deleteItem(loan.id, i._id)}
            className="btn btn-sm btn-danger btn-delete-loan"
            style={{ width: "60px" }}
            disabled={true}
            // disabled={loan.isDeleting}
          >
            {loan.isDeleting ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              <span>Delete</span>
            )}
          </button>
            </div>
          </article>

        </>
      ))}
</div>
    </>
    <form onSubmit={handleSubmit(onSubmit)} 
    className="bg-white p-2 mt-4"
    style={{ marginLeft: '5%', marginRight: '5%' }}>
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

      <div className="grid grid-cols-1 md:grid-cols-2">
<div>a</div>
<div>b</div>
<div>a</div>
<div>b</div>
</div>

        <div className="mb-3 col">
          <label className="form-label">Estimated Price (Old)</label>
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
          <label className="form-label">Loan Price (Old)</label>
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
          <label className="form-label">Interest (Old)</label>
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
            Expected Price (Old)
            
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
    
    </>
  );
}
