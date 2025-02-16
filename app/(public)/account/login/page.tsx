'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useUserService } from '_services';

export default Login;

function Login() {
    const userService = useUserService();

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    const fields = {
        username: register('username', { required: 'username is required' }),
        password: register('password', { required: 'Password is required' })
    };

    async function onSubmit({ username, password }: any) {
        await userService.login(username, password);
    }

    return (
        <>
        <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div
        className="flex w-full flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
      >
        <div
          className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
        >
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="/">GOLD LOAN</a>
          </div>
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">Account Login</h3>
            username:Admin1<br/>
            password:123456
          <form  onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-sm font-semibold text-gray-500">Username</label>
              <input
                type="text"
                id="email"
                {...fields.username}
                autoFocus
                className={` ${errors.username ? 'is-invalid' : ''} px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200`}
              />
                                                    <div className="invalid-feedback">{errors.username?.message?.toString()}</div>

            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold text-gray-500">Password</label>
              </div>
              <input
                type="password"
                id="password"
                {...fields.password}
                className={` ${errors.password ? 'is-invalid' : ''} px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200`}

              />
                                      <div className="invalid-feedback">{errors.password?.message?.toString()}</div>

            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
              />

              <label htmlFor="remember" className="text-sm font-semibold text-gray-500">Remember me</label>
            </div>
            <div>
              {/* <button
               disabled={formState.isSubmitting} 
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                        Login
              </button> */}
              
              <button disabled={formState.isSubmitting} className="btn btn-primary">
                        {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                        Login
                    </button>
            </div>
            <div className="flex flex-col space-y-5">
              <span className="flex items-center justify-center space-x-2">
                <span className="h-px bg-gray-400 w-14"></span>
                <span className="h-px bg-gray-400 w-14"></span>
              </span>
              
            </div>
          </form>
        </div>
      </div>
    </div>
        
        
        </>
    );
}
