'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Spinner } from '_components';
import { useLoanService } from '_services';
import { useSearchParams } from 'next/navigation';


export default Edit;

function Edit() {
    const router = useRouter();

    
    const loanService = useLoanService();
    const loan:any = loanService.loan;



    const searchParams = useSearchParams();

    // E.g. `/dashboard?page=2&order=asc`
    const nic = searchParams.get('nic');


    useEffect(() => {
        if (!nic) return;
        loanService.getByNic(nic)
    }, [nic]);

    return loan
        ?(<>
        {/* <AddEditItem title="Edit Loan" loan={loan} /> */}
<div>
      <div className="container  p-0">
        <div className="flex    border bg-gray-800 text-white">
          <div className="w-full p-1">
            <span className="m-2">
             
                  <>
                    {/* {loan?.users[0]?.fullName}
                    <br />
                    {loan?.users[0]?.nic} */}
                  </>
                
            </span>
          </div>
          
        </div>
      </div>

      <div className="container  p-0">


      </div>
    </div>
        </> )
        : 
        <Spinner />
        ;
}