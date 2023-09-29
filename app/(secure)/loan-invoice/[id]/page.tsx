
"use client"
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Invoice from "./Invoice";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


import { Spinner } from '_components';
import { useLoanService } from '_services';
import Link from "next/link";

import { useRateService } from "_services";

export default Edit;

function Edit(props: any) {
    const router = useRouter();


    const rateService = useRateService();
    const rates:any = rateService.rates;  

    const loanService = useLoanService();
    const loan = loanService.loan;
    const cards = {  maxWidth: "1200px", margin: "0 auto", display: "grid", gap: "1rem", padding : '20px', gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"}

         const [isClient, setIsClient] = useState(false)

        const rate = rateService.rate;
         
    useEffect(() => {
        if (!props.params.id) return;
        loanService.getById(props.params.id)
        rateService.getAll()



        rateService.getSelected()

    }, [router]);
    useEffect(() => {
      setIsClient(true)
    }, [])
    return loan
        ?(<>
        <div className="flex w-full">
          <div className="w-full"></div>
          
        <PDFDownloadLink document={<Invoice  loan={loan}  rates={rates} rate={rate} />} fileName='invoice.pdf'>
       <div className="btn btn-sm btn-warning me-1 float-right rounded-0 focus:bg-yellow-500">
          {/* <HiOutlineDownload size={14}/> */}
          {/* <Invoice loan={loan} /> */}

          <span>Download</span>
       </div>
     </PDFDownloadLink> 
    <Link href={`/loans/edit/${loan.id}?id=${loan?.customer[0]?._id}`} className="btn btn-sm btn-warning me-1 float-right rounded-0 focus:bg-yellow-500">Update</Link>
        </div>
             { isClient ?
        <div className="overflow-scroll">
          <PDFViewer width="1000" height="650" className="app" >
            <Invoice loan={loan} rates={rates} rate={rate} />
          </PDFViewer>
         



        </div>:""}   
            
        </> )
        : 
        <Spinner />
        ;
}
// "use client"
// import { PDFViewer } from "@react-pdf/renderer";
// import Invoice from "./Invoice";
// import PdfCard from "./PdfCard";
// import { useEffect, useState } from "react";
// import { useLoanService } from "_services";

// function App() {
//     const [isClient, setIsClient] = useState(false)

//     const loanService = useLoanService();
//     const loans: any = loanService.loans;
//     useEffect(() => {
//       setIsClient(true)
//     }, [])
    
//   return (
//     <>
//      { isClient ?
    
//     <div className="overflow-scroll">
//       <PDFViewer width="1000" height="650" className="app" >
//         <Invoice />
//       </PDFViewer>
//       {/* <PdfCard/> */}
//     </div>:""}
//     </>
//   );
// }

// export default App;