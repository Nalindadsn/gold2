"use client"
import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import Link from "next/link";

function App() {
  let selectedValue:any
  let setSelectedValue:any
  const [inputValue, setValue] = useState('');
   [selectedValue, setSelectedValue] = useState(null);
  const [lValue, setLValue] = useState(null);
 
  // handle input change event
  const handleInputChange = (value:any) => {
    setValue(value);
  };
 
  // handle selection
  const handleChange = (value:any) => {
    
    setSelectedValue(value);
  }
 
  const emt = (e:any) => {
    setSelectedValue(null);
    setValue("")
  }
 
  // load options using API call
  const loadOptions:any = (inputValue:any) => {
    if(inputValue){
      
                const users:any= fetch(`/api/guarantor/nic/${inputValue}`, { cache: 'no-store' }).then(
                  (res:any) => res.json()
                  ).then((json)=>{
                    
                    
                      return json.users
                  });
                  // console.log(JSON.stringify(users))
                return users
    } else{

    }
  };
 
  return (
    <div className="App">
      
      <div className="flex flex-col md:flex-row -mx-1  border-b">
        <div className="w-full p-1">
          {
            selectedValue?<>
          <h3>Full Name :<Link href={`/search?nic=${selectedValue?.nic}`} className="  text-blue-600 hover:text-purple-700 focus:text-blue-700 ">{selectedValue?.fullName}</Link> </h3>
          <h4>Nic {`   `} :{selectedValue?.nic}</h4></>:""
          }

        </div>
        
      <AsyncSelect
        cacheOptions
        defaultOptions
        value={selectedValue}
        getOptionLabel={(e:any) => e.fullName}
        getOptionValue={(e:any) => e.nic}
        loadOptions={loadOptions}
        key={loadOptions.length}
        onInputChange={handleInputChange}
        onChange={handleChange}
        className="w-full p-1"
      />
      <button onClick={emt} className="p-1">reset</button>
      </div>
      {/* {}{JSON.stringify(loadOptions(inputValue))}- */}
      {/* <>Selected Value: {JSON.stringify(selectedValue)}</> */}
      

    </div>
  );
}
 
export default App;
