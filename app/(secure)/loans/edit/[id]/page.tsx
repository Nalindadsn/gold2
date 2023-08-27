'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { AddEdit, AddEditItem } from '_components/loans';
import { Spinner } from '_components';
import { useLoanService } from '_services';

export default Edit;

function Edit({ params: { id } }: any) {
    const router = useRouter();
    const loanService = useLoanService();
    const loan = loanService.loan;

    useEffect(() => {
        if (!id) return;
        loanService.getById(id)
    }, [router]);

    return loan
        ?<>
        <AddEdit title="Edit Loan" loan={loan} />
        <AddEditItem title="Edit Loan" loan={loan} />
        </> 
        : <Spinner />;
}