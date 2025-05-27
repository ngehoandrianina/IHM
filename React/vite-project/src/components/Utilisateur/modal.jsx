import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import { toast } from "react-toastify"
import authService from "../../Service/authService";
export default function Modal({close,mat}) {
    const [materiels, setMateriels] = useState('')
    const [MatId,setMatID] = useState('')
    const [Description,setDescription] = useState('')
    const [idPanne,setIdPanne] = useState('')
    const User = authService.getCurrentUser()
    useEffect(()=>{
        if(mat.lenght !== 0){
            setMateriels(mat.materiel.nom)
            setIdPanne(mat.id)
            setMatID(mat.materiel.id)
        }
    },[mat])
    const FairMaintenance = (e) =>{
        e.preventDefault()
        if(validation()){
        axios.all([
            axios.post('http://127.0.0.1:8000/materielle/maintenance/',{
                signalement_id:idPanne,
                description:Description,
                technicien_id:User.id
            }),
            axios.patch(`http://127.0.0.1:8000/materielle/materiels/${MatId}/`,{etat:"En Maintenance"})
        ])
      
        .then((res1,res2)=>{
            toast.success('Maitenance en Cours')
            console.log(res1)
        })
        .catch((err)=>{
            toast.error('Il y a une erreur d\'execution')
            console.log(err)
        })}
    }
     //GEstion d'erreur
     const [errors, setErrors] = useState({});
     const validation = ()=>{
       let newErrors = {};
       if(Description.trim() === ""){
         newErrors.description = "Description de panne est requis";
       }

       setErrors(newErrors);
       return Object.keys(newErrors).length === 0; 
     }
    return(
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] z-10 shadow-sm">
            <motion.div 
             initial={{x:-300,opacity:0}}
             animate={{x:0,opacity:1}}
            transition={{ duration: 0.4 }} 
            className="bg-white absolute left-1/2  w-1/2 h-1/2 py-5 px-4 transform -translate-x-1/2 translate-y-1/2 rounded-lg">
                <button
                    className="font-bold text-2xl text-gray-500 absolute right-4 top-0 cursor-pointer" 
                    onClick={close}>
                    x
                </button>
                <h1 className="text-center text-primary font-bold">Note de reparation</h1>
                <form className="flex flex-col justify-between h-[90%]" action="">
                    <div>
                    <div className="mb-2 flex flex-col">
                        <label htmlFor="nomMateriels" className="text-gray-500 font-bold">Materiels</label>
                        <input 
                            type="text"
                            value={materiels}
                            name="nom"
                            id="nomMateriels"
                            readOnly
                            className="w-full px-1 py-1 text-gray-500
                            border border-gray-200 rounded-sm focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="description" className="text-gray-500 font-bold">Description</label>
                        <textarea
                        value={Description}
                        onChange={(e)=>setDescription(e.target.value)}
                            name="description"
                            id="description"
                            onClick={()=>setErrors({})}
                            className={`text-gray-600 border ${errors.description ? 'border-red-600' : 'border-gray-200'}  p-1 h-30
                            rounded-sm focus:outline-primary`}
                        ></textarea>
                        {errors.description && <p className='text-red-600 font-thin text-[10px]'>{errors.description}</p>}
                    </div>
                    </div>
                    <div className="flex justify-end gap-6 mt-10">
                        <button onClick={()=>close()} className="bg-gray-200 px-4 py-2 rounded-lg cursor-pointer">
                            Annuler
                        </button>
                        <button onClick={(e)=>FairMaintenance(e)} className="bg-primary px-4 py-2 rounded-lg text-white cursor-pointer">
                            Valider
                        </button>
                    </div>
                    
                </form>

            </motion.div>
        </div>
    )
};


