"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAlertService, useSettingService } from "_services";
export { AddEdit };
import { useState } from "react";

function AddEdit({
  title,
  setting,
}: {
  title: string;
  setting?: any;
}) {
  const router = useRouter();
  const alertService = useAlertService();
  const settingService = useSettingService();

  const settingCurrent: any = settingService.currentSetting;

  const [settingname, setSettingname] = useState("");
  // get functions to build form with useForm() hook
  const uData:any=setting
  

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: setting,
    mode:'onChange'
});
  const { errors } = formState;
//   const watchFullName = watch("company", false); // you can supply default value as second argument

  const fields = {
    

    company: register("company", {}),

    risk_management_value: register("risk_management_value", { required: "Gold setting is required" }),

  };
  async function onSubmit(data: any) {
    alertService.clear();
    try {
      // create or update setting based on setting prop
      let message;
      if (setting) {
        await settingService.update(setting._id, data);
        router.push(`/settings`)
        message = "Setting updated";
      } else {
        await settingService.create(data);
        router.push(`/settings`)
        message = "Setting added";
      }
      // redirect to setting list with success message
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
            <label className="form-label">Setting</label>
            <input
              {...register("risk_management_value", { required: "Company Name is required-" })}
              type="text"
              className={`form-control ${errors.risk_management_value ? "is-invalid" : ""}`}
            />
            {/* {watchFullName} */}
            <div className="invalid-feedback">
              {errors.risk_management_value?.message?.toString()}
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
          <Link href="/settings" className="btn btn-link">
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}
