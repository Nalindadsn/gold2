'use client';

import { useEffect } from 'react';
import { AddEdit } from '_components/loans';
import { useRateService,useUserService } from '_services';
import { Spinner } from '_components';

export default Add;

function Add() {
    const rateService = useRateService();
    const rate = rateService.rate;


    const userService = useUserService();
    const user: any = userService.currentUser;
    useEffect(() => {
  
      userService.getCurrent();
    }, []);

    useEffect(() => {
        rateService.getSelected()
    }, []);
    return rate?<AddEdit title="ADD LOAN DETAILS" rate={rate} user={user}/>:
    <Spinner />;
}