'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { AddEdit } from '_components/goldrate';
import { Spinner } from '_components';
import { useRateService } from '_services';

export default Edit;

function Edit(props: any) {
    const router = useRouter();
    const rateService = useRateService();
    const rate = rateService.rate;

    
    useEffect(() => {
        if (!props.params.id) return;
        rateService.getById(props.params.id)
    }, [router]);

    return rate
        ?(<>
        <AddEdit title="EDIT RATES " rate={rate}/>
        </> )
        : 
        <Spinner />
        ;
}