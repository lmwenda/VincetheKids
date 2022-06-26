import type { NextPage } from "next";
import Image from "next/image";
import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";

type BodyInput = {
    email: string,
    message: string
}

const Contact: NextPage = (): JSX.Element => {

    const [ email, setEmail ] = useState<string>("");
    const [ message, setMessage ] = useState<string>("");

    const emailHandler: ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)
    const messageHandler: ChangeEventHandler<HTMLTextAreaElement> = (e: React.ChangeEvent<HTMLTextAreaElement>): void => setMessage(e.target.value);

    const sendEmail: MouseEventHandler<HTMLButtonElement> = async(e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        const bodyInput: BodyInput  = {
            email,
            message
        }

        const data: string = JSON.stringify(bodyInput);

        const response: Response = await fetch("/api/mail", {
            method: "POST",
            body: data
        });

        const returnedData: Promise<JSON> = await response.json();
        console.log(returnedData);
    }


    return (
        <div className="relative justify-center items-center container mx-auto flex flex-col md:flex-row">
            <Image src={"https://firebasestorage.googleapis.com/v0/b/vincethekids.appspot.com/o/carousel%2Fimage_1.jpg?alt=media&token=6f662348-8207-475b-aa18-18fbf9a544f5"} alt="" className='rounded object-fit justify-center relative sm:w-auto md:w-9/12' height={750} width={550} />
            <div className="m-14 flex flex-col mx-auto w-96  justify-center items-center md:w-[30vw]">

                <form className="m-5 flex flex-col space-y-10 justify-center items-center w-full md:w-[30vw]">
                    <h1 className="text-center text-3xl">Contact Us</h1>
                    <p className="text-lg text-center text-gray-500">Send us a message and we&apos;ll try get back as soon as possible...</p>
                    <input className="p-3 border border-gray-300 rounded w-96" placeholder="Email:" onChange={emailHandler} type="email" />
                    <textarea className="border p-3 border-gray-300 rounded w-96" onChange={messageHandler} placeholder="Message:" />
                    <button className="bg-gray-300 text-white p-3 rounded w-96" onClick={sendEmail}>Send</button>
                </form>
            </div>
        </div>
    );
}

export default Contact;