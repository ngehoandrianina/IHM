import React, { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
const DetailPret = ({show,setShow,isOpen, onClose, user,refesh}) => {
    const [id,setid] = useState('')
    const Terminer =(e)=>{
        e.preventDefault()
        MySwal.fire({
            title: 'Tout les Materiel sont rendu ?',
            text: "Veuillez bien verifier les materielles.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#44ef11',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, Rendu',
            cancelButtonText: 'Non,Annuler',
        }).then((res)=>{
            if(res.isConfirmed){
              /*
            */
            user.etat === 'En cours' ? axios.post(`http://127.0.0.1:8000/materielle/demandes-pret/terminer-tous/${user.id}/`)
            .then((res)=>{
                MySwal.fire('Mise a jour avec succes','Materiel rendu','success')
                refesh((prev)=>!prev)
               
            })
            .catch((err)=>{
                console.log(err)
                MySwal.fire('Erreur de mise a jours','Veuillez reessayer','error')
            })
            :axios.post(`http://127.0.0.1:8000/materielle/demandes-pret/terminer-tous-retard/${user.id}/`)
            .then((res)=>{
              MySwal.fire('Mise a jour avec succes','Materiel rendu','success')
              refesh((prev)=>!prev)
               
            })
            .catch((err)=>{
                console.log(err)
                MySwal.fire('Erreur de mise a jours','Veuillez reessayer','error')
            })
            }
        });
        //axios.post(`http://127.0.0.1:8000/materielle/demandes-pret/terminer-tous/${user.id}/`)
      
    }
if (!isOpen || !user) return null;
  return (
    <>
    {/*
    show && */
    <div className='absolute top-0 left-0 z-30 bg-[#14080871] w-full h-full flex items-center justify-center  p-4'>
         <motion.div
        initial={{x:-300,opacity:0}}
        animate={{x:0,opacity:1}}
         transition={{ duration: 0.4 }}  
         className='bg-white  relative overflow-hidden  rounded-2xl w-[60%] h-[80%] flex flex-col items-center'>
        
        <div className=' relative flex items-center justify-center shadow w-[100%] h-[30%]' style={{background:`url('/icone/bg.jpeg ')`}} >
        <div className='absolute inset-0 backdrop-blur-xs '></div>
        <div className=' h-full w-full flex items-center mt-4 justify-center  '>
        <h1 onClick={()=>onClose()} className='absolute text-white font-bold text-2xl top-2 right-4 hover:scale-110 cursor-pointer'>X</h1>
        <h1 className='text-center text-xl text-white z-50'>Details des materielle Emprunter par {user.username}</h1>
        </div>
     </div>
     <div className='w-[80%] h-[100%] flex flex-col items-center justify-between'>
      <div className=' w-[100%] py-4 '>
        
        <ul className='flex flex-col p-2  gap-4'>
            {user.demandes.map((d, i) => (
            <li key={i}>
              <strong>-{d.materiel.nom}</strong> ({d.materiel.marque}, {d.materiel.type}) 
              N° Série: {d.materiel.numero_serie}<br />
            </li>
          ))}
        </ul>
      </div>
      <div className='w-[100%] flex items-center justify-end gap-6 py-6'>
        <button onClick={()=>onClose()}  className='px-6 border border-primary text-primary
        py-2 rounded-xl hover:scale-105 duration-300
        font-medium flex flex-row items-center justify-center'>Retour
        </button>
        <button  onClick={(e)=>Terminer(e)} className='px-6 bg-primary text-white
        py-2 rounded-xl hover:scale-105 duration-300
        font-medium flex flex-row items-center justify-center'>Rendu ?
        </button>
        </div>
     </div>
        </motion.div>
    </div>
    }
    </>
  )
}

export default DetailPret