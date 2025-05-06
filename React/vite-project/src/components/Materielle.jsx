import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AjoutMateriel from './AjoutMateriel'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const Materielle = () => {
    const [showAdd,setShowAdd] = useState(false)
    const [materiel,setMateriel] = useState([])
    const [refesh,setRefresh] = useState(false)
    //pagination
    const [page,setPage] = useState(0)
    const itemPerPage = 6;
    const TotalPage = Math.ceil(materiel.length / itemPerPage)
    const startIndex = page * itemPerPage;
    const visibleItems = materiel.slice(startIndex,startIndex + itemPerPage)

    const nextPage=()=>{
        if((page + 1 ) * itemPerPage < materiel.length){
            setPage(page + 1)
        }
    }
    const prevPage=()=>{
        if(page>0){
            setPage(page - 1)
        }
    }
    //pagination
    useEffect(()=>{
    axios.get('http://127.0.0.1:8000/materielle/materiels')
    .then((res)=>{
        if(res.data){
            setMateriel(res.data)
        }
        else{
            setMateriel([])
        }
        console.log(res.data)
    })
    .catch((err)=>{
        console.log(err)
        setMateriel([])
    })
    },[refesh])
    const DeleteMateriel = (id) =>{
        MySwal.fire({
            title: 'Êtes-vous sûr ?',
            text: "Cette action est irréversible.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler',
        }).then((res)=>{
            axios.delete(`http://127.0.0.1:8000/materielle/materiels/${id}/`)
            .then((res)=>{
                if(res.isConfirmed){
                    MySwal.fire('Supprimer avec succes','element suprimer','success')
                }
                setRefresh((prev)=>!prev)
            })
            .catch((err)=>{
                console.log(err)
            })
        });
    }
    const [DataUpdate,SetDataUpdate]=useState({})
    const [Update,SetUpdate]=useState(false)
const editMateriel =(data)=>{
    SetDataUpdate(data)
    setShowAdd(true)
    SetUpdate(true)
}
  return (
   <>
    <div class="flex flex-col overflow-hidden relative">
      <div class="overflow-x-auto">
        <div class="min-w-full inline-block align-middle shadow-2xl">
            <div class="relative mt-2 flex items-center justify-between text-gray-500 focus-within:text-gray-900 mb-2 bg-white p-2 rounded-2xl shadow-sm">
                <input type="text" id="default-search" class="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none" placeholder="Search for user" />
                <button onClick={()=>setShowAdd(true)} className='border px-6 py-2 rounded-4xl bg-secondary text-white'>+ Add</button>
            </div>
            <div className='flex flex-row items-center justify-between mb-2 bg-white p-2 rounded-2xl shadow-sm'>
            <ul className='flex gap-2 '>
                <li className='bg-secondary px-6 py-1 rounded-2xl'>All</li>
                <li className=' px-6 py-1 rounded-2xl'>Etat</li>
                <li className=' px-6 py-1 rounded-2xl'>Salle</li>
                <li className=' px-6 py-1 rounded-2xl'>Departemet</li>
            </ul>
            
            </div>
            <div class="overflow-hidden dark:bg-black p-2 bg-white rounded-2xl shadow-sm ">
                <table class="min-w-full rounded-xl dark:bg-black">
                    <thead>
                        <tr class="bg-white border-b-4">
                            <th scope="col" class="p-3  text-left text-lg leading-6 font-semibold capitalize rounded-tl-xl"> ID </th>
                            <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize">Nom </th>
                            <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize"> Type </th>
                            <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize"> Marque</th>
                            <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize"> Model</th>
                            <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize"> Numero de Serie</th>
                            <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize"> Etat</th>
                            <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize"> Date Aquisition</th>
                            <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize"> Salle</th>
                            <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize"> Departemet</th>
                            <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize rounded-tr-xl"> Actions </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-300 ">
                        { materiel.length === 0 ? (<tr><td>Pas de donner</td></tr>):(
                            visibleItems.map((mat,idx)=>(
                                <tr key={idx}>
                                    <td className="p-3 text-left text-lg leading-6 ">{mat.id}</td>
                                    <td className="p-3 text-left text-lg leading-6 ">{mat.nom}</td>
                                    <td className="p-3 text-left text-lg leading-6 ">{mat.type}</td>
                                    <td className="p-3 text-left text-lg leading-6 ">{mat.marque}</td>
                                    <td className="p-3 text-left text-lg leading-6 ">{mat.modele}</td>
                                    <td className="p-3 text-left text-lg leading-6 ">{mat.numero_serie}</td>
                                    <td className="p-3 text-left text-lg leading-6 ">{mat.etat}</td>
                                    <td className="p-3 text-left text-lg leading-6 ">{mat.date_acquisition}</td>
                                    <td className="p-3 text-left text-lg leading-6 ">{mat.salle ? mat.salle:'Null'}</td>
                                    <td className="p-3 text-left text-lg leading-6 ">{mat.departement}</td>
                                    <td className="p-3 text-left text-lg leading-6 flex items-center justify-between px-4 ">
                                       <button onClick={()=>editMateriel(mat)} ><img src='/icone/edit.png' className='w-10 hover:border rounded-full p-2'/></button>
                                       <button onClick={()=>DeleteMateriel(mat.id)}><img src='/icone/delete.png' className='w-10 hover:border rounded-full p-2' /></button>
                                    </td>
                                </tr>
                            )))
                        }
                    </tbody>
                </table>
            </div>
        </div>
      </div>
      <div class="container mx-auto px-4 mt-2">
      <nav class="flex flex-row flex-nowrap justify-between md:justify-center items-center" aria-label="Pagination">
          <a onClick={()=>prevPage()} class="flex w-10 h-10 mr-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-800 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
              href="#" title="Previous Page">
              <span class="sr-only">Previous Page</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="block w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
          </a>
              {[...Array(TotalPage)].map((_,idx)=>(
                <a key={idx} onClick={()=>setPage(idx)} class={idx === page ? 'hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-black dark:border-white dark:bg-black dark:text-white pointer-events-none':'hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-700 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600'}
                href="#" title="Page 2">
                {idx + 1}
            </a>
              ))}
          
          <a onClick={()=>nextPage()}  class="flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-800 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
              href="#" title="Next Page">
              <span class="sr-only">Next Page</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="block w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
          </a>
      </nav>
        </div>
      
      </div>
     <AjoutMateriel DataUpdate={DataUpdate} Update={Update} SetUpdate={SetUpdate} show={showAdd} setShow={setShowAdd} refresh={setRefresh} />
   </>
  )
}

export default Materielle