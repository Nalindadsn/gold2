'use client';

import { useEffect } from 'react';
import {  useRouter, useSearchParams } from 'next/navigation';

import { AddEdit } from '_components/users';
import { Spinner } from '_components';
import { useUserService } from '_services';

export default Edit;

function Edit({ params: { id } }: any) {
    const router = useRouter();
    const userService = useUserService();
    const user = userService.user;

 
 
    const searchParams = useSearchParams()
 
    const loan_id = searchParams.get('id')


// console.log(loan_id)
    useEffect(() => {
        if (!id) return;

        // fetch user for add/edit form
        userService.getById(id)
    }, [router,userService,id]);

    return user
        ? 
        <>
            <AddEdit title="- Edit User" user={user} loan_id={loan_id} />
        </>
        : <Spinner />;
}