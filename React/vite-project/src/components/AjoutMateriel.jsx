import React, { useState } from 'react'
import useMultiStepForm from '../Hooks/useMultiStepForm'
import Stepper from './Stepper';
import axios from 'axios';
import {motion, AnimatePresence} from 'framer-motion'

const AjoutMateriel = ({show,setShow}) => {
  const {step,currentStepIndex, next, back, isFirstStep, isLastStep} = useMultiStepForm([1,2,3]);
  const [Step,setStep] = useState(1)
  const [data,setData] = useState({
    id:'',
    nom:'',
    type:'',
    marque:'',
    modele:'',
    numero_serie:'',
    etat:'',
    date_acquisition:'',
    salle:'',
    departement:''
  })
  const setDonner =(e)=>{
      setData({
        ...data,
        [e.target.name]:e.target.value
      })
  }
  const Ajouter =(e)=>{
    e.preventDefault()
    axios.post('http://127.0.0.1:8000/materielle/materiels/',{
    id:data.id,
    nom:data.nom,
    type:data.type,
    marque:data.marque,
    modele:data.modele,
    numero_serie:data.numero_serie,
    etat:data.etat,
    date_acquisition:data.date_acquisition.toString().split('T')[0],
    salle:data.salle,
    departement:data.departement
    })
    .then((res)=>{
      console.log(res.data)
    })
    .catch((err)=>{
      console.log(err.response.data)
    })
  }
  //Step
  const nextStep = () => {
  
      setDirection(1);
      setStep(2);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep(1);
  };
  //Animation 
  const [direction, setDirection] = useState(0);
  const variants = {
    initial: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0
    })
  };
  return (
    <>
    {
      show && (
        <div className='absolute top-0 left-0 bg-[#14080871] w-full h-full flex items-center justify-center  p-4'>
        <div className='bg-white p-6 rounded-2xl'>
             <h1 className='text-center'>Ajout Nouveau materiel</h1>
             <form className='flex flex-col w-80 relative'>
              { Step === 1 &&
                <motion.div   key="step1"
                custom={direction}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }} className='flex flex-col w-full'>
                   <input class="p-2 mt-8 rounded-xl border" type="text" name="id" onChange={setDonner} value={data.id} placeholder="Identifiant" />
                   <input class="p-2 mt-8 rounded-xl border" type="text" name="nom" onChange={setDonner} value={data.nom} placeholder="nom" />
                   <input class="p-2 mt-8 rounded-xl border" type="text" name="type" onChange={setDonner} value={data.type} placeholder="type" />
                   <input class="p-2 mt-8 rounded-xl border" type="text" name="marque" onChange={setDonner} value={data.marque} placeholder="marque" />
                   <input class="p-2 mt-8 rounded-xl border" type="text" name="modele" onChange={setDonner} value={data.modele} placeholder="model" />
                   <div className='w-full flex items-center justify-end'>
                   <button onClick={()=>nextStep()} className='bg-[#002D74] text-white
                    py-2 rounded-xl hover:scale-105 duration-300
                     hover:bg-[#206ab1] font-medium '>Suivant</button>
                  </div>
               </motion.div>
              }
              {
                Step === 2 && 
                <motion.div  key="step2"
                custom={direction}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }} className='flex flex-col w-full'>
                    <input class="p-2 mt-8 rounded-xl border" type="text" name="numero_serie" onChange={setDonner} value={data.numero_serie} placeholder="numeroDeSerie" />
                    <input class="p-2 mt-8 rounded-xl border" type="text" name="etat" onChange={setDonner} value={data.etat} placeholder="etat" />
                    <input class="p-2 mt-8 rounded-xl border" type="date" name="date_acquisition" onChange={setDonner} value={data.date_acquisition} placeholder="dateAq" />
                    <input class="p-2 mt-8 rounded-xl border" type="text" name="salle" onChange={setDonner} value={data.salle} placeholder="salle" />
                    <input class="p-2 mt-8 rounded-xl border" type="text" name="departement" onChange={setDonner} value={data.departement} placeholder="departement" />
                    <div className='w-full flex items-center justify-between'>
                    <button className='bg-[#002D74] text-white
                    py-2 rounded-xl hover:scale-105 duration-300
                     hover:bg-[#206ab1] font-medium '  onClick={()=>prevStep()}>prev</button>
                    <button className='bg-[#002D74] text-white
                    py-2 rounded-xl hover:scale-105 duration-300
                     hover:bg-[#206ab1] font-medium ' onClick={(e)=>Ajouter(e)}>Ajouter</button>
                    </div>
                </motion.div>
              } 
              <button onClick={()=>setShow(false)}>Anunuler</button>
             </form>
        </div>
        </div>
      )
    }
   
    </>
  )
}

export default AjoutMateriel