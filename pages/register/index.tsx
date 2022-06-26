import React from 'react'; 
import { motion } from 'framer-motion'; 
import Register from '../../components/Forms/Register';
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
           <Image src="https://firebasestorage.googleapis.com/v0/b/vincethekids.appspot.com/o/carousel%2Fimage_1.jpg?alt=media&token=6f662348-8207-475b-aa18-18fbf9a544f5" className='relative container rounded justify-center relative sm:w-auto md:w-9/12' height={750} width={550} />
            <Register />  
       </div> 
    </motion.div>
  )
}

export default index;
