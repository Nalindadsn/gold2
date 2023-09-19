"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAlertService, useRateService } from "_services";
export { AddEdit };
import { useState } from "react";

function AddEdit({
  title,
  rate,
}: {
  title: string;
  rate?: any;
}) {
  const router = useRouter();
  const alertService = useAlertService();
  const rateService = useRateService();

  const rateCurrent: any = rateService.currentRate;

  const [ratename, setRatename] = useState("");
  // get functions to build form with useForm() hook
  const uData:any=rate
  

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: rate,
    mode:'onChange'
});
  const { errors } = formState;
//   const watchFullName = watch("company", false); // you can supply default value as second argument

  const fields = {
    

    company: register("company", {}),

    gold_rate: register("gold_rate", { required: "Gold rate is required" }),

  };
  async function onSubmit(data: any) {
    alertService.clear();
    try {
      // create or update rate based on rate prop
      let message;
      if (rate) {
        await rateService.update(rate._id, data);
        router.push(`/gold-rates`)
        message = "Rate updated";
      } else {
        await rateService.create(data);
        router.push(`/gold-rates`)
        message = "Rate added";
      }
      // redirect to rate list with success message
      alertService.success(message, true);
    } catch (error: any) {
      alertService.error(error);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold  pt-2 tracking-wider uppercase ml- ">
        {title}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className=" bg-white p-2">

        <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 pb-2">
          <div className="p-2">
            <label className="form-label">Company Name</label>
            <input
              {...register("company", { required: "Company Name is required-" })}
              type="text"
              className={`form-control ${errors.company ? "is-invalid" : ""}`}
            />
            {/* {watchFullName} */}
            <div className="invalid-feedback">
              {errors.company?.message?.toString()}
            </div>
          </div>
          <div className="p-2">
            <label className="form-label">Rate</label>
            <input
              {...register("gold_rate", { required: "Company Name is required-" })}
              type="text"
              className={`form-control ${errors.gold_rate ? "is-invalid" : ""}`}
            />
            {/* {watchFullName} */}
            <div className="invalid-feedback">
              {errors.gold_rate?.message?.toString()}
            </div>
          </div>
          
        </div>

        

        <div className="p-2">

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
          <Link href="/rates" className="btn btn-link">
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}
