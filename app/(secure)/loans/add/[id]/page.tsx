'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { AddEdit, AddEditItem } from '_components/loans';
import { AddEdit as AddUser } from '_components/users';
import { Spinner } from '_components';
import { useLoanService, useUserService } from '_services';

export default Edit;

function Edit(props:any) {
    const router = useRouter();
    const loanService = useLoanService();
    const loan = loanService.loan;


    
    const userService = useUserService();
    const user:any = userService.user;
    useEffect(() => {
        if (!props.params.id) return;
        // loanService.getById(props.params.id)
        userService.getById(props.params.id)
    }, [router]);

    return user
        ?<>
        {/* <AddUser title='Add Customer' user={user}/> */}
        <AddEdit title="Add Loan" loan={loan}  user={user}/>
        {/* <AddEditItem title="Edit Loan" loan={loan} /> */}
        </> 
        : <Spinner />;
}