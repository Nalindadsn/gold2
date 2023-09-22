'use client';

import { useEffect } from 'react';
import { AddEdit } from '_components/loans';
import { useRateService } from '_services';
import { Spinner } from '_components';

export default Add;

function Add() {
    const rateService = useRateService();
    const rate = rateService.rate;


    useEffect(() => {
        rateService.getSelected()
    }, []);
    return rate?<AddEdit title="ADD LOAN DETAILS" rate={rate}/>:
    <Spinner />;
}