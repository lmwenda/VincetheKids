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
    className="mt-10 relative justify-center items-center container mx-auto flex flex-col md:flex-row">
         <div className='mx-44 mb-10 flex flex-col space-y-10 md:flex-row md:space-x-48'> 
            <Image src="https://firebasestorage.googleapis.com/v0/b/vincethekids.appspot.com/o/carousel%2Fimage_3.jpg?alt=media&token=cfb3d915-e2cb-43c8-a822-2e49edc6a20a" className='relative container rounded justify-center relative sm:w-auto md:w-9/12' height={750} width={550} />
            <Login />  
       </div> 
    </motion.div>
  )
}

export default index;
