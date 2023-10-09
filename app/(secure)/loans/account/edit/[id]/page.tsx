'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Spinner } from '_components';
import { useLoanService, useUserService,useRateService } from '_services';
import { AddEdit } from '_components/loans/account';

export default Edit;

function Edit(props: any) {
    const router = useRouter();

    
    const loanService = useLoanService();
    const loan = loanService.loan;

    
    const rateService = useRateService();
    const rate:any = rateService.rate;


    useEffect(() => {
        if (!props.params.id) return;
        loanService.getById(props.params.id)
        rateService.getSelected()
    }, [router]);

    return loan
        ?(<>
        {/* <AddEditItem title="Edit Loan" loan={loan} /> */}
        <AddEdit title="EDIT LOAN DETAILS" loan={loan}  rate={rate} />
        
        </> )
        : 
        <Spinner />
        ;
}