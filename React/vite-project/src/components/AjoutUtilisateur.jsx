import React,{useEffect, useState} from 'react'
import axios from 'axios';
import {motion, AnimatePresence} from 'framer-motion'
import { toast } from 'react-toastify';

const AjoutUtilisateur = ({show,setShow,refresh,DataUpdate}) => {

  const [data,setData] = useState({
    username:'',
    role:'',
    email:'',
    departement:'',
    password:''
  })
  const SetData = (e)=>{
    setData({
      ...data,
      [e.target.name]:e.target.value
    })
  }
  //Ajouter
  const AjoutUtilisateur = (e)=>{
    e.preventDefault()
    axios.post('http://127.0.0.1:8000/materielle/utilisateur/',data)
    .then((res)=>{
      toast.success('Nouveau utilisateur Ajouter')
      setData({
        username:'',
        role:'',
        email:'',
        departement:''
      })
      refresh(true)
      setShow(false)
    })
    .catch((err)=>{
      toast.error('Une Erreur s\'est produit')
      console.log(err)
    })
  }
  //Update
  useEffect(()=>{
    if(DataUpdate.lenght !== 0){
      setData({
        username:DataUpdate.username,
        role:DataUpdate.role,
        email:DataUpdate.email,
        departement:DataUpdate.departement,
      })
      setID(DataUpdate.id)
      setupd(true)
    }
  },[DataUpdate])
  const [id,setID]= useState('')
  const [upd,setupd] = useState(false)
  const UpdateUtilisateur = (e) =>{
    e.preventDefault()
    axios.put(`http://127.0.0.1:8000/materielle/utilisateur/${id}/`,data)
    .then((res)=>{
      toast.success('Utilisateur mise a jours')
      setData({
        username:'',
        role:'',
        email:'',
        departement:''
      })
      refresh(true)
      setShow(false)
    })
    .catch((err)=>{
      toast.error('Une Erreur s\'est produit')
      console.log(err)
    })
  }
    //Annuler
    const Annuler =()=>{
      setData({
        username:'',
        role:'',
        email:'',
        departement:''
      })
      setShow(false)
    }
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
                    <h1 onClick={()=>Annuler()} className='absolute text-white font-bold text-2xl top-2 right-4 hover:scale-110 cursor-pointer'>X</h1>
                    <div className='   flex items-center justify-center shadow w-[100%] h-[30%]' style={{background:`url('/icone/bg.jpeg ')`}} >
                      <h1 className='text-center text-3xl text-white'>
                        Ajout de nouveau utilisateur
                      </h1>
                    </div>
                    <div className=' w-[50%] h-[100%]'> 
                      <form className='flex flex-col justify-evenly p-4 h-[100%]'>
                      <div className='flex flex-col'>
                      <select name='role' value={data.role} onChange={SetData}>
                        <option>Choisir role ...</option>
                        <option value='Administrateur'>Administrateur</option>
                        <option value='Technicien'>Technicien</option>
                        <option value='Etudiant'>Etudiant</option>
                      </select>
                      <input class="p-2 mt-8 rounded-xl border" type="text" name="username" value={data.username} onChange={SetData}  placeholder="Nom" />
                      <input class="p-2 mt-8 rounded-xl border" type="email" name="email" value={data.email} onChange={SetData}  placeholder="Email" />
                      <input class="p-2 mt-8 rounded-xl border" type="text" name="departement" value={data.departement} onChange={SetData}  placeholder="Departement" />
                      </div>
                      <div className='w-[100%] flex items-center justify-end gap-6'>
                      <button onClick={()=>Annuler()}  className='px-6 border border-primary text-primary
                      py-2 rounded-xl hover:scale-105 duration-300
                      font-medium flex flex-row items-center justify-center'>Annuler
                      </button>
                      <button onClick={upd ? (e)=>UpdateUtilisateur(e):(e)=>AjoutUtilisateur(e)}  className='px-6 bg-primary text-white
                      py-2 rounded-xl hover:scale-105 duration-300
                      font-medium flex flex-row items-center justify-center'>{upd ? "Modifier":"Ajouter"}<img src='/icone/valide.png' className='w-6 ml-2 '/>
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

export default AjoutUtilisateur