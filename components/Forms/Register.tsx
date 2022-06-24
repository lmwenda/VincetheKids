import Router from 'next/router';
import React, { useState } from 'react'
import {BASE_URL} from '../../utils/exportedDefinitions';

const Register = () => {

  const [ message, setMessage ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
 
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

const createUser = async(e: React.FormEvent) => {
  e.preventDefault();

  const user = {
    email,
    password
  }
  
  const response = await fetch(
    BASE_URL + "/users/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }
  );

  const data = await response.json();
  setMessage(data.message);
  
  if(data.message === "Successfully Created a new user...") return Router.push("/login");
}

 return (
   <div className='md:pt-16'>
     <h1 className='text-4xl'>Register</h1>
      <form className="flex flex-col space-y-5 mt-10 items-center">
        <label className="text-center">{message}</label>
          
        <label className="w-[80vw] text-left md:w-[50vw]">Email</label>
        <input className="border border-gray-300 w-[80vw] p-2 rounded sm:w-[50vw]" onChange={emailHandler} type="email" />
  
        <label className="w-[80vw] text-left md:w-[50vw]">Password</label>
        <input className="border border-gray-300 w-[80vw] p-2 rounded sm:w-[50vw]" onChange={passwordHandler} type="password" />
    
   
        <button 
        className="p-2 bg-gray-500 border border-gray-500 text-white rounded w-[90vw] sm:w-[50vw]" 
          onClick={(e: React.FormEvent) => createUser(e)}>
          Register
        </button>
      </form>
    </div>
  )
}

export default Register;
