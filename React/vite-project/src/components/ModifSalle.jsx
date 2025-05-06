import React from 'react'
import { motion } from 'framer-motion'

const ModifSalle = ({show,setShow}) => {
  return (
    <>
         {
            show && 
            <div className='absolute top-0 left-0 bg-[#14080871] w-full h-full flex items-center justify-center  p-4'>
                 <motion.div
                initial={{x:-300,opacity:0}}
                animate={{x:0,opacity:1}}
                 transition={{ duration: 0.4 }}  
                 className='bg-white  relative overflow-hidden  rounded-2xl w-[60%] h-[80%] flex flex-col items-center'>
                <h1 onClick={()=>setShow(false)} className='absolute text-white font-bold text-2xl top-2 right-4 hover:scale-110 cursor-pointer'>X</h1>
                <div className='   flex items-center justify-center shadow w-[100%] h-[30%]' style={{background:`url('/icone/bg.jpeg ')`}} >
                <div className=' h-full w-full flex items-center justify-center  '>
                    
                </div>
             </div>
             <div className='w-[50%] h-[100%]'>

             </div>
                </motion.div>
            </div>
        }
    </>
  )
}

export default ModifSalle