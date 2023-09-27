"use client"
import React from 'react';
// import './style.css';
import { fetchSearchResults } from './utils';
import ListItem from './ListItem';
import SearchInput from './SearchInput';
export default function App() {
  const [loading, setLoading] = React.useState('');
  const [query, setQuery] = React.useState('');
const [results, setResults] = React.useState([]);
const fetchData = async () => {
setLoading("loading...")
  const res = await fetchSearchResults(query);
  setResults(res);
  setLoading("")
};
React.useEffect(() => {
  fetchData();
}, [query]);
const emt = (e: any) => {
  setQuery("");
};

return (
<div>
 <SearchInput
  value={query}
  onChangeText={(e:any) => {
  setQuery(e.target.value);
  }}
 />
 {loading}        
 <button onClick={emt} className="p-1">
          reset
        </button>
 {JSON.stringify(results)}
 {/* {results.map((result, index) => (
  <div key={index}>
   <ListItem
    title={result.fullName}
   />
  </div>
 ))} */}
</div>
);
}