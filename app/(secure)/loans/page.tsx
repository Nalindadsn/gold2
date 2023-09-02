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

            
    <div>
<div>
                <div>
                    <TableBody />
                </div>
            </div>
    </div>
            
        </>
    );

    function TableBody() {
        if (loans?.length) {
            return (loans.map(loan =>
                <div key={loan.id} className='flex  flex-col md:flex-row -mx-1 py-2 border-b'>
                    
                    <div>
                    Form ID - {loan.form_number}<br/>
                        Order ID - {loan.id}<br/>
                    <div className='bg-white border p-1'>

                        <FaUserCircle className='float-left mr-2 text-5xl' /> {loan?.customer[0]?.firstName} {loan?.customer[0]?.lastName}<br/>
                        {loan?.customer[0]?.nic}
                    </div>
                        
                    
                    </div>
                    <div>

                    
                    <div className='bg-white border p-1'>

                        <FaUserCircle className='float-left mr-2 text-5xl' /> {loan?.officer[0]?.firstName} {loan?.officer[0]?.lastName}<br/>
                        {loan?.officer[0]?.nic}
                    </div>
                    {/* {JSON.stringify(loan?.customer[0]?._id)} */}

                    </div>
                    <div>{loan.interest_old}</div>
                    <div style={{ whiteSpace: 'nowrap' }}>
                    {/* <Link href={`/loans/view/${loan.id}`} className="btn btn-sm btn-primary me-1">View</Link> */}
                    <Link href={`/loans/edit/${loan.id}?id=${loan?.customer[0]?._id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                        <button onClick={() => loanService.delete(loan.id)} className="btn btn-sm btn-danger btn-delete-loan" style={{ width: '60px' }} disabled={loan.isDeleting}>
                            {loan.isDeleting
                                ? <span className="spinner-border spinner-border-sm"></span>
                                : <span>Delete</span>
                            }
                        </button>
                    </div>
                </div>
            ));
        }

        if (!loans) {
            return (
                <div>
                    <div>
                        <Spinner />
                    </div>
                </div>
            );
        }

        if (loans?.length === 0) {
            return (
                <div>
                    <div className="text-center">
                        <div className="p-2">No Loans To Display</div>
                    </div>
                </div>
            );
        }
    }
}
