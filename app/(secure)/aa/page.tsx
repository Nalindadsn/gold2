"use client"
import { Spinner } from '_components';
import { AddEditShareLink } from '_components/loans/AddEditShareLink';
import { useRateService } from '_services';
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";

function AddEditS() {
  const [nic, setNic] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<{email: string, age: number} | null>(null);
  const [keys, setKeys] = useState<string[]>([]);
  const [length, setLength] = useState<number>(0);
  function handleSave() {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("nic", "Anisha");
      localStorage.setItem("userId", "12345");
      localStorage.setItem("userData", JSON.stringify({ email: "anisha@example.com", age: 25 }));
  
      let nic = localStorage.getItem("nic");
      let userId = localStorage.getItem("userId");
      let userData = JSON.parse(localStorage.getItem("userData")!);
      let keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i)!);
      }
  
      setNic(nic);
      setUserId(userId);
      setUserData(userData);
      setKeys(keys);
      setLength(localStorage.length);
    }
  }
  function handleRemove() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('nic');
      setNic(null);
    }
  }
  function handleClear() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.clear();
      setNic(null);
      setUserId(null);
      setUserData(null);
    }
  }
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      let nic:any = localStorage.getItem('nic');
      let userId:any = localStorage.getItem('userId');
      let lc=localStorage.getItem('userData')
      let userData:any=""
      if(lc!==null || typeof lc === 'string'){
        
      let userData:any = JSON.parse(lc);
      }
      let keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i)!);
      }
      setNic(nic);
      setUserId(userId);
      setUserData(userData);
      setKeys(keys);
      setLength(localStorage.length);
    }
  }, []);


  
  const rateService = useRateService();
  const rate = rateService.rate;


  useEffect(() => {
      rateService.getSelected()
  }, []);
  const { register, setValue ,formState} = useForm();
  
//   const { update } = useFieldArray({ name: 'array' });

  return rate? (
    <div>
        <form >
            
        -{JSON.stringify(formState)}-
          <input {...register("firstName")} />
          <input {...register("lastName")} />
      <button type="button" onClick={() => setValue("lastName",{...register("lastName")})} 
        style={{border:"1px solid #333"}}>
        setValue
      </button>
      
        </form>



{/* <AddEditShareLink title="ADD LOAN DETAILS" rate={rate}/> */}
    
    </div>
  ):<Spinner />
}

export default AddEditS