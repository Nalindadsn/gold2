'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Spinner } from '_components';
import { useLoanService } from '_services';
import { useSearchParams } from 'next/navigation';


export default Edit;

function Edit() {
    const router = useRouter();

    
    const loanService = useLoanService();
    const loan = loanService.loan;



    const searchParams = useSearchParams();

    // E.g. `/dashboard?page=2&order=asc`
    const nic = searchParams.get('nic');


    useEffect(() => {
        if (!nic) return;
        loanService.getByNic(nic)
    }, [nic]);

    return nic
        ?(<>
        {/* <AddEditItem title="Edit Loan" loan={loan} /> */}
nic = {nic}  {console.log(loan)}
        </> )
        : 
        <Spinner />
        ;
}