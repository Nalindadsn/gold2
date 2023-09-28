'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { useAlertService } from '_services';

export { Alert };

function Alert() {
    const pathname = usePathname();
    const alertService = useAlertService();
    const alert = alertService.alert;
    
    useEffect(() => {
        // clear alert on location change
        alertService.clear();
    }, [pathname,alertService]);

    if (!alert) return null;

    return (
        <div className="container">
            <div className="m-3 bottom-0 fixed right-0 ">
                <div className={`alert p-2 alert-dismissible ${alert.type}`} id="hideMe">
                    {alert.message}
                    <button type="button" className="px-2 bg-red-600 text-white rounded-md ml-3" onClick={alertService.clear}>X</button>
                </div>
            </div>
        </div>
    );
}
