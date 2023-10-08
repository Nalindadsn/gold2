"use client";
import { useState,useEffect } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useUserService } from '_services';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSearchParams } from 'next/navigation';

export { Sidebar };

function Sidebar() {
   const [loggingOut, setLoggingOut] = useState<boolean>(false);
   const [search, setSearch] = useState("");

    async function logout() {
        setLoggingOut(true);
        await userService.logout();
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const userService = useUserService();
    const user:any = userService.currentUser;
  
    const searchParams = useSearchParams();

    // E.g. `/dashboard?page=2&order=asc`
    const nic = searchParams.get('nic');
    useEffect(() => {
      userService.getCurrent();
  }, []);
  
  const router = useRouter();
  const submitHandler = async (e: any) => {
    e.preventDefault();
   router.push(`/search?nic=${search}`);
  }
  return <>
  
  <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen  transition-transform -translate-x-full   border-gray-200 md:translate-x-0  bg-gray-800 text-blue-100" aria-label="Sidebar">
           <div className="h-full  pb-4 overflow-y-auto ">
              <ul className="space-y-2 font-medium">
                 <li className="pt-2 pb-3 bg-gray-900 text-gray-300"><Link href="/" className="text-3xl font-bold m-2 pt-5" >Gold Loan</Link></li>                
                <li>       <form  
              onSubmit={submitHandler}>
                                <div className="relative group ">
                                    <input type="text"
                                    name="nic"
                                    onChange={(e)=>setSearch(e.target.value)}
                                        className="form-input rounded-md bg-gray-700 text-sm text-gray-300 pl-10 py-1.5 ml-5 border-transparent border-none outline-none focus:ring-0 focus:text-white transition-all duration-300 ease-in-out focus:w-60 w-48"
                                        placeholder="Search..." />
                                    <span
                                        className="absolute h-4 w-4 left-44 bottom-2 text-gray-400 transition-all duration-300 ease-in-out group-focus-within:left-8">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </span>
                                </div>
                            </form></li>
                 <li>
                    <a href="/" className="flex items-center py-2 px-3 text-gray-300   hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700 group">
                       <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                       </svg>
                       <span className="ml-3 ">Dashboard</span>
                    </a>
                 </li>
                 
                 <li className="m-0">
                    <a href="/users" className="flex items-center py-2 px-3 text-gray-300   hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700 group">
                    <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
                       <span className="flex-1 ml-3 whitespace-nowrap ">Customers</span>
                    </a>
                 </li>


       
                 <div className='group-hover:text-gray-900 dark:group-hover:text-white'>

                 
                 <li  className="ml-2 mt-0">
                    <a href="/loans" className="flex items-center py-2 px-3 text-gray-300   hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700 group">
                      
                       -

                       <span className="flex-1 ml-3 whitespace-nowrap ">All LOANS</span>
                       <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"></span>
                    </a>
                 </li>
                 <li  className="ml-2 mt-0">
                    <a href="/loans-approved" className="flex items-center py-2 px-3 text-gray-300   hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700 group">
                       -
                       <span className="flex-1 ml-3 whitespace-nowrap ">Loans Approved</span>
                       <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"></span>
                    </a>
                 </li>
                 <li  className="ml-2 mt-0">
                    <a href="/loans-rejected" className="flex items-center py-2 px-3 text-gray-300   hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700 group">
                       -
                       <span className="flex-1 ml-3 whitespace-nowrap ">Loans Rejected</span>
                       <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"></span>
                    </a>
                 </li>
                 <li  className="ml-2 mt-0">
                    <a href="/loans-completed" className="flex items-center py-2 px-3 text-gray-300   hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700 group">
                       -
                       <span className="flex-1 ml-3 whitespace-nowrap ">Loans Completed</span>
                       <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"></span>
                    </a>
                 </li>


                 </div>

                 <li  className="m-0">
                    <a href="/settings" className="flex items-center py-2 px-3 text-gray-300   hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700 group">
                      
                       <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                    </svg>
                       <span className="flex-1 ml-3 whitespace-nowrap ">Settings</span>
                       <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"></span>
                    </a>
                 </li>
                
                 {user?.role=="ADMIN"?<>
                 
                 <div className='group-hover:text-gray-900 dark:group-hover:text-white'>

                 <li  className="m-0  border-0 border-1 border-t">
                    <div  className="flex items-center  px-3 text-gray-300     dark:hover:bg-gray-700 group">
                      
                       <svg className="flex-shrink-0 w-3 h-3 text-gray-500 transition duration-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                          <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                       </svg>
                       
                       <span className="flex-1 ml-3 whitespace-nowrap text-gray-500 text-sm ">Users</span>
                    </div>
                 </li>
                 <li  className="ml-2 mt-0">
                    <a href="/admins" className="flex items-center  py-1 px-3 text-gray-300   hover:bg-gray-300 hover:text-gray-800  dark:hover:bg-gray-700 group">
                       -<span className="flex-1 ml-3 whitespace-nowrap ">Admins</span>
                    </a>
                 </li>
                 <li  className="ml-2 mt-0">
                    <a href="/coordinators" className="flex items-center py-1 px-3 text-gray-300   hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700 group">
                       -
                       <span className="flex-1 ml-3 whitespace-nowrap ">Coordinators </span>
                    </a>
                 </li>
                 <li  className="ml-2 mt-0">
                    <a href="/front" className="flex items-center py-1 px-3 text-gray-300   hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700 group">
                       -
                       <span className="flex-1 ml-3 whitespace-nowrap ">Front Officers </span>
                    </a>
                 </li>

                 <li  className="ml-2 mt-0">
                    <a href="/accountant" className="flex items-center py-1 px-3 text-gray-300   hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700 group">
                       -
                       <span className="flex-1 ml-3 whitespace-nowrap ">Accountant </span>
                    </a>
                 </li>

                 </div>
                 
                 </>:""}
                 
                 <li  className="m-0">
                    <a href="/gold-rates" className="flex items-center py-2 px-3 text-gray-300   hover:bg-gray-300 hover:text-gray-800  dark:hover:bg-gray-700 group">
                      
                    <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                            </svg>
                       <span className="flex-1 ml-3 whitespace-nowrap ">Gold Rate</span>
                    </a>
                 </li>
                 <li  className="m-0 mt-3">
                 <Button variant="danger" onClick={logout} className='w-full text-center bg-red-600 p-2 text-gray-100 rounded-lg  hover:bg-red-700 dark:hover:bg-gray-700 group rounded-0'>
                    
                       {loggingOut ? (
                <><span className="spinner-border spinner-border-sm"></span>Sign Out</>
              ) : (
                <span>Sign Out</span>
              )}
                      
                      </Button>
                 </li>

                 
              </ul>
           </div>
        </aside>
        
  <div style={{zIndex:1000}} className="bg-gray-900  fixed right-0 text-white">
  <Button variant="primary" onClick={handleShow} className="md:hidden rounded-0  py-2 ">
       
  <svg className="block h-10 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16" />
                                </svg>

                                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
 
      </Button>
  </div>
  
  <Offcanvas show={show} onHide={handleClose} className="  bg-gray-800 text-blue-100">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Gold Loan</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
         
  <aside id="logo-sidebar" aria-label="Sidebar">
           <div className="h-full  pb-4 overflow-y-auto   bg-gray-800 text-blue-100">
              <ul className="space-y-2 font-medium  overflow-hidden">
               
                 <li>        <form method='GET' action={`/search`}>
                                <div className="relative group overflow-hidden">
                                    <input type="text"
                                    name="nic"
                                    onChange={(e)=>setSearch(e.target.value)}
                                        className="form-input rounded-md bg-gray-700 text-sm text-gray-300 pl-10 py-1.5 ml-5 border-transparent border-none outline-none focus:ring-0 focus:text-white transition-all duration-300 ease-in-out focus:w-60 w-48"
                                        placeholder="Search..." />
                                    <span
                                        className="h-4 w-4 absolute left-44 bottom-2 text-gray-400 transition-all duration-300 ease-in-out group-focus-within:left-8">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </span>
                                </div>
                            </form>
                            
                            
                            </li>
                            
                 <li>
                    <a href="/" className="flex items-center py-2 px-3 text-gray-300   hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700 group">
                       <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                       </svg>
                       <span className="ml-3 ">Dashboard</span>
                    </a>
                 </li>
                 <li>
                    <a href="/users" className="flex items-center py-2 px-3 text-gray-300   hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700 group">
                       <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                          <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                       </svg>
                       <span className="flex-1 ml-3 whitespace-nowrap ">Customers</span>
                    </a>
                 </li>
                 <li className='group-hover:text-gray-900 dark:group-hover:text-white'>

                 <li  className="m-0  border-0 border-1 border-t">
                    <div  className="flex items-center  px-3 text-gray-300     dark:hover:bg-gray-700 group">
                      
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3 h-3 text-gray-500" >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
                       
                       <span className="flex-1 ml-3 whitespace-nowrap text-gray-500 text-sm ">Loans</span>
                    </div>
                 </li>


                 <li  className="ml-2 mt-0">
                    <a href="/loans" className="flex items-center py-2 px-3 text-gray-300   hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700 group">
                      
                       -

                       <span className="flex-1 ml-3 whitespace-nowrap ">All LOANS</span>
                       <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"></span>
                    </a>
                 </li>
                 <li  className="ml-2 mt-0">
                    <a href="/loans-approved" className="flex items-center py-2 px-3 text-gray-300   hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700 group">
                       -
                       <span className="flex-1 ml-3 whitespace-nowrap ">Loans Approved</span>
                       <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"></span>
                    </a>
                 </li>
                 <li  className="ml-2 mt-0">
                    <a href="/loans-rejected" className="flex items-center py-2 px-3 text-gray-300   hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700 group">
                       -
                       <span className="flex-1 ml-3 whitespace-nowrap ">Loans Rejected</span>
                       <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"></span>
                    </a>
                 </li>
                 <li  className="ml-2 mt-0">
                    <a href="/loans-completed" className="flex items-center py-2 px-3 text-gray-300   hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700 group">
                       -
                       <span className="flex-1 ml-3 whitespace-nowrap ">Loans Completed</span>
                       <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"></span>
                    </a>
                 </li>






                 </li>
                 <li>
                    <a href="/settings" className="flex items-center py-2 px-3 text-gray-300   hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700 group">
                       {/* <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                          <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                       </svg> */}
                       <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                    </svg>
                       <span className="flex-1 ml-3 whitespace-nowrap ">Settings</span>
                       <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"></span>
                    </a>
                 </li>
                
                 {user?.role=="ADMIN"?<>
                 
                 <div className='group-hover:text-gray-900 dark:group-hover:text-white'>

                 <li  className="m-0  border-0 border-1 border-t">
                    <div  className="flex items-center  px-3 text-gray-300     dark:hover:bg-gray-700 group">
                      
                       <svg className="flex-shrink-0 w-3 h-3 text-gray-500 transition duration-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                          <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                       </svg>
                       
                       <span className="flex-1 ml-3 whitespace-nowrap text-gray-500 text-sm ">Users</span>
                    </div>
                 </li>
                 <li  className="ml-2 mt-0">
                    <a href="/admins" className="flex items-center  py-1 px-3 text-gray-300   hover:bg-gray-300 hover:text-gray-800  dark:hover:bg-gray-700 group">
                       -<span className="flex-1 ml-3 whitespace-nowrap ">Admins</span>
                    </a>
                 </li>
                 <li  className="ml-2 mt-0">
                    <a href="/coordinators" className="flex items-center py-1 px-3 text-gray-300   hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700 group">
                       -
                       <span className="flex-1 ml-3 whitespace-nowrap ">Coordinators </span>
                    </a>
                 </li>
                 <li  className="ml-2 mt-0">
                    <a href="/front" className="flex items-center py-1 px-3 text-gray-300   hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700 group">
                       -
                       <span className="flex-1 ml-3 whitespace-nowrap ">Front Officers </span>
                    </a>
                 </li>
                 
                 <li  className="ml-2 mt-0">
                    <a href="/accountant" className="flex items-center py-1 px-3 text-gray-300   hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700 group">
                       -
                       <span className="flex-1 ml-3 whitespace-nowrap ">Accountant </span>
                    </a>
                 </li>

                 </div>
                 
                 </>:""}
                 
                 <li  className="m-0">
                    <a href="/gold-rates" className="flex items-center py-2 px-3 text-gray-300   hover:bg-gray-300 hover:text-gray-800  dark:hover:bg-gray-700 group">
                      
                    <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                            </svg>
                       <span className="flex-1 ml-3 whitespace-nowrap ">Gold Rate</span>
                    </a>
                 </li>
                 
                 <li className='mt-3'>
                 <Button variant="danger" onClick={logout} className='w-full text-center bg-red-600 p-2 text-gray-100 rounded-lg  hover:bg-red-700 dark:hover:bg-gray-700 group rounded-0'>
                    
                       {loggingOut ? (
                <><span className="spinner-border spinner-border-sm"></span>Sign Out</>
              ) : (
                <span>Sign Out</span>
              )}
                      
                      </Button>
                 </li>

                 
              </ul>
           </div>
        </aside>
        
        </Offcanvas.Body>
      </Offcanvas>
  </>;
}
