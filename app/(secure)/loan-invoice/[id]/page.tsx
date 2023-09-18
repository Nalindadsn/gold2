
"use client"
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Invoice from "./Invoice";
import PdfCard from "./PdfCard";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { AddEdit } from '_components/loans';
import { AddEdit as AddEditGuarantor } from '_components/guarantor';
import { Spinner } from '_components';
import { useLoanService, useUserService } from '_services';
import Link from "next/link";

export default Edit;

function Edit(props: any) {
    const router = useRouter();
    const loanService = useLoanService();
    const loan = loanService.loan;
    const cards = {  maxWidth: "1200px", margin: "0 auto", display: "grid", gap: "1rem", padding : '20px', gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"}

         const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        if (!props.params.id) return;
        loanService.getById(props.params.id)
    }, [router]);
    useEffect(() => {
      setIsClient(true)
    }, [])
    return loan
        ?(<>
        <div className="flex w-full">
          <div className="w-full"></div>
          
        <PDFDownloadLink document={<Invoice  loan={loan}/>} fileName='invoice.pdf'>
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
            <Invoice loan={loan} />
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