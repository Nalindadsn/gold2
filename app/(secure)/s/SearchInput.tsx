import React from 'react';
import './SearchInput.css';
const SearchInput = ({ value, onChangeText }:any) => {
React.useEffect(() => {
  let input:any = document.querySelector('input');
  input.addEventListener('input', onChangeText) ;
  return input.removeEventListener('input', onChangeText);
 }, []);
return (
 <div className="search-container">
  <input
   type="text"
   value={value}
   onChange={onChangeText}
   placeholder="Search beer by name"
  />
 </div>
 
);
};
export default SearchInput;