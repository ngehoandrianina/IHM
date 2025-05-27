import React from "react";
import { useState,useEffect }from "react";
import Modal from "./modal";
import axios from "axios";
import authService from "../../Service/authService";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

export default function Maintenance(){

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () =>{
        setIsOpen(!isOpen);
    }
    const [maintenance,setMaintenance] =  useState([])
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/materielle/maintenance/')
        .then((res)=>{
            setMaintenance(res.data)
            console.log(res.data)
        })
    },[])
    const Reparer = (idPan,idMat) =>{
        MySwal.fire({
            title: 'Êtes-vous sûr ?',
            text: "Ah ouff , enfin reparer.",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#52ef3d',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, Reparer',
            cancelButtonText: 'Annuler',
        }).then((res)=>{
            if(res.isConfirmed){
            axios.all([
                axios.patch(`http://127.0.0.1:8000/materielle/signalement-panne/${idPan}/`,{etat:"Resolu"}),
                axios.patch(`http://127.0.0.1:8000/materielle/materiels/${idMat}/`,{etat:"Disponible"})
            ])
            .then((res1,res2)=>{
                MySwal.fire('Materiel Mise a jours','Panne resolue','success')
            })
            .catch((err)=>{
                console.log(err)
            })
            }
        });
    }
    const NonResolu = (idPan,idMat) =>{
        MySwal.fire({
            title: 'Êtes-vous sûr ?',
            text: "Ah ouff , enfin reparer.",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#52ef3d',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, Reparer',
            cancelButtonText: 'Annuler',
        }).then((res)=>{
            if(res.isConfirmed){
            axios.all([
                axios.patch(`http://127.0.0.1:8000/materielle/signalement-panne/${idPan}/`,{etat:"Non Resolu"}),
                axios.patch(`http://127.0.0.1:8000/materielle/materiels/${idMat}/`,{etat:"Hors service"})
            ])
            .then((res1,res2)=>{
                MySwal.fire('Materiel Mise a jours','Panne non resolue','error')
            })
            .catch((err)=>{
                console.log(err)
            })
            }
        });
    }
    const user = authService.getCurrentUser()
    return(
        <div className="overflow-x-auto w-full">
            <div className="flex justify-between mb-5">
                <h1 className="text-lg font-500 text-gray-500">Reparer materiels</h1>
            </div>
            <table className="w-full overflow-x-scroll">
                <thead className="border-b-4 mb-10 ">
                    <tr className="pb-4">
                        <th className="text-left">Technicien</th>
                        <th className="text-left">Materiel</th>
                        <th className="text-left">Description</th>
                        <th className="text-left">Date signalement</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        maintenance.lenght === 0 ? (<tr><td>Pas encore de donner</td></tr>):
                       ( maintenance.map((pan)=>(
                            <tr key={pan.id} className="border-b">
                                <td className="p-3 text-left text-lg leading-6 ">{pan.technicien.username}</td>
                                <td className="p-3 text-left text-lg leading-6 ">{pan.signalement.materiel.nom}</td>
                                <td className="p-3 text-left text-lg leading-6 ">{pan.description}</td>
                                <td className="p-3 text-left text-lg leading-6 ">{pan.date_intervention}</td>
                                <td className="p-3 text-left text-lg leading-6 flex items-center justify-center ">
                                    {
                                        user.username === pan.technicien.username ? (
                                            <>
                                            <button onClick={() => NonResolu(pan.signalement.id,pan.signalement.materiel.id)} className=" rounded-lg 
                                        text-sm font-bold text-white cursor-pointer ">
                                        <img src='/icone/horsService.png' className='w-10 hover:border rounded-full p-2' />
                                    </button>
                                    <button onClick={()=>Reparer(pan.signalement.id,pan.signalement.materiel.id)} className=" rounded-lg 
                                        text-sm font-bold text-white cursor-pointer ">
                                        <img src='/icone/done.png' className='w-10 hover:border rounded-full p-2' />
                                    </button>
                                            </>
                                        ):'...'
                                    }
                                    
                                </td>
                            </tr>
                        )))
                    }
                </tbody>
                </table>
                {
                    isOpen ? <Modal close={openModal}  /> : null
                }
        </div>

    );
}