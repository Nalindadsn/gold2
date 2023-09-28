'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { AddEditCoordinator } from '_components/users';
import { Spinner } from '_components';
import { useUserService } from '_services';

export default Edit;

function Edit({ params: { id } }: any) {
    const router = useRouter();
    const userService = useUserService();
    const user = userService.user;

    useEffect(() => {
        if (!id) return;

        // fetch user for add/edit form
        userService.getById(id)
    }, [router,userService,id]);

    return user
        ? 
        <>
        {/* {console.log(user)} */}
        
        <AddEditCoordinator title="UPDATE CUSTOMER" user={user} />
        
        </>
        : <Spinner />;
}