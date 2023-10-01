import { useForm } from "react-hook-form";
import { useFormState } from "./FormContext";

type TFormValues = {
  username: string;
  fullName: string;
};

export function UserNameForm() {
  const { onHandleNext, setFormData, formData } = useFormState();
  const { register, handleSubmit, formState: { errors } } = useForm<TFormValues>({
    defaultValues: formData,
  });

  const handleError = (errors:any) => {};

  const registerOptions = {
    username: { required: "Name is required" },
    // email: { required: "Email is required" },
    // password: {
    //   required: "Password is required",
    //   minLength: {
    //     value: 8,
    //     message: "Password must have at least 8 characters"
    //   }
    // }
  };
  const onHandleFormSubmit = (data: TFormValues) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    onHandleNext();
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onHandleFormSubmit, handleError)}
    >
            <div>
        <label>Name</label>
        <input  type="text" {...register('username', registerOptions.username) }/>
        <small className="text-danger">
          {errors?.username && errors.username.message}
        </small>
      </div>
    <div className="flex gap-1 flex-col">
      <label htmlFor="fullName">fullName</label>
      <input
        id="fullName"
        {...register("fullName")}
        className="border h-11 px-4 rounded-md focus:outline-blue-500 "
      />
    </div>
      {/* <div className="flex gap-1 flex-col">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          {...register("username")}
          className="border h-11 px-4 rounded-md focus:outline-blue-500 "
          required={true}
        />
      </div> */}
      <div className="flex justify-end">
        <button className="h-11 px-6 inline-block bg-blue-600 font-semibold text-white rounded-md">
          Next
        </button>
      </div>
    </form>
  );
}
