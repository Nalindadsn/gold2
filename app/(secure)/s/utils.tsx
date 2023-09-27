export const fetchSearchResults = async (query:any) => {
if (query && query.length > 0) {

const parsedQuery = query.replaceAll(' ', '+');
const url = `http://localhost:3000/api/guarantor/nic/${parsedQuery}`;
const res = await fetch(url);

const resJson = res.json();
return resJson;
} else {
return [];
}
};
