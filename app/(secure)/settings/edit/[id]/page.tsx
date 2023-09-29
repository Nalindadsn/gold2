'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { AddEdit } from '_components/setting';
import { Spinner } from '_components';
import { useSettingService } from '_services';

export default Edit;

function Edit(props: any) {
    const router = useRouter();
    const settingService = useSettingService();
    const setting = settingService.setting;
    

    
    useEffect(() => {
        if (!props.params.id) return;
        settingService.getById(props.params.id)
    }, [router]);

    return setting
        ?(<>
        <AddEdit title="EDIT RATES " setting={setting}/>
        </> )
        : 
        <Spinner />
        ;
}