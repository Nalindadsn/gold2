'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { AddEdit } from '_components/loans';
import { AddEdit as AddEditGuarantor } from '_components/guarantor';
import { Spinner } from '_components';
import { useLoanService, useUserService,useRateService } from '_services';

export default Edit;

function Edit(props: any) {
    const router = useRouter();

    
    const loanService = useLoanService();
    const loan = loanService.loan;

    
    const rateService = useRateService();
    const rate = rateService.rate;


    useEffect(() => {
        if (!props.params.id) return;
        loanService.getById(props.params.id)
        rateService.getSelected()
    }, [router]);
    const userService = useUserService();
    const user:any = userService.currentUser;
    useEffect(() => {
      
      userService.getCurrent();
    }, []);
    return loan
        ?(<>
        {/* <AddEditItem title="Edit Loan" loan={loan} /> */}
        <AddEdit title="EDIT LOAN DETAILS" loan={loan}  rate={rate} user={user}/>
        
        </> )
        : 
        <Spinner />
        ;
}