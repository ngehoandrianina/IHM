import React, { useEffect, useState } from 'react'
import useMultiStepForm from '../Hooks/useMultiStepForm'
import Stepper from './Stepper';
import axios from 'axios';
import {motion, AnimatePresence} from 'framer-motion'
import {toast} from 'react-toastify'

const Datako = ['Identifian','Information','Attribution']
const AjoutMateriel = ({show,setShow,refresh,DataUpdate,Update,SetUpdate}) => {

  const initialData = {
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
  }
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
      setErrors({ ...errors, [e.target.name]: "" });
  }
  //Edit
  
  useEffect(()=>{
    setStep(1)
    if(DataUpdate){
      setData(DataUpdate)
    }
  },[DataUpdate])
  const UpdateMat = (e) =>{
    e.preventDefault()
    axios.put(`http://127.0.0.1:8000/materielle/materiels/${data.id}/`,{
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
      toast.success('Materielle modifier Avec Success !')
      setShow(false)
      refresh((prev)=>!prev)
      setData(initialData)
      SetUpdate(false)
    })
    .catch((err)=>{
      console.log(err.response.data)
    })
  }
     //gestion d'erreur
     const [errors, setErrors] = useState({});

     const validateStep = () => {
      let newErrors = {};
    
      if (Step === 1) {
        if (!data.type || data.type.trim() === "") {
          newErrors.type = "Type du matériel requis.";
        }
    
        if (!data.date_acquisition || data.date_acquisition.trim() === "") {
          newErrors.date_acquisition = "Date d'acquisition requise.";
        }
      }
    
      if (Step === 2) {
        if (!data.nom || data.nom.trim() === "") {
          newErrors.nom = "Nom requis.";
        }
        if (!data.marque || data.marque.trim() === "") {
          newErrors.marque = "Marque requise.";
        }
        if (!data.modele || data.modele.trim() === "") {
          newErrors.modele = "Modèle requis.";
        }
        if (!data.numero_serie || data.numero_serie.trim() === "") {
          newErrors.numero_serie = "Numéro de série requis.";
        }
      }
    
      if (Step === 3) {
        if (!data.etat || data.etat.trim() === "") {
          newErrors.etat = "État requis.";
        }
        if (!data.salle || data.salle.trim() === "") {
          newErrors.salle = "Salle requise.";
        }
        if (!data.departement || data.departement.trim() === "") {
          newErrors.departement = "Département requis.";
        }
      }
    
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0; // true si aucune erreur
    };
    
  //Ajout
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
    salle_id:data.salle,
    departement:data.departement
    })
    .then((res)=>{
      toast.success('Nouveau materielle Ajouetr !')
      setShow(false)
      refresh((prev)=>!prev)
      setData(initialData)
    })
    .catch((err)=>{
      console.log(err.response.data)
    })
  }
  //Step
  const nextStep = (e) => {
      e.preventDefault()
      setDirection(1);
      if (validateStep()) {
        if (Step < 3) {
          setStep(Step + 1);
        }
      } else {
        console.log('Nes pas valide');
      }
  };

  const prevStep = (e) => {
    e.preventDefault()
    setDirection(-1);
    if(Step>1){
      setStep(Step-1);
    }
  
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
 const annuler=()=>{
  setShow(false)
  setData(initialData)
  setStep(1)
  setErrors({})
 }

  return (
    <>
    {
      show && (
        <div className='absolute top-0 z-30 left-0 bg-[#14080871] w-full h-full flex items-center justify-center  p-4'>
        <motion.div  custom={direction}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit" transition={{ duration: 0.4 }}  
                className='bg-white  relative overflow-hidden  rounded-2xl lg:w-[60%] w-[90%] lg:h-[80%] h-[90%] flex flex-col items-center '>
                
            <div className=' relative  flex items-center justify-center shadow w-[100%] h-[30%]' style={{background:`url('/icone/bg.jpeg ')`}} >
            <div className='absolute inset-0 backdrop-blur-xs '></div>
              <h1 onClick={()=>annuler()} className='absolute text-white font-bold text-2xl top-2 right-4 hover:scale-110 cursor-pointer'>X</h1>
                <div className=' h-full w-full flex items-center justify-center'>
                  
                    <Stepper steps={Datako} currentStep={Step-1}  />
                </div>
             </div>
             <div className=' h-[100%] lg:w-[60%] w-[90%] flex items-center justify-center'>
             <form className='flex flex-col w-full h-full'>
              { Step === 1 &&
                <div key="step1"
                className='flex flex-col w-full  h-full p-2 justify-between'>
                  <h1 className='text-black text-xl'>Identification du materiel</h1>
                  <div className='w-full  h-full flex flex-col'>
                  <input class="p-2 mt-8 rounded-xl border" type="text" name="type" onChange={setDonner} value={data.type} placeholder="Type du materielle" />
                  {errors.type && <p className='text-red-600 font-thin text-[10px]'>{errors.type}</p>}
                  <input class="p-2 mt-8 rounded-xl border" type="date" name="date_acquisition" onChange={setDonner} value={data.date_acquisition} placeholder="dateAq" />
                  {errors.date_acquisition && <p className='text-red-600 font-thin text-[10px]'>{errors.date_acquisition}</p>}
                   </div>
               </div>
              }
               { Step === 2 &&
                <div key="step2"
                className='flex flex-col w-full  h-full p-2 justify-between'>
                  <h1 className='text-black text-xl'>Information du materiel</h1>
                  <div className='w-full  h-full flex flex-col'>
                  <input class="p-2 mt-8 rounded-xl border" type="text" name="nom" onChange={setDonner} value={data.nom} placeholder="nom" />
                  {errors.nom && <p className='text-red-600 font-thin text-[10px]'>{errors.nom}</p>}
                  <input class="p-2 mt-8 rounded-xl border" type="text" name="marque" onChange={setDonner} value={data.marque} placeholder="marque" />
                  {errors.marque && <p className='text-red-600 font-thin text-[10px]'>{errors.marque}</p>}
                  <input class="p-2 mt-8 rounded-xl border" type="text" name="modele" onChange={setDonner} value={data.modele} placeholder="model" />
                  {errors.modele && <p className='text-red-600 font-thin text-[10px]'>{errors.model}</p>}
                  <input class="p-2 mt-8 rounded-xl border" type="text" name="numero_serie" onChange={setDonner} value={data.numero_serie} placeholder="numeroDeSerie" /> 
                  {errors.numero_serie && <p className='text-red-600 font-thin text-[10px]'>{errors.numero_serie}</p>} 
                  </div>
                
               </div>
              }
              {
                Step === 3 && 
               <div key="step2"
                  className='flex flex-col w-full  h-full p-2 justify-between'>
                    <h1 className='text-black text-xl'>Attribution</h1>
                   <div className='w-full  h-full flex flex-col'>
                    <select class="p-2 mt-8 rounded-xl border" name='etat' onChange={setDonner} value={data.etat}>
                      <option>Choisir etat du materiel ....</option>
                      <option value='Disponible'>Disponible</option>
                      <option value='Pour Salle'>Pour un salle Specifique</option>
                    </select>
                    {errors.etat && <p className='text-red-600 font-thin text-[10px]'>{errors.etat}</p>}
                    <input class="p-2 mt-8 rounded-xl border" type="text" name="salle" onChange={setDonner} value={data.salle} placeholder="salle" />
                    {errors.salle && <p className='text-red-600 font-thin text-[10px]'>{errors.salle}</p>}
                    <input class="p-2 mt-8 rounded-xl border" type="text" name="departement" onChange={setDonner} value={data.departement} placeholder="departement" />
                    {errors.departement && <p className='text-red-600 font-thin text-[10px]'>{errors.departement}</p>}
                    </div>
                </div>
              }
               <div className={`w-full flex items-center p-6 ${Step === 1 ? 'justify-between':'justify-between'} `}>
                 { Step === 1 ?  <button onClick={()=>annuler()} className=' px-6  bg-primary text-white
                    py-2 shadow-xl rounded-xl hover:scale-105 duration-300
                   font-medium flex flex-row items-center justify-center'>Annuler
                    </button>:
                    <button onClick={(e)=>prevStep(e)} className=' px-6  bg-primary text-white
                    py-2 shadow-xl rounded-xl hover:scale-105 duration-300
                   font-medium flex flex-row items-center justify-center'><img src='/icone/back.png' className='w-4'/>Retour
                    </button>
                 }  
                  { Step === 3 ? 
                   <button onClick={Update ? (e)=>UpdateMat(e) : (e)=>Ajouter(e)} className='px-6 bg-primary text-white
                    py-2 rounded-xl hover:scale-105 duration-300
                   font-medium flex flex-row items-center justify-center'>{Update ? "Modifier":"Valider"}<img src='/icone/valide.png' className='w-4 ml-2 '/>
                   </button>:
                    <button onClick={(e)=>nextStep(e)} className='px-6 bg-primary text-white
                    py-2 rounded-xl hover:scale-105 duration-300
                   font-medium flex flex-row items-center justify-center'>Suivant<img src='/icone/next.png' className='w-4 ml-2 '/>
                   </button>
                  }
                  </div> 
             </form>
             </div>
             
        </motion.div>
        </div>
      )
    }
   
    </>
  )
}

export default AjoutMateriel