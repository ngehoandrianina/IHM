import React from 'react'
import { motion } from 'framer-motion'

const FairePre = ({show,setShow}) => {
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
            <h1 className='text-white'>Faire un pret</h1>
        </div>
     </div>
     <div className='w-[50%] h-[100%]'>
     <form className='flex flex-col justify-evenly p-4 h-[100%]'>
        <div className='flex flex-col'>
        <input class="p-2 mt-8 rounded-xl border" type="text" name="type"  placeholder="type" />
        <input class="p-2 mt-8 rounded-xl border" type="text" name="date_acquisition"  placeholder="dateAq" />
        <input class="p-2 mt-8 rounded-xl border" type="text" name="etat" placeholder="etat" />
        <input class="p-2 mt-8 rounded-xl border" type="text" name="type"  placeholder="type" />
        </div>
        <div className='w-[100%] flex items-center justify-end gap-6'>
        <button  className='px-6 border border-primary text-primary
        py-2 rounded-xl hover:scale-105 duration-300
        font-medium flex flex-row items-center justify-center'>Annuler
        </button>
        <button  className='px-6 bg-primary text-white
        py-2 rounded-xl hover:scale-105 duration-300
        font-medium flex flex-row items-center justify-center'>Ajouter<img src='/icone/valide.png' className='w-6 ml-2 '/>
        </button>
        </div>
        </form>
     </div>
        </motion.div>
    </div>
    }
    </>
  )
}

export default FairePre