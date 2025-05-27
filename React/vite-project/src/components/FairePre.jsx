import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DatePicker } from 'antd';
const FairePre = ({show,setShow,matSelected,annul}) => {
  const [nom,setNom] = useState('')
  const [Mat,setMat]=useState({})
  const [IdMat,setIdMat]=useState([])
  const [Utilisateur,setUtilisateur]= useState({})
  const [dateFin,setDateFin] = useState('')
  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/materielle/utilisateur')
    .then((res)=>{
        if(res.data){
          setUtilisateur(res.data)
        }
        else{
          setUtilisateur([])
        }
        console.log(res.data)
    })
    .catch((err)=>{
        console.log(err)
        setUtilisateur([])
    })
    setMat(matSelected)
  
  },[show])
  //Decocher
  const Decocher =(id)=>{
    setMat(prev=> prev.filter(item => item.id !== id))
  }
  //Suggestion d'utilisateur
  const [Suggestion,setSuggestion] = useState([])
  const [nomUtilisateur,setNomUtilisateur] = useState('')
  const [SelectedID,setSelectedId] = useState('')
  //AJouter Pret

  const AjoutPret = (e)=>{
  e.preventDefault()
  Mat.forEach(mat =>{
  try{
   axios.post('http://127.0.0.1:8000/materielle/demandes-pret/',{
      demandeur_id:SelectedID,
      materiel_id:mat.id,
      date_fin:dateFin
    })
    .then((res)=>{
      toast.success('Emprut Ajouter Avec success')
    })
    .catch((err)=>{
      toast.error('Error')
      console.log(err)
    })
    
  }
  catch(err){
    console.log(err)
  }
    })
  }
  const Annuler = () =>{
    setShow(false)
    setDateFin('')
    setSelectedId('')
    setIdMat('')
    annul([])
  }
  return (
    <>
    {
    show && 
    <div className='absolute z-30 top-0 left-0 bg-[#14080871] w-full h-full flex items-center justify-center  p-4'>
         <motion.div
        initial={{x:-300,opacity:0}}
        animate={{x:0,opacity:1}}
         transition={{ duration: 0.4 }}  
         className='bg-white relative overflow-hidden  rounded-2xl w-[90%] h-[80%] lg:w-[60%] lg:h-[80%] flex flex-col items-center'>
        
        <div className=' relative  flex items-center justify-center shadow w-[100%] h-[30%]' style={{background:`url('/icone/bg.jpeg ')`}} >
        <div className='absolute inset-0 backdrop-blur-xs '></div>
        <button onClick={Annuler} className='absolute z-[60] text-white font-bold text-2xl top-2 right-4 hover:scale-110 cursor-pointer'>X</button> 
        <div className=' h-full w-full flex items-center justify-center  z-50'>
            <h1 className='text-white text-4xl'>Faire un pret</h1>
        </div>
     </div>
     <div className='w-[80%] h-[100%] flex flex-col lg:flex-row '>
      <div className='lg:w-[50%] py-4'>
        <h1 className='text-center lg:text-xl'>Liste des materielle emprunter</h1>
        <ul>
            
            {
              Mat.map((mat)=>(
                <li key={mat.id} className='mt-2 px-4 py-2  flex flex-row justify-between'>{mat.nom}
                <button onClick={()=>Decocher(mat.id)} className='px-4 bg-secondary rounded-xl text-white font-bold'>X</button></li>
              ))
            }
        </ul>
      </div>
     <form className='flex flex-col  justify-between px-4 pt-4 h-[100%] lg:w-[50%] pb-8'>
        <div className='flex flex-col '>
        <h1 className='lg:text-xl'>Information de l'utilisateur</h1>
        <input class="p-2 mt-4 rounded-xl border" type="text" name="type"  placeholder="Nom demandeur"
        value={nomUtilisateur}
        onChange={(e)=>{
          const value = e.target.value
          setNomUtilisateur(value)
          const Filtrage = Utilisateur.filter(user=>user.username.toLowerCase().includes(value.toLowerCase()))
          setSuggestion(Filtrage)
          if(e.target.value === ''){
            setSuggestion([])
          }
        }}
        />
        {
          Suggestion.length === 0 ? '' :
          <ul className=' bg-[#1c1a1aaa] flex flex-col gap-2 p-2 -mt-1 rounded-2xl absolute lg:right-28 lg:top-52'>
          {
             Suggestion.map((User)=>(
              <li key={User.id} 
              className='cursor-pointer hover:bg-secondary rounded-2xl px-2  pb-1 text-white'
              onClick={()=>{
                setSelectedId(User.id)
                setSuggestion([])
                setNomUtilisateur(User.username)
              }}>{User.username}</li>
            ))
          }
        </ul>
        }
        
        <input value={dateFin} onChange={(e)=>setDateFin(e.target.value)}  class="p-2 mt-8 rounded-xl border" type="datetime-local" placeholder="Nom demandeur"/>
        </div>
        <div className='w-[100%] flex items-center justify-end gap-4'>
        <button onClick={()=>Annuler()}  className='px-6 border border-primary text-primary
        py-2 rounded-xl hover:scale-105 duration-300
        font-medium flex flex-row items-center justify-center'>Annuler
        </button>
        <button  onClick={(e)=>AjoutPret(e)} className='px-6 bg-primary text-white
        py-2 rounded-xl hover:scale-105 duration-300
        font-medium flex flex-row items-center justify-center'>Valider<img src='/icone/valide.png' className='w-4 ml-2 '/>
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