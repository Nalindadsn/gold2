"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAlertService, useUserService } from "_services";
export { AddEdit };
import { useState } from "react";
import App from "_components/select";

function AddEdit({
  title,
  user,
  loan_id,
}: {
  title: string;
  user?: any;
  loan_id?: any;
}) {
  const router = useRouter();
  const alertService = useAlertService();
  const userService = useUserService();

  const userCurrent: any = userService.currentUser;

  const [username, setUsername] = useState("");
  // get functions to build form with useForm() hook
  const uData:any=user
  if(user){
  uData.line_one_fixed=user?.address_fixed?.line_one
  uData.line_two_fixed=user?.address_fixed?.line_two
  uData.line_three_fixed=user?.address_fixed?.line_three
  uData.zip_fixed=user?.address_fixed?.zip
  uData.ds_office_fixed=user?.address_fixed?.ds_office
  uData.district_fixed=user?.address_fixed?.district

  uData.line_one_tmp=user?.address_tmp?.line_one
  uData.line_two_tmp=user?.address_tmp?.line_two
  uData.line_three_tmp=user?.address_tmp?.line_three
  uData.zip_tmp=user?.address_tmp?.zip
  uData.ds_office_tmp=user?.address_tmp?.ds_office
  uData.district_tmp=user?.address_tmp?.district
  }

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: user,
    mode:'onChange'
});
  const { errors } = formState;
//   const watchFullName = watch("fullName", false); // you can supply default value as second argument

  const fields = {
    fullName: register("fullName", { required: "Full Name is required" }),
    gender: register("gender", {
      required: "Gender is required",
    }),

    username: register("username", {}),

    line_one_fixed: register("line_one_fixed", {}),
    line_two_fixed: register("line_two_fixed", {}),
    line_three_fixed: register("line_three_fixed", {}),
    zip_fixed: register("zip_fixed", {}),
    ds_office_fixed: register("ds_office_fixed", {}),
    district_fixed: register("district_fixed", {}),

    
    line_one_tmp: register("line_one_tmp", {}),
    line_two_tmp: register("line_two_tmp", {}),
    line_three_tmp: register("line_three_tmp", {}),
    zip_tmp: register("zip_tmp", {}),
    ds_office_tmp: register("ds_office_tmp", {}),
    district_tmp: register("district_tmp", {}),

    

    occupation: register("occupation", { required: "Occupation is required" }),
    nature_of_emp: register("nature_of_emp", {
      required: "Nature of Emp is required",
    }),
    name_of_office: register("name_of_office", {
      required: "Office is required",
    }),
    income: register("income", { required: "Income is required" }),
    phone: register("phone", {
      required: "Mobile Number is required",
      pattern: {
        value: /^[0-9]+$/,
        message: "Please enter a number",
      },
      validate: {
        minLength: (v) => v.length == 10,
      },
    }),
    nic: register("nic", {
      required: "NIC is required",
      validate: {
        minLength: (v) => v.length == 10 || v.length == 12,
      },
    }),
    whatsapp: register("whatsapp", {
      required: "Mobile Number is required",
      pattern: {
        value: /^[0-9]+$/,
        message: "Please enter a number",
      },
      validate: {
        minLength: (v) => v.length == 10,
      },
    }),
    role: register("role", { required: "role is required" }),
    status: register("status", { required: "status is required" }),

  };
  async function onSubmit(data: any) {
    alertService.clear();
    try {
      // create or update user based on user prop
      let message;
      if (user) {
        await userService.update(user.id, data);
        message = "User updated";
      } else {
        await userService.create(data);
        message = "User added";
      }
      // redirect to user list with success message
      if (loan_id) {
        router.push(`/loans/edit/${loan_id}`);
      } else {
        router.push(`/users`);
      }
      alertService.success(message, true);
    } catch (error: any) {
      alertService.error(error);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold  pt-2 tracking-wider uppercase  ">
        {loan_id?"UPDATE GUARANTOR":title}
        <App/>
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className=" bg-white p-2">
        <h1 className="font-bold m-1">Basic Information</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 pb-2">
          <div className="p-2">
            <label className="form-label">Full Name</label>
            <input
              {...register("fullName", { required: "Full Name is required-" })}
              type="text"
              className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
            />
            {/* {watchFullName} */}
            <div className="invalid-feedback">
              {errors.fullName?.message?.toString()}
            </div>
          </div>
          <div className="p-2">
            <label className="form-label">Gender</label>
            
            <select  {...fields.gender}  className={`form-control ${errors.gender ? 'is-invalid' : ''}`} > 
                    <option value="">-SELECT-</option>
                    <option value="MALE">MALE</option>
                        <option value="FEMALE">FEMALE</option>
                    </select>


            <div className="invalid-feedback">
              {errors.gender?.message?.toString()}
            </div>
          </div>

          <div className="p-2">
            <label className="form-label">nic</label>
            <input
              {...fields.nic}
              type="text"
              className={`form-control ${errors.nic ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">
              {errors.nic?.message?.toString()}
            </div>
          </div>

          <div className="p-2 hidden">
            <label className="form-label">Username</label>
            <input
              {...fields.username}
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              value={username}
            />
            <div className="invalid-feedback">
              {errors.username?.message?.toString()}
            </div>
          </div>

          <div className="p-2">
            <label className="form-label">phone</label>
            <input
              {...fields.phone}
              type="text"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">
              {errors.phone?.message?.toString()}
            </div>
          </div>
          <div className="p-2">
            <label className="form-label">whatsapp</label>
            <input
              {...fields.whatsapp}
              type="text"
              className={`form-control ${errors.whatsapp ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">
              {errors.whatsapp?.message?.toString()}
            </div>
          </div>
        </div>

        <h1 className="font-bold m-1">Employment Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 pb-2  border">
          <div className="p-2">
            <label className="form-label">Occupation</label>
            <input
              {...fields.occupation}
              type="text"
              className={`form-control ${
                errors.occupation ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.occupation?.message?.toString()}
            </div>
          </div>

          <div className="p-2">
            <label className="form-label">Company Type</label>
            <input
              {...fields.nature_of_emp}
              type="text"
              className={`form-control ${
                errors.nature_of_emp ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.nature_of_emp?.message?.toString()}
            </div>
          </div>
          <div className="p-2">
            <label className="form-label">Work Place</label>
            <input
              {...fields.name_of_office}
              type="text"
              className={`form-control ${
                errors.name_of_office ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.name_of_office?.message?.toString()}
            </div>
          </div>

          <div className="p-2">
            <label className="form-label">income</label>
            <input
              {...fields.income}
              type="text"
              className={`form-control ${errors.income ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">
              {errors.income?.message?.toString()}
            </div>
          </div>
        </div>

        <h1 className="font-bold mt-1 bg-gray-800 text-white text-2xl p-2">Residential Details</h1>
        <h1 className="font-bold px-3 bg-gray-100">Permanent Address</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 pb-2 border">
        <div className="p-2">
            <label className="form-label">Line One</label>
            <input
              {...fields.line_one_fixed}
              type="text"
              className={`form-control ${
                errors.line_one_fixed ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.line_one_fixed?.message?.toString()}
            </div>
          </div>
          <div className="p-2">
            <label className="form-label">Line Two</label>
            <input
              {...fields.line_two_fixed}
              type="text"
              className={`form-control ${
                errors.line_two_fixed ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.line_two_fixed?.message?.toString()}
            </div>
          </div>
          <div className="p-2">
            <label className="form-label">Line Three</label>
            <input
              {...fields.line_three_fixed}
              type="text"
              className={`form-control ${
                errors.line_three_fixed ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.line_three_fixed?.message?.toString()}
            </div>
          </div>
          <div className="p-2">
            <label className="form-label">Postal Code</label>
            <input
              {...fields.zip_fixed}
              type="text"
              className={`form-control ${
                errors.zip_fixed ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.zip_fixed?.message?.toString()}
            </div>
          </div>
          <div className="p-2">
            <label className="form-label">Divisional Secretary  </label>
            <input
              {...fields.ds_office_fixed}
              type="text"
              className={`form-control ${
                errors.ds_office_fixed ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.ds_office_fixed?.message?.toString()}
            </div>
          </div>
          <div className="p-2">
            <label className="form-label">District</label>
            <input
              {...fields.district_fixed}
              type="text"
              className={`form-control ${
                errors.district_fixed ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.district_fixed?.message?.toString()}
            </div>
          </div>

        </div>
        
        <h1 className="font-bold mt-2 border px-3 bg-gray-100">Temporally Address</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 pb-2 border">
        <div className="p-2">
            <label className="form-label">Line One</label>
            <input
              {...fields.line_one_tmp}
              type="text"
              className={`form-control ${
                errors.line_one_tmp ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.line_one_tmp?.message?.toString()}
            </div>
          </div>

          <div className="p-2">
            <label className="form-label">Line Two</label>
            <input
              {...fields.line_two_tmp}
              type="text"
              className={`form-control ${
                errors.line_two_tmp ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.line_two_tmp?.message?.toString()}
            </div>
          </div>

          
          <div className="p-2">
            <label className="form-label">Line Three</label>
            <input
              {...fields.line_three_tmp}
              type="text"
              className={`form-control ${
                errors.line_three_tmp ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.line_three_tmp?.message?.toString()}
            </div>
          </div>
          
          <div className="p-2">
            <label className="form-label">Postal Code </label>
            <input
              {...fields.zip_tmp}
              type="text"
              className={`form-control ${
                errors.zip_tmp ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.zip_tmp?.message?.toString()}
            </div>
          </div>



          <div className="p-2">
            <label className="form-label">Divisional Secretary</label>
            <input
              {...fields.ds_office_tmp}
              type="text"
              className={`form-control ${
                errors.ds_office_tmp ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.ds_office_tmp?.message?.toString()}
            </div>
          </div>

          <div className="p-2">
            <label className="form-label">District</label>
            <input
              {...fields.district_tmp}
              type="text"
              className={`form-control ${
                errors.district_tmp ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.district_tmp?.message?.toString()}
            </div>
          </div>
        </div>
        <h1 className="font-bold m-1">Other</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 pb-2">
          <div className="p-2">
            <label className="form-label">role</label>

            <select
              {...fields.role}
              className={`form-control ${errors.role ? "is-invalid" : ""}`}
            >
              {loan_id?<option value="GUARANTOR">GUARANTOR</option>:""}
              <option value="USER">CUSTOMER</option>
            </select>

            <div className="invalid-feedback">
              {errors.role?.message?.toString()}
            </div>
          </div>

          <div className="p-2">
            <label className="form-label">status</label>

            <select
              {...fields.status}
              className={`form-control ${errors.status ? "is-invalid" : ""}`}
            >
              <option value="ACTIVE">ACTIVE</option>
            </select>
            <div className="invalid-feedback">
              {errors.status?.message?.toString()}
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
          <Link href={loan_id?`/loans/edit/${loan_id}`:`/users`} className="btn btn-link">
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}
