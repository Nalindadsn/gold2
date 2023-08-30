'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useAlertService, useUserService } from '_services';
export { AddEdit };

function AddEdit({ title, user }: { title: string, user?: any }) {
    const router = useRouter();
    const alertService = useAlertService();
    const userService = useUserService();

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm({ defaultValues: user });
    const { errors } = formState;

    const fields = {
        firstName: register('firstName', { required: 'First Name is required' }),
        lastName: register('lastName', { required: 'Last Name is required' }),
        username: register('username', { required: 'NIC is required' }),
        password: register('password', {
            minLength: { value: 6, message: 'Password must be at least 6 characters' },
            // password only required in add mode
            validate:  value => !user && !value ? 'Password is required' : undefined
        })
    };


    async function onSubmit(data: any) {
        alertService.clear();
        try {
            // create or update user based on user prop
            let message;
            if (user) {
                await userService.update(user.id, data);
                message = 'User updated';
            } else {
                await userService.create(data);
                message = 'User added';
            }

            // redirect to user list with success message
            router.push('/users');
            alertService.success(message, true);
        } catch (error: any) {
            alertService.error(error);
        }
    }

    return (
        <>

<div className="flex items-center justify-center p-12">
    <div className="mx-auto w-full max-w-[550px] bg-white">
        <form>
            <div className="mb-5">
                <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                    Full Name
                </label>
                <input type="text" name="name" id="name" placeholder="Full Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="mb-5">
                <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">
                    Phone Number
                </label>
                <input type="text" name="phone" id="phone" placeholder="Enter your phone number"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                    Email Address
                </label>
                <input type="email" name="email" id="email" placeholder="Enter your email"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
                            Date
                        </label>
                        <input type="date" name="date" id="date"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label htmlFor="time" className="mb-3 block text-base font-medium text-[#07074D]">
                            Time
                        </label>
                        <input type="time" name="time" id="time"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                </div>
            </div>

            <div className="mb-5 pt-3">
                <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                    Address Details
                </label>
                <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <input type="text" name="area" id="area" placeholder="Enter area"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <input type="text" name="city" id="city" placeholder="Enter city"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <input type="text" name="state" id="state" placeholder="Enter state"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <input type="text" name="post-code" id="post-code" placeholder="Post Code"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <button
                    className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                    Submit
                </button>
            </div>
        </form>
    </div>
</div>

        <form onSubmit={handleSubmit(onSubmit)} className=' bg-white p-2'>
            <h1>{title}</h1>



            <div className="grid grid-cols-1 md:grid-cols-2">
<div className='p-2'>
                    <label className="form-label">First Name</label>
                    <input {...fields.firstName} type="text" className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.firstName?.message?.toString()}</div></div>
<div className='p-2'>
                    <label className="form-label">Last Name</label>
                    <input {...fields.lastName} type="text" className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.lastName?.message?.toString()}</div>
                </div>
<div className='p-2'>
                    <label className="form-label">NIC</label>
                    <input {...fields.username} type="text" className={`form-control ${errors.username ? 'is-invalid' : ''}`}  />
                    <div className="invalid-feedback">{errors.username?.message?.toString()}</div>
                </div>
<div className='p-2'>
                    <label className="form-label">
                        Password
                        {user && <em className="ms-1">(Leave blank to keep the same password)</em>}
                    </label>
                    <input {...fields.password} type="password" value="123456" className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.password?.message?.toString()}</div></div>



</div>


            <div className="p-2">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary me-2 bg-blue-700">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                    Save
                </button>
                <button onClick={() => reset()} type="button" disabled={formState.isSubmitting} className="btn btn-secondary bg-gray-800">Reset</button>
                <Link href="/users" className="btn btn-link">Cancel</Link>
            </div>
        </form>
</>


    );
}