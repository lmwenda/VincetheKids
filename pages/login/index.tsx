import React from 'react'; 
import { motion } from 'framer-motion'; 
import Login from '../../components/Forms/Login';
import { NextPage } from 'next';
import Image from 'next/image';

const index: NextPage = () => {
  return (
    <motion.div 
    animate={{ x: [  -75, 0 ], 
    opacity: [ 0, 0.5, 0.7, 0.9, 1 ] }} 
    transition={{ ease: 'easeIn', duration: 0.5 }} 
    className="mt-5 flex flex-col justify-center text-center md:mt-20">
         <div className='mx-44 mb-10 flex flex-col space-y-10 md:flex-row md:space-x-10'> 
           <Image src="https://firebasestorage.googleapis.com/v0/b/vincethekids.appspot.com/o/carousel%2Fimage_2.jpg?alt=media&token=f7a3b4cf-482f-42d6-9655-d164dcba6c79" className='rounded object-fit justify-center relative sm:w-auto md:w-9/12' height={750} width={550} />
          <Login />  
       </div> 
    </motion.div>
  )
}

export default index;
