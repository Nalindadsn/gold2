

"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAlertService, useUserService } from "_services";
export { AddEditCoordinator };
import { useState } from "react";

function AddEditCoordinator({
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

  // get functions to build form with useForm() hook
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

    occupation: register("occupation", { required: "Occupation is required" }),
    
    // name_of_office: register("name_of_office", {
    //   required: "Office is required",
    // }),
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
    
    role: register("role", { required: "role is required" }),
    status: register("status", { required: "status is required" }),

    password: register("password", {
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
      // password only required in add mode
      validate: (value) =>
        !user && !value ? "Password is required" : undefined,
    }),
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
        router.push(`/coordinators`);
      }
      alertService.success(message, true);
    } catch (error: any) {
      alertService.error(error);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold  pt-2 tracking-wider uppercase  ">
        {title}
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
              // onChange={(e)=>setUsername(e.target.value)}
            />
            <div className="invalid-feedback">
              {errors.nic?.message?.toString()}
            </div>
          </div>

          <div className="p-2 ">
            <label className="form-label">Username</label>
            <input
              {...fields.username}
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              
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
          
        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 pb-2">
        <div className="p-2">
            <label className="form-label">Designation</label>
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
<label className="form-label">role</label>

<select
  {...fields.role}
  className={`form-control ${errors.role ? "is-invalid" : ""}`}
>
  {userCurrent?.role == "ADMIN" ? (
    <>
      <option value="COORDINATOR">COORDINATOR</option>
      <option value="ADMIN">ADMIN</option>
      <option value="FRONT-OFFICER">FRONT OFFICER</option>
      <option value="ACCOUNTANT">ACCOUNTANT</option>
    </>
  ) : (
    ""
  )}
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

          <div className="p-2">
            <label className="form-label">
              Password
              {user && (
                <em className="ms-1">
                  (Leave blank to keep the same password)
                </em>
              )}
            </label>
            
            <input
              {...fields.password}
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">
              {errors.password?.message?.toString()}
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
          <Link href="/users" className="btn btn-link">
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}

