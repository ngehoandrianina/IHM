import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const ModifSalle = ({show,setShow,refresh,update,upd,setupd}) => {
      //gestion d'erreur
  const [errors, setErrors] = useState('');
  const rules = {
    NumSalle: { required: true },
    Etage:{required:true},
    Batiment:{required:true},
  };

    const [NumSalle,SetNumSalle] = useState('')
    const [Etage,setEtage] = useState('')
    const [Batiment,SetBatiment] = useState('')
  const AjoutSalle =(e)=>{

      e.preventDefault()
      if(NumSalle === '' || Etage === '' || Batiment === ''){
        setErrors('Veuilez remplir tout les champs !')
      }
      else{
      axios.post('http://127.0.0.1:8000/materielle/salle/',{
          nom:NumSalle,
          etage:Etage,
          batiment:Batiment
      })
      .then((res)=>{
        toast.success('Salle Ajouter avec Success !!')
        setEtage('')
        SetBatiment('')
        SetNumSalle('')
        refresh((prev)=>!prev)
        setShow(false)
      })
      .catch((err)=>{
          toast.error('Une erreur s\'est produit veuillez reesayer')
          console.log(err)
      })
      
    }
  }
  //Update
  const [id,setid] = useState('')
  useEffect(()=>{
    if(update.lenght !== 0){
      setid(update.id)
      setEtage(update.etage)
      SetNumSalle(update.nom)
      SetBatiment(update.batiment)
    }
  },[update])
  const ModifSalle =(e)=>{
    e.preventDefault()
    axios.put(`http://127.0.0.1:8000/materielle/salle/${id}/`,{
        nom:NumSalle,
        etage:Etage,
        batiment:Batiment
    })
    .then((res)=>{
      toast.success('Salle Ajouter avec Success !!')
      setEtage('')
      SetBatiment('')
      SetNumSalle('')
      refresh((prev)=>!prev)
      setShow(false)
      setupd(false)
    })
    .catch((err)=>{
        toast.error('Une erreur s\'est produit veuillez reesayer')
        console.log(err)
    })
}
  const Annuler = ()=>{
    setEtage('')
    SetNumSalle('')
    SetBatiment('')
    setShow(false)
    setupd(false)
    setErrors('')
  }
  return (
    <>
         {
            show && 
            <div className='absolute top-0 z-30 left-0 bg-[#14080871] w-full h-full flex items-center justify-center  p-4'>
                 <motion.div
                initial={{x:-300,opacity:0}}
                animate={{x:0,opacity:1}}
                 transition={{ duration: 0.4 }}  
                 className='bg-white  relative overflow-hidden  rounded-2xl lg:w-[60%] w-[90%] lg:h-[80%] h-[90%] flex flex-col items-center'>
                
                <div className='relative pt-2 pl-4  flex items-center justify-center shadow w-[100%] h-[30%]' style={{background:`url('/icone/bg.jpeg ')`}} >
                <div className='absolute inset-0 backdrop-blur-xs '></div>
                <div className=' h-full w-full flex items-center justify-center  '>
                   
                   <h1 onClick={()=>Annuler()} className='absolute text-white font-bold text-2xl top-2 right-4 hover:scale-110 cursor-pointer'>X</h1>
                   <h1 className='text-white text-4xl z-50'>{upd ? 'Modification salle':'Ajout salle'}</h1>
                </div>
             </div>
             <div className='lg:w-[50%] h-[90%] w-full p-4'>
             <form className='flex flex-col justify-around h-[100%]'>
            
              <div className='flex flex-col'>
                    {errors && <p className='text-red-600 font-thin text-[20px]'>{errors}</p>}
                    <input value={NumSalle} onChange={(e)=>SetNumSalle(e.target.value)} class="p-2 mt-8 rounded-xl border" type="number" name="type" placeholder="Numero de Salle" />
                    <input value={Batiment} onChange={(e)=>SetBatiment(e.target.value)} class="p-2 mt-8 rounded-xl border" type="text" name="type" placeholder="Batiment" />
                    <input value={Etage} onChange={(e)=>setEtage(e.target.value)} class="p-2 mt-8 rounded-xl border" type="Number" name="type" placeholder="Etage" />
              </div>
              <div className='flex items-center justify-end gap-6'>
                   <button onClick={()=>Annuler()} className='px-6 bg-white text-black border-2 border-primary
                    py-2 rounded-xl hover:scale-105 duration-300
                   font-medium flex flex-row items-center justify-center'>Annuler
                   </button>
                   <button onClick={upd ? (e)=>ModifSalle(e):(e)=>AjoutSalle(e)} className='px-6 bg-primary text-white
                    py-2 rounded-xl hover:scale-105 duration-300
                   font-medium flex flex-row items-center justify-center'>{upd ? "Modifier":"Ajouter"}
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

export default ModifSalle