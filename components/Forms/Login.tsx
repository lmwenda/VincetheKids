import { useRouter } from 'next/router';
import { auth } from '../../utils/firebase';
import React, { ChangeEventHandler, MouseEventHandler, useState } from 'react'
import { signInWithEmailAndPassword, getIdToken, UserCredential } from "firebase/auth";

const Login = () => {

  const navigate = useRouter();

  const [ message, setMessage ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ password, setPassword ] = useState<string>("");
  const [ submittedForm, setSubmittedForm ] = useState<boolean>(false);

  const emailHandler: ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value);
  const passwordHandler: ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value);

  const loginUser: MouseEventHandler<HTMLButtonElement> = async(e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setSubmittedForm(true);

    setLoading(true);

    const user: UserCredential = await signInWithEmailAndPassword(auth, email, password);

    localStorage.setItem("vtc-token", JSON.stringify(await getIdToken(user.user)))


    if (user) return setMessage("Successfully Logged In");
    if (!user) return setMessage("Invalid Email or Password")

    setLoading(false);
}

React.useEffect((): void => {
  const token: string | null = localStorage.getItem("vtc-token");
  const redirectIfLoggedIn: Function = () => {
    if(token) return navigate.push("/");
    window.location.reload();
  }

  redirectIfLoggedIn();
})

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
