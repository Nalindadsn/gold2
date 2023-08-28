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
       
            <Link href="/users/add" className="btn  btn-primary mb-2 float-right">New Customer</Link>
          
          
            <h1>Customers</h1>
    <div style={{overflowX:"auto",width:"100%"}}>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>First Name</th>
                        <th style={{ width: '30%' }}>Last Name</th>
                        <th style={{ width: '30%' }}>Username</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    <TableBody />
                </tbody>
            </table>
            </div>
        </>
    );

    function TableBody() {
        if (users?.length) {
            return (users.map(user =>
                <tr key={user.id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.username}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                        <Link href={`/loans/add/${user.id}`} className="btn btn-sm btn-primary me-1">Add Loan</Link>
                        <button onClick={() => userService.delete(user.id)} className="btn btn-sm btn-danger btn-delete-user" style={{ width: '60px' }} disabled={user.isDeleting}>
                            {user.isDeleting
                                ? <span className="spinner-border spinner-border-sm"></span>
                                : <span>Delete</span>
                            }
                        </button>
                    </td>
                </tr>
            ));
        }

        if (!users) {
            return (
                <tr>
                    <td colSpan={4}>
                        <Spinner />
                    </td>
                </tr>
            );
        }

        if (users?.length === 0) {
            return (
                <tr>
                    <td colSpan={4} className="text-center">
                        <div className="p-2">No Users To Display</div>
                    </td>
                </tr>
            );
        }
    }
}
