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
    const token = localStorage.getItem("vtc-token");
    const redirectIfLoggedIn = () => {
      if (token) return navigate.push("/gallery");
    }

    redirectIfLoggedIn();
  })

 return (
  <div className="m-14 flex flex-col mx-auto w-96  justify-center items-center md:w-[30vw]">

  {
    <p>{message}</p>
  }

  <form className="m-5 flex flex-col space-y-10 justify-center items-center w-full md:w-[30vw]">
      <h1 className="text-center text-3xl">Register</h1>
      <p className="text-lg text-center text-gray-500">Create an Account and view VincetheKid's Gallery as soon as possible...</p>
      <input className="p-3 border border-gray-300 rounded w-96" placeholder="Email:" onChange={emailHandler} type="email" />
      <input type="password" className="border p-3 border-gray-300 rounded w-96" onChange={passwordHandler} placeholder="Password:" />
      <button className="bg-gray-300 text-white p-3 rounded w-96" onClick={(e: React.FormEvent) => onRegister(e)}>Register</button>
  </form>
</div>
  )
}

export default Register;
