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
    return fetch(`http://localhost:3000/api/auth/users?email=${inputValue}`).then(res => res.json());
  };
 
  return (
    <div className="App">
      {/* <pre>Input Value: "{inputValue}"</pre> */}
      <AsyncSelect
        cacheOptions
        defaultOptions
        value={selectedValue}
        getOptionLabel={(e:any) => e.email}
        getOptionValue={(e:any) => e.email}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
      <pre>Selected Value: {JSON.stringify(selectedValue || {}, null, 2)}</pre>
    </div>
  );
}
 
export default App;
// import React, { Component } from 'react'
// import Select from 'react-select'
// import axios from 'axios'

// export default class App extends Component {

//   constructor(props){
//     super(props)
//     this.state = {
//       selectOptions : [],
//       id: "",
//       name: ''
//     }
//   }

//  async getOptions(){
//     const res = await axios.get('https://jsonplaceholder.typicode.com/users')
//     const data = res.data

//     const options = data.map(d => ({
//       "value" : d.id,
//       "label" : d.name

//     }))

//     this.setState({selectOptions: options})

//   }

//   handleChange(e){
//    this.setState({id:e.value, name:e.label})
//   }

//   componentDidMount(){
//       this.getOptions()
//   }

//   render() {
//     console.log(this.state.selectOptions)
//     return (
//       <div>
//         <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
//     <p>You have selected <strong>{this.state.name}</strong> whose id is <strong>{this.state.id}</strong></p>
//       </div>
//     )
//   }
// }