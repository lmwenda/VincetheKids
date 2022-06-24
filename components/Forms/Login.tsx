import Router from 'next/router';
import React, { useState } from 'react'
import { BASE_URL } from '../../utils/exportedDefinitions';

const Login = ({ token }: any) => {

  const [ message, setMessage ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const loginUser = async(e: React.FormEvent) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password
    }

    const response = await fetch(BASE_URL + "/users/login", 
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)  
    });

    const data = await response.json();
    setMessage(data.message);

    if(data.payload.jwt_token){
      localStorage.setItem("vtk-token", data.payload.jwt_token);
      console.log(data.payload.user);
      Router.push(`/gallery`)
      await new Promise((resolve) => setTimeout(resolve, 100));
      Router.reload();
    }
  }

  return (
    <div className='md:pt-16'>

      <h1 className='text-4xl'>Login</h1>
      <form className="flex flex-col space-y-5 mt-10 items-center">
      
        <label className="text-center justify-center text-red">{message}</label>
        
        <label className="w-[80vw] text-left md:w-[50vw]">Email</label>
        <input className="border border-gray-300 w-[80vw] p-2 rounded sm:w-[50vw]" onChange={emailHandler} type="email" />

        <label className="w-[80vw] text-left md:w-[50vw]">Password</label>
        <input className="border border-gray-300 w-[80vw] p-2 rounded sm:w-[50vw]" type="password" onChange={passwordHandler} />
    
        <button onClick={loginUser} className="p-2 bg-gray-500 border border-gray-500 text-white rounded w-[90vw] sm:w-[50vw]">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login;
