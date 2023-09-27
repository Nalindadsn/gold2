import React from 'react'

function index() {
  return (
    <div>index</div>
  )
}

export default index
// "use client";
// import React, { useState } from "react";
// import AsyncSelect from "react-select/async";

// function App() {
//   let selectedValue: any;
//   let setSelectedValue: any;
//   const [inputValue, setValue] = useState("");
//   [selectedValue, setSelectedValue] = useState(null);
//   const [lValue, setLValue] = useState(null);

//   // handle input change event
//   const handleInputChange = (value: any) => {
//     setValue(value);
//   };

//   // handle selection
//   const handleChange = (value: any) => {
//     setSelectedValue(value);
//   };

//   const emt = (e: any) => {
//     setSelectedValue(null);
//     setValue("");
//   };

//   // load options using API call
//   const loadOptions: any = (inputValue: any) => {
//       const users: any = fetch(`/api/guarantor/nic/${inputValue}`, {
//         cache: "no-store",
//       })
//         .then((res: any) => res.json())
//         .then((json) => {
//           // console.log(json);

//           return json.users;
//         });
//       // console.log(JSON.stringify(users))
//       return users;
//   };
//   let n = 1;
//   return (
//     <div className="App border p-1 mb-1">
//       <div className="flex flex-col md:flex-row -mx-1  border-b">
//         <div className="w-full p-1">
//           {selectedValue ? (
//             <>
//               <h3>Full Name :{selectedValue?.fullName}</h3>
//               <h4>
//                 Nic {`   `} :{selectedValue?.nic}
//               </h4>
//             </>
//           ) : (
//             ""
//           )}
//         </div>

//         <AsyncSelect
//           cacheOptions
//           defaultOptions
//           value={selectedValue}
//           getOptionLabel={(e: any) => e.fullName}
//           getOptionValue={(e: any) => e.nic}
//           loadOptions={loadOptions}
//           key={loadOptions.length}
//           onInputChange={handleInputChange}
//           onChange={handleChange}
//           className="w-full p-1"
//         />
//         <button onClick={emt} className="p-1">
//           reset
//         </button>
//       </div>
//       <div className="flex flex-col md:flex-row w-full  ">
//         <div className="p-1  w-1/2">
//           <h3 className="bg-gray-200 p-1">{selectedValue?.fullName}'s Loan</h3>
//           <div>
//             {selectedValue?.my_loan?.map((i: any) => (
//               <div key={n++} className="border-1 border-t-0 flex flex-col md:flex-row w-full ">
//                 <h3>{i?.form_number}</h3>
//                 <div>
// b
//                 </div>
//                 <div>
//                   c
//                 </div>
                
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="p-1 w-1/2 ">
//           <h3 className="bg-gray-200 p-1">Related Loans</h3>
//           <div>
//             {selectedValue?.my_guarantors?.map((i: any) => (
//               <div key={n++} className="border border-t-0">
//                 <h3>{i?.form_number}</h3>
                
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       {/* {}{JSON.stringify(loadOptions(inputValue))}- */}
//       {/* <>Selected Value: {JSON.stringify(selectedValue?.my_guarantors)}</>
//       <>Selected Value: {JSON.stringify(selectedValue)}</> */}
//     </div>
//   );
// }

// export default App;
