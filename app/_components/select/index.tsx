"use client"
import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
 
function App() {
  const [inputValue, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
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
                    console.log(json)
                    
                    
                      return json.users
                  });
                  // console.log(JSON.stringify(users))
                return users
    } else{

    }
  };
 
  return (
    <div className="App">
      <div className='flex w-full'>
        
      <AsyncSelect
        cacheOptions
        defaultOptions
        value={selectedValue}
        getOptionLabel={(e:any) => e.fullName}
        getOptionValue={(e:any) => e.nic}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
        className="w-full"
      /><button onClick={emt}>reset</button>
      </div>
      {/* {}{JSON.stringify(loadOptions(inputValue))}- */}
      <>Selected Value: {JSON.stringify(selectedValue)}</>
      

    </div>
  );
}
 
export default App;
