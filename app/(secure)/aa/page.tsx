"use client"
import React, { useState } from "react";
 
function App() {
  const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);
 
  return (
    <div className="App">
      <h3><a href="https://cluemediator.com">Clue Mediator</a></h3>
      {inputList.map((x, i) => {
        return (
          <div className="box">
            <input
              name="firstName"
              value={x.firstName}
            />
            <input
              className="ml10"
              name="lastName"
              value={x.lastName}
            />
            <div className="btn-box">
              {inputList.length !== 1 && <button className="mr10">Remove</button>}
              {inputList.length - 1 === i && <button>Add</button>}
            </div>
          </div>
        );
      })}
      <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
    </div>
  );
}
 
export default App;