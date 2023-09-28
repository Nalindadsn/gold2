'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { AddEdit } from '_components/loans';
import { AddEdit as AddUser } from '_components/users';
import { Spinner } from '_components';
import { useLoanService, useRateService, useUserService } from '_services';

export default Edit;

function Edit(props:any) {
    const router = useRouter();
    const loanService = useLoanService();
    const loan = loanService.loan;

    const rateService = useRateService();
    const rate = rateService.rate;

    
    const userService = useUserService();
    const user:any = userService.user;
    useEffect(() => {
        if (!props.params.id) return;
        // loanService.getById(props.params.id)
        userService.getById(props.params.id)
        
        rateService.getSelected()
    }, [router,userService,rateService,props]);

    return user
        ?<>
        {/* <AddUser title='Add Customer' user={user}/> */}
        <AddEdit title="ADD LOAN" loan={loan}  user={user} rate={rate}/>
        {/* <AddEditItem title="Edit Loan" loan={loan} /> */}
        </> 
        : <Spinner />;
}