import React,{useEffect, useState} from 'react'
import axios from 'axios';
import {motion, AnimatePresence} from 'framer-motion'
import { toast } from 'react-toastify';
import { validateForm } from '../Hooks/FormValidation';

const AjoutUtilisateur = ({show,setShow,refresh,DataUpdate,upd,setupd}) => {
  //gestion d'erreur
  const [errors, setErrors] = useState({});
  const rules = {
    username: { required: true },
    role:{required:true},
    departement:{required:true},
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Adresse email invalide",
    },
  };
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
    setErrors({ ...errors, [e.target.name]: "" });
  }
  //Ajouter
  const AjoutUtilisateur = (e)=>{
    e.preventDefault()
    const validationErrors = validateForm(data, rules);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
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
    })}
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
    }
  },[DataUpdate])
  const [id,setID]= useState('')
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
      setupd(false)
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
      setErrors({})
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
                    
                    <div className='relative flex items-center justify-center shadow w-[100%] h-[30%] ' style={{background:`url('/icone/bg.jpeg ')`}} >
                    <div className='absolute inset-0 backdrop-blur-xs '></div>
                      <h1 onClick={()=>Annuler()} className='absolute text-white font-bold text-2xl top-2 right-4 hover:scale-110 cursor-pointer'>X</h1>
                      <h1 className='text-center text-xl lg:text-3xl text-white z-50'>
                        Ajout de nouveau utilisateur
                      </h1>
                    </div>
                    <div className=' lg:w-[50%] h-[100%]  w-full '> 
                      <form className='flex flex-col justify-evenly p-4 h-[100%]'>
                      <div className='flex flex-col'>
                      <input list='roole' class="p-2 lg:mt-8 rounded-xl border" type="text" name='role' value={data.role} onChange={SetData}   placeholder="Enter Role" />
                      {errors.role && <p className='text-red-600 font-thin text-[10px]'>{errors.role}</p>}
                      <datalist id='roole'>
                        <option value='Administrateur'>Administrateur</option>
                        <option value='Technicien'>Technicien</option>
                        <option value='Etudiant'>Etudiant</option>
                      </datalist>
                      <input class="p-2 mt-8 rounded-xl border" type="text" name="username" value={data.username} onChange={SetData}  placeholder="Nom" />
                      {errors.username && <p className='text-red-600 font-thin text-[10px]'>{errors.username}</p>}
                      <input class="p-2 mt-8 rounded-xl border" type="email" name="email" value={data.email} onChange={SetData}  placeholder="Email" />
                      {errors.email && <p className='text-red-600 font-thin text-[10px]'>{errors.email}</p>}
                      <input class="p-2 mt-8 rounded-xl border" type="text" name="departement" value={data.departement} onChange={SetData}  placeholder="Departement" />
                      {errors.departement && <p className='text-red-600 font-thin text-[10px]'>{errors.departement}</p>}
                      </div>
                      <div className='w-[100%] flex items-center justify-end gap-6'>
                      <button onClick={()=>Annuler()}  className='px-6 border border-primary text-primary
                      py-2 rounded-xl hover:scale-105 duration-300
                      font-medium flex flex-row items-center justify-center'>Annuler
                      </button>
                      <button onClick={upd ? (e)=>UpdateUtilisateur(e):(e)=>AjoutUtilisateur(e)}  className='px-6 bg-primary text-white
                      py-2 rounded-xl hover:scale-105 duration-300
                      font-medium flex flex-row items-center justify-center'>{upd ? "Modifier":"Ajouter"}<img src='/icone/valide.png' className='w-4 ml-2 '/>
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