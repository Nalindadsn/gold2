'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { AddEdit } from '_components/loans';
import { AddEdit as AddEditUser } from '_components/users';
import { Spinner } from '_components';
import { useLoanService, useUserService } from '_services';

export default Edit;

function Edit(props: any) {
    const router = useRouter();
    const loanService = useLoanService();
    const loan = loanService.loan;

    
    useEffect(() => {
        if (!props.params.id) return;
        loanService.getById(props.params.id)
    }, [router]);

    return loan
        ?(<>
        {/* <AddEditItem title="Edit Loan" loan={loan} /> */}
        <AddEdit title="EDIT LOAN DETAILS" loan={loan}/>
        </> )
        : 
        <Spinner />
        ;
}