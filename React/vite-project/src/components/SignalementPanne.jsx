import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import auhtService from '../Service/authService.js'
import axios from 'axios'
import { toast } from 'react-toastify'


const SignalementPanne = ({show,setShow}) => {
    const [NomMat,setNomMat] = useState('')
    const [idMat,setIdMat] = useState('')
   //GEstion d'erreur
   const [errors, setErrors] = useState({});
   const validation = ()=>{
     let newErrors = {};
     if(Description.trim() === ""){
       newErrors.description = "Description de panne est requis";
     }
     if(String(idMat).trim() === ""){
       newErrors.mat = "Le champs materrielle est requis"
     }
     setErrors(newErrors);
     return Object.keys(newErrors).length === 0; 
   }
    const Annuler =()=>{
        setShow(false)
        setMat([])
        setErrors({})
        setDescription('')
      }
      const [mat,setMat] = useState([])
      useEffect(()=>{
        axios.get('http://127.0.0.1:8000/materielle/materiels/')
        .then((res)=>{
          console.log(res.data)
          setMat(res.data)
        })
        .catch((err)=>{
         
          console.log(err)
        })
      },[])
    const UserID = auhtService.getCurrentUser()
    const [Description,setDescription] = useState('')
    const Signaler = (e) =>{
      e.preventDefault()
      if(validation()){
        
        axios.post('http://127.0.0.1:8000/materielle/signalement-panne/',{
        utilisateur_id:UserID.id,
        materiel_id:idMat,
        description:Description
      })
      .then((res)=>{
        console.log(res)
        toast.success('Materiel marque en panne')
      })
      .catch((err)=>{
        toast.error("Il y a une erreur")
        console.log(err)
      })
      }
    }
    //Resaka Suggestion
    
    useEffect(()=>{
      const Selected = mat.find(m =>m.nom === NomMat )
      if(Selected){
        setIdMat(Selected.id)
        console.log('hita')
      }
      else{
        setIdMat('')
      }
    },[NomMat])
   
  return (
    <>
        {
            show && 
            <div className='absolute top-0 left-0 bg-[#14080871] w-full h-full flex items-center justify-center  p-4 z-50'>
                <motion.div
                initial={{x:-300,opacity:0}}
                animate={{x:0,opacity:1}}
                transition={{ duration: 0.4 }}  
                className='bg-white  relative overflow-hidden  rounded-2xl lg:w-[60%] w-[90%] lg:h-[80%] h-[90%] flex flex-col items-center'>
                    
                    <div className=' relative  flex items-center  justify-center shadow w-[100%] h-[30%]' style={{background:`url('/icone/bg.jpeg ')`}} >
                    <div className='absolute inset-0 backdrop-blur-xs '></div>
                    <h1 onClick={()=>Annuler()} className='absolute text-white font-bold text-2xl top-2 right-4 hover:scale-110 cursor-pointer'>X</h1>
                      <h1 className='text-center text-xl lg:text-3xl text-white mt-2 z-50'>
                        Signalement de panne
                      </h1>
                    </div>
                    <div className='lg:w-[50%] w-full h-[100%]  '> 
                      <form className='flex flex-col justify-between p-4 h-[100%]'>
                        <div className='flex flex-col'>
                        <input onChange={(e)=>setNomMat(e.target.value)} value={NomMat}  list='Materiel' class="p-2 mt-8 rounded-xl border" type="text"  placeholder="Materiel" />
                        {errors.mat && <p className='text-red-600 font-thin text-[10px]'>{errors.mat}</p>}
                        <datalist id='Materiel'>
                          {
                            mat && mat.map((Mat)=>(
                              <option  value={Mat.nom}>{Mat.nom}</option>
                            ))
                          }
                        </datalist>
                        <textarea onChange={(e)=>setDescription(e.target.value)} value={Description} class="p-2 h-40 mt-8 rounded-xl border" type="text" name="departement"  placeholder="Description du panne" />
                        {errors.description && <p className='text-red-600 font-thin text-[10px]'>{errors.description}</p>}
                        </div>
                      <div className='w-[100%] flex items-center justify-end gap-6 pb-6'>
                      <button onClick={()=>Annuler()}  className='px-6 border border-primary text-primary
                      py-2 rounded-xl hover:scale-105 duration-300
                      font-medium flex flex-row items-center justify-center'>Annuler
                      </button>
                      <button onClick={(e)=>Signaler(e)}  className='px-6 bg-primary text-white
                      py-2 rounded-xl hover:scale-105 duration-300
                      font-medium flex flex-row items-center justify-center'>Valider<img src='/icone/valide.png' className='w-6 ml-2 '/>
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

export default SignalementPanne