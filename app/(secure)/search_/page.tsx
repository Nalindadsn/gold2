'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Spinner } from '_components';
import { useLoanService, useUserService,useRateService } from '_services';

export default Edit;

function Edit(props: any) {
  const searchParams = useSearchParams();
    const nic = searchParams.get('nic');
    
    const loanService = useLoanService();
    const loan:any = loanService.loan;

    
const a =nic

    useEffect(() => {
        if (!a) return;
        loanService.getByNic(a)
    }, [a]);
let n=0
    return loan
        ?(<>
        {/* <AddEditItem title="Edit Loan" loan={loan} /> */}
        {/* <AddEdit title="EDIT LOAN DETAILS" loan={loan}  rate={rate}/> */}
        {console.log(loan?.users[0])}
      <div className="flex flex-col md:flex-row w-full  ">
        <div className="p-1  w-1/2">
          <h3 className="bg-gray-200 p-1">{loan?.users[0]?.fullName}'s Loan</h3>
          <div>
            {loan?.users[0]?.my_loan?.map((i: any) => (
              
              <div key={n++} className="border border-t-0 flex flex-col md:flex-row w-full ">
                <div className="w-full">{i?.form_number}</div>
                <div className="pr-2 whitespace-nowrap"> LKR {parseFloat(i?.loan_amount).toFixed(2)}</div>
                <div>{i?.status}</div>
                
              </div>
            ))}
          </div>
        </div>
        <div className="p-1 w-1/2 ">
          <h3 className="bg-gray-200 p-1">Related Loans</h3>
          <div className="border">
            {loan?.users[0]?.my_guarantors?.map((i: any) => (
              <div key={n++} className="border border-t-0 flex flex-col md:flex-row w-full ">
                <div className="w-full">{i?.form_number}</div>
                <div className="pr-2 whitespace-nowrap"> LKR {parseFloat(i?.loan_amount).toFixed(2)}</div>
                <div>{i?.status}</div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
        </> )
        : 
        <Spinner />
        ;
}
// "use client"
// import { useSearchParams } from 'next/navigation';

// export default function Page() {
//   const searchParams = useSearchParams();

//   // E.g. `/dashboard?page=2&order=asc`
//   const page = searchParams.get('page');
//   const order = searchParams.get('order');

//   return (
//     <div>
//       <p>Page: {page}</p>
//       <p>Order: {order}</p>
//     </div>
//   );
// }