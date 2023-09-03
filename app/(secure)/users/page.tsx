'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { Spinner } from '_components';
import { useUserService } from '_services';

export default Users;

function Users() {
    const userService = useUserService();
    const users = userService.users;

    useEffect(() => {
        userService.getAll();
    }, []);

    return (
        <>
                       <div  className='p-1 flex w-full clear-both flex-col md:flex-row -mx-1 py-2  mb-1'>

            <h1 className='w-full text-xl font-bold'>Customers</h1>
            <Link href="/users/add" className="text-right btn btn-primary"  style={{ whiteSpace: 'nowrap' }}>New Customer</Link>
          
          
    </div>
                
                    <TableBody />
            
        </>
    );

    function TableBody() {
        if (users?.length) {
            return (users.map(user =>
                <div key={user.id}  className='p-1 flex w-full clear-both flex-col md:flex-row -mx-1 py-2 border-b bg-white shadow-sm mb-1'>
                    
                    <div className='w-full'>
                    <div>ID : {user.id}</div>
                    <div>First Name : {user.firstName}</div>
                    <div>Last Name : {user.lastName}</div>
                    <div>NIC : {user.nic}</div>
                    </div>
                    <div style={{ whiteSpace: 'nowrap' }} className=''>
                    <Link href={`/loans/add/${user.id}`} className="btn btn-sm btn-primary me-1">Add Loan</Link>
                    <Link href={`/users/edit/${user.id}`} className="btn btn-sm btn-warning me-1">Edit</Link>
                        <button onClick={() => userService.delete(user.id)} className="btn btn-sm btn-danger btn-delete-user" style={{ width: '60px' }} disabled={user.isDeleting}>
                            {user.isDeleting
                                ? <span className="spinner-border spinner-border-sm"></span>
                                : <span>Delete</span>
                            }
                        </button>
                    </div>
                </div>
            ));
        }

        if (!users) {
            return (
                <div>
                    <div >
                        <Spinner />
                    </div>
                </div>
            );
        }

        if (users?.length === 0) {
            return (
                <div>
                    <div  className="text-center">
                        <div className="p-2">No Users To Display</div>
                    </div>
                </div>
            );
        }
    }
}
