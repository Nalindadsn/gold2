'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { useUserService } from '_services';

export default Register;

function Register() {
    const userService = useUserService();

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    const fields = {
        fullName: register('fullName', { required: 'Full Name is required' }),
        gender: register('gender', { required: 'Gender is required' }),
        username: register('username', { required: 'NIC is required' }),
        password: register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' }
        })
    }

    async function onSubmit(user: any) {
        await userService.register(user);
    }

    return (
        <div className="card">
            <h4 className="card-header">Register</h4>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input {...fields.fullName} type="text" className={`form-control ${errors.fullName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.fullName?.message?.toString()}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <input {...fields.gender} type="text" className={`form-control ${errors.gender ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.gender?.message?.toString()}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input {...fields.username} type="text" className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.username?.message?.toString()}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input {...fields.password} type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.password?.message?.toString()}</div>
                    </div>
                    <button disabled={formState.isSubmitting} className="btn btn-primary">
                        {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                        Register
                    </button>
                    <Link href="/account/login" className="btn btn-link">Cancel</Link>
                </form>
            </div>
        </div>
    );
}
