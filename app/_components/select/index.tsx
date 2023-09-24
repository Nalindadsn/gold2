"use client"
import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
 
function App() {
  const [inputValue, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
 
  // handle input change event
  const handleInputChange = (value:any) => {
    setValue(value);
  };
 
  // handle selection
  const handleChange = (value:any) => {
    setSelectedValue(value);
  }
 
  // load options using API call
  const loadOptions = (inputValue:any) => {
    if(inputValue){

        return fetch(`/api/guarantor/nic/${inputValue}`).then(res => res.json());

    }else{

    }
  };
 
  return (
    <div className="App">
      {/* <pre>Input Value: "{inputValue}"</pre> */}
      <AsyncSelect
        cacheOptions
        defaultOptions
        value={selectedValue}
        getOptionLabel={(e:any) => e.fullName}
        getOptionValue={(e:any) => e.nic}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
      {}
      <pre>Selected Value: {JSON.stringify(selectedValue || {}, null, 2)}</pre>
{/* {selectedValue} */}
    </div>
  );
}
 
export default App;
