'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Spinner } from '_components';
import { useLoanService } from '_services';
// import { FaUserCircle} from 'react-icons/fa';
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";
export default Loans;

function Loans() {
    const loanService = useLoanService();
    const loans = loanService.loans;

    useEffect(() => {
        loanService.getAll();
    }, []);

    return (
        <>
            <h1>Loans</h1>

            
    <div style={{overflowX:"auto"}}>
<table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>estimated_price_old</th>
                        <th style={{ width: '30%' }}>loan_price_old</th>
                        <th style={{ width: '30%' }}>interest_old</th>
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
        if (loans?.length) {
            return (loans.map(loan =>
                <tr key={loan.id}>
                    
                    <td>
                    Form ID - {loan.form_number}<br/>
                        Order ID - {loan.id}<br/>
                    <div className='bg-white border p-1'>

                        <FaUserCircle className='float-left mr-2 text-5xl' /> {loan?.customer[0]?.firstName} {loan?.customer[0]?.lastName}<br/>
                        {loan?.customer[0]?.nic}
                    </div>
                        
                    
                    </td>
                    <td>

                    
                    <div className='bg-white border p-1'>

                        <FaUserCircle className='float-left mr-2 text-5xl' /> {loan?.officer[0]?.firstName} {loan?.officer[0]?.lastName}<br/>
                        {loan?.officer[0]?.nic}
                    </div>
                    {/* {JSON.stringify(loan?.customer[0]?._id)} */}

                    </td>
                    <td>{loan.interest_old}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                    {/* <Link href={`/loans/view/${loan.id}`} className="btn btn-sm btn-primary me-1">View</Link> */}
                    <Link href={`/loans/edit/${loan.id}?id=${loan?.customer[0]?._id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                        <button onClick={() => loanService.delete(loan.id)} className="btn btn-sm btn-danger btn-delete-loan" style={{ width: '60px' }} disabled={loan.isDeleting}>
                            {loan.isDeleting
                                ? <span className="spinner-border spinner-border-sm"></span>
                                : <span>Delete</span>
                            }
                        </button>
                    </td>
                </tr>
            ));
        }

        if (!loans) {
            return (
                <tr>
                    <td colSpan={4}>
                        <Spinner />
                    </td>
                </tr>
            );
        }

        if (loans?.length === 0) {
            return (
                <tr>
                    <td colSpan={4} className="text-center">
                        <div className="p-2">No Loans To Display</div>
                    </td>
                </tr>
            );
        }
    }
}
