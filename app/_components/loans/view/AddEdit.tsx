"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAlertService, useLoanService } from "_services";
import { Spinner } from "_components/Spinner";
export { View };

function View({ title, loan }: { title: string; loan?: any }) {
  const router = useRouter();
  const alertService = useAlertService();
  const loanService = useLoanService();
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: loan,
  });
  const { errors } = formState;
  const fields = {
    estimated_price_old: register("estimated_price_old", {
      required: "estimated_price_old",
    }),
    loan_price_old: register("loan_price_old", {
      required: "loan_price_old",
    }),
    interest_old: register("interest_old", {
      required: "interest_old is required",
    }),
    expected_price_old: register("expected_price_old", {
      minLength: {
        value: 1,
        message: "expected_price_old must be at least 1 characters",
      },
      // expected_price_old only required in add mode
      validate: (value) =>
        !loan && !value ? "expected_price_old is required" : undefined,
    }),
  };
  async function onSubmit(data: any) {
    alertService.clear();
    try {
      // create or update loan based on loan prop
      let message;
      if (loan) {
        await loanService.updateItem(loan.id, data);
console.log
        message = "Loan updated";
      } else {
        await loanService.create(data);

        message = "Loan added";
      }

      // redirect to loan list with success message
    //   router.push("/loans");
      alertService.success(message, true);
    } catch (error: any) {
      alertService.error(error);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      
<div className="antialiased sans-serif">
	<div className="border-t-8 border-gray-700 h-2"></div>
	<div 
		className="container mx-auto py-6 px-4"
	>
<div className="flex justify-between">
			<h2 className="text-2xl font-bold mb-6 pb-2 tracking-wider uppercase">Invoice</h2>
			<div>
				<div className="relative mr-4 inline-block">
					<div className="text-gray-500 cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center" >
						<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-printer" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
							<rect x="0" y="0" width="24" height="24" stroke="none"></rect>
							<path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" />
							<path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" />
							<rect x="7" y="13" width="10" height="8" rx="2" />
						</svg>				  
					</div>
					
				</div>
				
				<div className="relative inline-block">
					<div className="text-gray-500 cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-refresh" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
							<rect x="0" y="0" width="24" height="24" stroke="none"></rect>
							<path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5" />
							<path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5" />
						</svg>	  
					</div>
					
				</div>
			</div>
		</div>
    
    
    
		<div className="flex mb-8 justify-between">
			<div className="w-2/4">
				<div className="mb-2 md:mb-1 md:flex items-center">
					<label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Invoice No.</label>
					<span className="mr-4 inline-block hidden md:block">:</span>
					<div className="flex-1">
					<input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-48 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="eg. #INV-100001" x-model="invoiceNumber" />
					</div>
				</div>
				<div className="mb-2 md:mb-1 md:flex items-center">
					<label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Invoice Date</label>
					<span className="mr-4 inline-block hidden md:block">:</span>
					<div className="flex-1">
					<input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-48 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 js-datepicker" type="text" id="datepicker1" placeholder="eg. 17 Feb, 2020" x-model="invoiceDate"  />
					</div>
				</div>
				<div className="mb-2 md:mb-1 md:flex items-center">
					<label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Due date</label>
					<span className="mr-4 inline-block hidden md:block">:</span>
					<div className="flex-1">
					<input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-48 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 js-datepicker-2" id="datepicker2" type="text" placeholder="eg. 17 Mar, 2020" x-model="invoiceDueDate"/>
					</div>
				</div>
			</div>
			<div>
				<div className="w-32 h-32 mb-1 border rounded-lg overflow-hidden relative bg-gray-100">
					<img id="image" className="object-cover w-full h-32" src="https://placehold.co/300x300/e2e8f0/e2e8f0" />
					
					<div className="absolute top-0 left-0 right-0 bottom-0 w-full block cursor-pointer flex items-center justify-center" >
						{/* <button type="button" style={{backgroundColor: "rgba(255, 255, 255, 0.65")}} className="hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 text-sm border border-gray-300 rounded-lg shadow-sm">
							<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-camera" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" >
								<rect x="0" y="0" width="24" height="24" stroke="none"></rect>
								<path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
								<circle cx="12" cy="13" r="3" />
							</svg>							  
						</button> */}
            <button className="absolute top-0 left-0 right-0 bottom-0 w-full block cursor-pointer flex items-center justify-center"></button>
					</div>
				</div>
				<input name="photo" id="fileInput" accept="image/*" className="hidden" type="file" />
			</div>
		</div>
    
    
    
    
    
    
    
		<div className="flex flex-wrap justify-between mb-8">
			<div className="w-full md:w-1/3 mb-2 md:mb-0">
				<label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">Bill To:</label>
				<input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="Billing company name" x-model="billing.name"/>
				<input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="Billing company address" x-model="billing.address"/>
				<input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="Additional info" x-model="billing.extra"/>
			</div>
			<div className="w-full md:w-1/3">
				<label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">From:</label>
				<input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="Your company name" x-model="from.name"/>
				<input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="Your company address" x-model="from.address"/>
				<input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="Additional info" x-model="from.extra"/>
			</div>
		</div>
{
  
}
<div className="flex -mx-1 border-b py-2 items-start">
			<div className="flex-1 px-1">
				<p className="text-gray-800 uppercase tracking-wide text-sm font-bold">Description</p>
			</div>
			<div className="px-1 w-20 text-right">
				<p className="text-gray-800 uppercase tracking-wide text-sm font-bold">Units</p>
			</div>
			<div className="px-1 w-32 text-right">
				<p className="leading-none">
					<span className="block uppercase tracking-wide text-sm font-bold text-gray-800">Unit Price</span>
					<span className="font-medium text-xs text-gray-500">(Incl. GST)</span>
				</p>
			</div>
			<div className="px-1 w-32 text-right">
				<p className="leading-none">
					<span className="block uppercase tracking-wide text-sm font-bold text-gray-800">Amount</span>
					<span className="font-medium text-xs text-gray-500">(Incl. GST)</span>
				</p>
			</div>
			<div className="px-1 w-20 text-center">
			</div>
		</div>
    {}
<div className="flex -mx-1 py-2 border-b">
				<div className="flex-1 px-1">
					<p className="text-gray-800" x-text="invoice.name">new</p>
				</div>
				<div className="px-1 w-20 text-right">
					<p className="text-gray-800" x-text="invoice.qty">20</p>
				</div>
				<div className="px-1 w-32 text-right">
					<p className="text-gray-800" x-text="numberFormat(invoice.rate)">10</p>
				</div>
				<div className="px-1 w-32 text-right">
					<p className="text-gray-800" x-text="numberFormat(invoice.total)">200.00</p>
				</div>
				<div className="px-1 w-20 text-right">
					<a href="#" className="text-red-500 hover:text-red-600 text-sm font-semibold" >Delete</a>
				</div>
			</div>

{}


{}
<div className="flex -mx-1 py-2 border-b bg-yellow-200" >
				<div className="flex-1 px-1">
					<p className="text-gray-800" x-text="invoice.name">new          <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">Issue</span>
</p>
				</div>
				<div className="px-1 w-20 text-right">
					<p className="text-gray-800" x-text="invoice.qty">20</p>
				</div>
				<div className="px-1 w-32 text-right">
					<p className="text-gray-800" x-text="numberFormat(invoice.rate)">10</p>
				</div>
				<div className="px-1 w-32 text-right">
					<p className="text-gray-800" x-text="numberFormat(invoice.total)">200.00</p>
				</div>
				<div className="px-1 w-20 text-right">
					<a href="#" className="text-red-500 hover:text-red-600 text-sm font-semibold" >Delete</a>
				</div>
			</div>
{}
{}
<div className="flex -mx-1 py-2 border-b">
				<div className="flex-1 px-1">
					<p className="text-gray-800" x-text="invoice.name">new</p>
				</div>
				<div className="px-1 w-20 text-right">
					<p className="text-gray-800" x-text="invoice.qty">20</p>
				</div>
				<div className="px-1 w-32 text-right">
					<p className="text-gray-800" x-text="numberFormat(invoice.rate)">10</p>
				</div>
				<div className="px-1 w-32 text-right">
					<p className="text-gray-800" x-text="numberFormat(invoice.total)">200.00</p>
				</div>
				<div className="px-1 w-20 text-right">
					{/* <a href="#" className="text-red-500 hover:text-red-600 text-sm font-semibold" >Delete</a> */}
				</div>
			</div>


			{/* <TableBodyT/> */}




{}


{/* 
<div className="flex -mx-1 border-b py-2 items-start">
			<div className="flex-1 px-1">
				<p className="text-gray-800 uppercase tracking-wide text-sm font-bold">Total</p>
			</div>
			<div className="px-1 w-20 text-right">
				<p className="text-gray-800 uppercase tracking-wide text-sm font-bold"></p>
			</div>
			<div className="px-1 w-32 text-right">
				<p className="leading-none">
					<span className="block uppercase tracking-wide text-sm font-bold text-gray-800"></span>
				</p>
			</div>
			<div className="px-1 w-32 text-right">
				<p className="leading-none">
					<span className="block uppercase tracking-wide text-sm font-bold text-gray-800">2.456</span>
				</p>
			</div>
			<div className="px-1 w-32 text-right">
				<p className="leading-none">
					<span className="block uppercase tracking-wide text-sm font-bold text-gray-800">Pound</span>
				</p>
			</div>
			<div className="px-1 w-32 text-right">
				<p className="leading-none">
					<span className="block uppercase tracking-wide text-sm font-bold text-gray-800"></span>
				</p>
			</div>
			<div className="px-1 w-20 text-center">
			</div>
		</div> */}
	    <template x-for="invoice in items" >
			<div className="flex -mx-1 py-2 border-b">
				<div className="flex-1 px-1">
					<p className="text-gray-800" x-text="invoice.name"></p>
				</div>
				<div className="px-1 w-20 text-right">
					<p className="text-gray-800" x-text="invoice.qty"></p>
				</div>
				<div className="px-1 w-32 text-right">
					<p className="text-gray-800" ></p>
				</div>
				<div className="px-1 w-32 text-right">
					<p className="text-gray-800" ></p>
				</div>
				<div className="px-1 w-20 text-right">
					<a href="#" className="text-red-500 hover:text-red-600 text-sm font-semibold" >Delete</a>
				</div>
			</div>
		</template>
{/* 
		<button className="mt-6 bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 text-sm border border-gray-300 rounded shadow-sm">
			Add Invoice Items
		</button> */}
		{/* <div className="py-2 ml-auto mt-5 w-full sm:w-2/4 lg:w-1/4">
			<div className="flex justify-between mb-3">
				<div className="text-gray-800 text-right flex-1">Total incl. GST</div>
				<div className="text-right w-40">
					<div className="text-gray-800 font-medium" x-html="netTotal"></div>
				</div>
			</div>
			<div className="flex justify-between mb-4">
				<div className="text-sm text-gray-600 text-right flex-1">GST(18%) incl. in Total</div>
				<div className="text-right w-40">
					<div className="text-sm text-gray-600" x-html="totalGST"></div>
				</div>
			</div>
		
			<div className="py-2 border-t border-b">
				<div className="flex justify-between">
					<div className="text-xl text-gray-600 text-right flex-1">Amount due</div>
					<div className="text-right w-40">
						<div className="text-xl text-gray-800 font-bold" x-html="netTotal"></div>
					</div>
				</div>
			</div>
		</div> */}
		
		<div id="js-print-template" x-ref="printTemplate" className="hidden">
			<div className="mb-8 flex justify-between">
				<div>
					<h2 className="text-3xl font-bold mb-6 pb-2 tracking-wider uppercase">Invoice</h2>
					<div className="mb-1 flex items-center">
						<label className="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">Invoice No.</label>
						<span className="mr-4 inline-block">:</span>
						<div x-text="invoiceNumber"></div>
					</div>
		
					<div className="mb-1 flex items-center">
						<label className="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">Invoice Date</label>
						<span className="mr-4 inline-block">:</span>
						<div x-text="invoiceDate"></div>
					</div>
		
					<div className="mb-1 flex items-center">
						<label className="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">Due date</label>
						<span className="mr-4 inline-block">:</span>
						<div x-text="invoiceDueDate"></div>
					</div>
				</div>
				<div className="pr-5">
					<div className="w-32 h-32 mb-1 overflow-hidden">
						<img id="image2" className="object-cover w-20 h-20" />
					</div>
				</div>
			</div>
			<div className="flex justify-between mb-10">
				<div className="w-1/2">
					<label className="text-gray-800 block mb-2 font-bold text-xs uppercase tracking-wide">Bill To:</label>
					<div>
						<div x-text="billing.name"></div>
						<div x-text="billing.address"></div>
						<div x-text="billing.extra"></div>
					</div>
				</div>
				<div className="w-1/2">
					<label className="text-gray-800 block mb-2 font-bold text-xs uppercase tracking-wide">From:</label>
					<div>
						<div x-text="from.name"></div>
						<div x-text="from.address"></div>
						<div x-text="from.extra"></div>
					</div>
				</div>
			</div>
			<div className="flex flex-wrap -mx-1 border-b py-2 items-start">
				<div className="flex-1 px-1">
					<p className="text-gray-600 uppercase tracking-wide text-xs font-bold">Item</p>
				</div>
	
				<div className="px-1 w-32 text-right">
					<p className="text-gray-600 uppercase tracking-wide text-xs font-bold">Units</p>
				</div>
	
				<div className="px-1 w-32 text-right">
					<p className="leading-none">
						<span className="block uppercase tracking-wide text-xs font-bold text-gray-600">Unit Price</span>
						<span className="font-medium text-xs text-gray-500">(Incl. GST)</span>
					</p>
				</div>
	
				<div className="px-1 w-32 text-right">
					<p className="leading-none">
						<span className="block uppercase tracking-wide text-xs font-bold text-gray-600">Amount</span>
						<span className="font-medium text-xs text-gray-500">(Incl. GST)</span>
					</p>
				</div>
			</div>
			<template x-for="invoice in items" >
				<div className="flex flex-wrap -mx-1 py-2 border-b">
					<div className="flex-1 px-1">
						<p className="text-gray-800" x-text="invoice.name"></p>
					</div>
	
					<div className="px-1 w-32 text-right">
						<p className="text-gray-800" x-text="invoice.qty"></p>
					</div>
	
					<div className="px-1 w-32 text-right">
						<p className="text-gray-800" x-text="numberFormat(invoice.rate)"></p>
					</div>
	
					<div className="px-1 w-32 text-right">
						<p className="text-gray-800" x-text="numberFormat(invoice.total)"></p>
					</div>
				</div>
			</template>
			<div className="py-2 ml-auto mt-20" style={{width: "320px"}}>
				<div className="flex justify-between mb-3">
					<div className="text-gray-800 text-right flex-1">Total incl. GST</div>
					<div className="text-right w-40">
						<div className="text-gray-800 font-medium" x-html="netTotal"></div>
					</div>
				</div>
				<div className="flex justify-between mb-4">
					<div className="text-sm text-gray-600 text-right flex-1">GST(18%) incl. in Total</div>
					<div className="text-right w-40">
						<div className="text-sm text-gray-600" x-html="totalGST"></div>
					</div>
				</div>
			
				<div className="py-2 border-t border-b">
					<div className="flex justify-between">
						<div className="text-xl text-gray-600 text-right flex-1">Amount due</div>
						<div className="text-right w-40">
							<div className="text-xl text-gray-800 font-bold" x-html="netTotal"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
  </div>
  </div>
      <h1>{title}</h1>
      <div className="row">
        <div className="mb-3 col">
          <label className="form-label">estimated_price_old</label>
          <input
            {...fields.estimated_price_old}
            type="text"
            className={`form-control ${
              errors.estimated_price_old ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback">
            {errors.estimated_price_old?.message?.toString()}
          </div>
        </div>
        <div className="mb-3 col">
          <label className="form-label">loan_price_old</label>
          <input
            {...fields.loan_price_old}
            type="text"
            className={`form-control ${
              errors.loan_price_old ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback">
            {errors.loan_price_old?.message?.toString()}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="mb-3 col">
          <label className="form-label">interest_old</label>
          <input
            {...fields.interest_old}
            type="text"
            className={`form-control ${
              errors.interest_old ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback">
            {errors.interest_old?.message?.toString()}
          </div>
        </div>
        <div className="mb-3 col">
          <label className="form-label">
            expected_price_old
            {loan && (
              <em className="ms-1">
                (Leave blank to keep the same expected_price_old)
              </em>
            )}
          </label>
          <input
            {...fields.expected_price_old}
            type="expected_price_old"
            className={`form-control ${
              errors.expected_price_old ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback">
            {errors.expected_price_old?.message?.toString()}
          </div>
        </div>
      </div>
      <div className="mb-3">
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="btn btn-primary me-2 bg-blue-700"
        >
          {formState.isSubmitting && (
            <span className="spinner-border spinner-border-sm me-1"></span>
          )}
          Save
        </button>
        <button
          onClick={() => reset()}
          type="button"
          disabled={formState.isSubmitting}
          className="btn btn-secondary bg-gray-800"
        >
          Reset
        </button>
        <Link href="/loans" className="btn btn-link">
          Cancel
        </Link>
      </div>
    </form>
  );
		  }