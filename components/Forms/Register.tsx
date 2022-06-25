import { useRouter } from 'next/router';
import React, { ChangeEventHandler, useState } from 'react'
import { auth } from '../../utils/firebase';
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";

const Register = () => {

  const navigate = useRouter();

  const [ message, setMessage ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ password, setPassword ] = useState<string>("");
 
  const emailHandler: ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value);
  const passwordHandler: ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value);

  const onRegister: Function = async(e: React.FormEvent): Promise<void> => {
      e.preventDefault();

      setLoading(true);
      
      const user: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);

      if(user) setMessage("Successfully Created a new Account...");
      if(!user) setMessage("Failed to Create a new Account...");

      navigate.push("/login");


      setLoading(false);
  }

  React.useEffect((): void => {
    const token = localStorage.get("vtc-token");
    const redirectIfLoggedIn = () => {
      if (token) return navigate.push("/gallery");
    }

    redirectIfLoggedIn();
  })

 return (
   <div className='md:pt-16'>
     <h1 className='text-4xl'>Register</h1>
      <form className="flex flex-col space-y-5 mt-10 items-center">
        <label className="text-center">{message}</label>

        {
          loading ? <label className='text-center'>Loading...</label> : null 
        }
          
        <label className="w-[80vw] text-left md:w-[50vw]">Email</label>
        <input className="border border-gray-300 w-[80vw] p-2 rounded sm:w-[50vw]" onChange={emailHandler} type="email" />
  
        <label className="w-[80vw] text-left md:w-[50vw]">Password</label>
        <input className="border border-gray-300 w-[80vw] p-2 rounded sm:w-[50vw]" onChange={passwordHandler} type="password" />
    
   
        <button 
        className="p-2 bg-gray-500 border border-gray-500 text-white rounded w-[90vw] sm:w-[50vw]" 
          onClick={(e: React.FormEvent) => onRegister(e)}>
          Register
        </button>
      </form>
    </div>
  )
}

export default Register;
