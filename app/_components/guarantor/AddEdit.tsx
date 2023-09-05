'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useAlertService, useGuarantorService } from '_services';
export { AddEdit };
import {  useState } from "react";

function AddEdit({ title, user,loan }: { title: string, user?: any,loan?:any }) {
    const router = useRouter();
    const alertService = useAlertService();
    const userService = useGuarantorService();
    const [username, setUsername] = useState("");

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm({ defaultValues: user });
    const { errors } = formState;

    const fields = {
        firstName: register('firstName', { required: 'First Name is required' }),
        lastName: register('lastName', { required: 'Last Name is required' }),



        username: register('username', { required: 'NIC is required' }),


        
        occupation: register('occupation', { required: 'Occupation is required' }),
        nature_of_emp: register('nature_of_emp', { required: 'Nature of Emp is required' }),
        name_of_office: register('name_of_office', { required: 'Office is required' }),
        income: register('income', { required: 'Income is required' }),
        phone: register('phone', { required: 'Phone is required' }),
        nic: register('nic', { required: 'NIC is required' }),
        whatsapp: register('whatsapp', { required: 'Whatsapp is required' }),
        role: register('role', { required: 'role is required' }),
        status: register('status', { required: 'status is required' }),





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
                data.loan_id=loan._id
                await userService.create(data);
                 reset()
                message = 'User added';

             router.push('/loans');
            }

            // redirect to user list with success message
            // router.push('/users');
            alertService.success(message, true);
        } catch (error: any) {
            alertService.error(error);
        }
    }

    return (
        <>


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
                    <label className="form-label">nic</label>
                    <input  {...fields.nic} type="text" className={`form-control ${errors.nic ? 'is-invalid' : ''}`} 
                    
                    onChange={(e)=>setUsername(e.target.value)}
                    />
                    <div className="invalid-feedback">{errors.nic?.message?.toString()}</div>
                </div>


                
                <div className='p-2 hidden'>
                    <label className="form-label">Username</label>
                    <input {...fields.username} type="text" className={`form-control ${errors.username ? 'is-invalid' : ''}`} 
value={username}                    />
                    <div className="invalid-feedback">{errors.username?.message?.toString()}</div>
                </div>




                
                <div className='p-2'>
                    <label className="form-label">Occupation</label>
                    <input {...fields.occupation} type="text" className={`form-control ${errors.occupation ? 'is-invalid' : ''}`}  />
                    <div className="invalid-feedback">{errors.occupation?.message?.toString()}</div>
                </div>



                
                <div className='p-2'>
                    <label className="form-label">nature_of_emp</label>
                    <input {...fields.nature_of_emp} type="text" className={`form-control ${errors.nature_of_emp ? 'is-invalid' : ''}`}  />
                    <div className="invalid-feedback">{errors.nature_of_emp?.message?.toString()}</div>
                </div>


                
                <div className='p-2'>
                    <label className="form-label">name_of_office</label>
                    <input {...fields.name_of_office} type="text" className={`form-control ${errors.name_of_office ? 'is-invalid' : ''}`}  />
                    <div className="invalid-feedback">{errors.name_of_office?.message?.toString()}</div>
                </div>
                
                <div className='p-2'>
                    <label className="form-label">income</label>
                    <input {...fields.income} type="text" className={`form-control ${errors.income ? 'is-invalid' : ''}`}  />
                    <div className="invalid-feedback">{errors.income?.message?.toString()}</div>
                </div>
                <div className='p-2'>
                    <label className="form-label">phone</label>
                    <input {...fields.phone} type="text" className={`form-control ${errors.phone ? 'is-invalid' : ''}`}  />
                    <div className="invalid-feedback">{errors.phone?.message?.toString()}</div>
                </div>
                <div className='p-2'>
                    <label className="form-label">whatsapp</label>
                    <input {...fields.whatsapp} type="text" className={`form-control ${errors.whatsapp ? 'is-invalid' : ''}`}  />
                    <div className="invalid-feedback">{errors.whatsapp?.message?.toString()}</div>
                </div>
                <div className='p-2'>
                    <label className="form-label">Role</label>
                    <select {...fields.role}  className={`form-control ${errors.role ? 'is-invalid' : ''}`} >
                        <option value="GUARANTOR">GUARANTOR</option>
                    </select>
                     <div className="invalid-feedback">{errors.role?.message?.toString()}</div>
                </div>

                <div className='p-2'>
                    <label className="form-label">status</label>
                    <select {...fields.status}  className={`form-control ${errors.status ? 'is-invalid' : ''}`} >
                        <option value="GUARANTOR">GUARANTOR</option>
                    </select>

                    <div className="invalid-feedback">{errors.status?.message?.toString()}</div>
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