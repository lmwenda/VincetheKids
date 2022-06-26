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

  const emailHandler: ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value);
  const passwordHandler: ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value);

  const loginUser: MouseEventHandler<HTMLButtonElement> = async(e: React.FormEvent): Promise<void> => {
    e.preventDefault();

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
    if(token) {
      window.location.reload();
      return navigate.push("/");
    }
  }

  redirectIfLoggedIn();
})

  return (
    <div className="m-14 flex flex-col mx-auto w-96  justify-center items-center md:w-[30vw]">

      {
        <p>{message}</p>
      }

      <form className="m-5 flex flex-col space-y-10 justify-center items-center w-full md:w-[30vw]">
          <h1 className="text-center text-3xl">Login</h1>
          <input className="p-3 border border-gray-300 rounded w-96" placeholder="Email:" onChange={emailHandler} type="email" />
          <input type="password" className="border p-3 border-gray-300 rounded w-96" onChange={passwordHandler} placeholder="Password:" />
          <button className="bg-gray-300 text-white p-3 rounded w-96" onClick={loginUser}>Register</button>
      </form>
    </div>
  )
}

export default Login;
