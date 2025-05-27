import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./modal";

export default function Materiels(){
    const [isOpen, setIsOpen] = useState(false);
    const [Materiel,setMateriel] = useState([])
    const openModal = (mat) =>{
        setIsOpen(!isOpen);
        setMateriel(mat)
    }
    const [panne,setPanne] =  useState([])
    const [pret,setPret] = useState([])
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/materielle/signalement-panne/')
        .then((res)=>{
            setPanne(res.data)
            console.log(res.data)
        })
    },[])
    return(
        <div className="overflow-x-auto w-full">
            <div className="flex justify-between mb-5">
                <h1 className="text-md text-gray-500">Materiels en panne </h1>
            </div>
            <table className="w-full overflow-x-scroll">
                <thead className="border-b-1">
                    <tr className="">
                        <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize">Materiels</th>
                        <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize">Etat</th>
                        <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize">Description</th>
                        <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize">Date signalement</th>
                        <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        panne.lenght === 0 ? (<tr><td>Pas encore de donner</td></tr>):
                       ( panne.map((pan)=>(
                            <tr key={pan.id} >
                                <td className="p-3 text-left text-lg leading-6 ">{pan.materiel.nom}</td>
                                <td className="p-3 text-left text-lg leading-6 ">{pan.etat}</td>
                                <td className="p-3 text-left text-lg leading-6 ">{pan.description}</td>
                                <td className="p-3 text-left text-lg leading-6 ">{pan.date_signalement}</td>
                                <td className="p-3 text-left text-lg leading-6 ">
                                    { 
                                    pan.etat === 'Non traité' ?
                                    <button  onClick={()=>openModal(pan)} className="bg-primary flex items-center justify-center gap-2 rounded-lg px-4 py-1
                                         text-sm font-bold text-white cursor-pointer ">Reparer
                                     <img src="/icone/faireRepare.png" className="w-6" />    
                                    </button>:''
                                    }
                                </td>
                            </tr>
                        )))
                    }
                </tbody>
                </table>
                {
                    isOpen ? <Modal close={openModal} mat={Materiel} /> : null
                }
        </div>
    );
}