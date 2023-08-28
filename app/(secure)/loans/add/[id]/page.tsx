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
        if (!props.searchParams.id) return;
        // loanService.getById(props.params.id)
        userService.getById(props.searchParams.id)
    }, [router]);

    return user
        ?<>
        <AddUser title='Add User' user={user}/>
        <AddEdit title="Edit Loan" loan={loan} user={user} />
        {/* <AddEditItem title="Edit Loan" loan={loan} /> */}
        </> 
        : <Spinner />;
}