<form className="bg-white p-2 mt-4" >
<div className="flex flex-col md:flex-row -mx-1 py-2 border-b">
  <div className="px-1"></div>
  <div className="px-1  text-right">Total Weight : 2.4975</div>
  <div className="px-1  text-right">Net Weight : 19.9800</div>
  <div className="px-1  text-right">Total pound : 2.4975</div>
  </div>
  <div className="flex flex-wrap -mx-3 ">
    <div className="w-full md:w-full px-3 mb-2 mt-2">
      <h2 className=" text-gray-800 text-lg">items<span className="bg-dark ml-2 text-blue-100 py-0 px-2 rounded-full text-sm ">NO OF ITEMS : 1</span></h2>
    <div>
<div className="flex  flex-col md:flex-row -mx-1 py-2 border-b"><div className="flex-1 px-1">
<input className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" placeholder="Description"  type="text" value="" name="name"/>
</div>
<div className="px-1  text-right">
  <input className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" placeholder="Total Weight"  type="text" value="" name="total_weight"/>
</div>
  <div className="px-1  text-right">
  <input className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" placeholder="Pound"  type="text" value="NaN" name="pound"/></div><div className="px-1  text-right">
<select name="status" className="w-full rounded-md border border-[#e0e0e0] bg-white m-1 py-1  px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"><option>NOT ISSUE</option><option>ISSUE</option></select>
</div>
<div className="px-1 pt-1  text-right">
  <button className="text-red-500 hover:text-red-600 text-sm font-semibold mt-1" type="reset">RESET</button>
  </div>
  </div>
  <button type="submit" className="btn btn-primary me-2 mt-1 bg-blue-700">Add Item</button>
</div>
</div>
</div>
</form>