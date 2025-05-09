import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import FairePre from './FairePre'
import { toast } from 'react-toastify'
import DetailPret from './DetailPret'

const DemandePret = () => {
    const [date,setDate] = useState(new Date())
    const [demadePret,setDemandePret] = useState([])
    const [Utilisateur,setUtilisateur] = useState({})
    const [refesh,setRefresh] = useState(false)
    
    useEffect(()=>{
        //Get Demande De PRet
        axios.get('http://127.0.0.1:8000/materielle/demandes-pret')
        .then((res)=>{
            if(res.data){
                setDemandePret(res.data)
            }
            else{
                setDemandePret([])
            }
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
            setDemandePret([])
        })
    },[refesh])
    //Regroupement
    const grouped = demadePret.reduce((acc,item)=>{
    const username = item.demandeur.username;
   
    if (!acc[username]) {
      acc[username] = {
        demandeur: {
            username:item.demandeur.username,
            id:item.demandeur.id
        },
        demandes: []
      };
    }
    acc[username].demandes.push({
      date_debut: item.date_debut,
      date_fin: item.date_fin,
      etat: item.etat,
      materiel: item.materiel,
    });
    return acc;
    },{})
    const [DetailMat,setDetailMat] = useState({})
    const togledetail =(id)=>{
        console.log(id)
        setDetailMat(id)
        setShow(true)
    }
    //Changer Etat emprunt
    const ChangeEtat = (id) =>{
        axios.patch(`http://127.0.0.1:8000/materielle/demandes-pret/${id}/`,{etat:'Retourner'})
        .then((res)=>{
            toast.success('Emprut Retourner')
            setRefresh(true)
        })
        .catch((err)=>{
            toast.error('Erreur de Reque'+ err)
        })
    }
     //pagination
     const [page,setPage] = useState(0)
     const itemPerPage = 6;
     const TotalPage = Math.ceil(demadePret.length / itemPerPage)
     const startIndex = page * itemPerPage;
     const visibleItems = demadePret.slice(startIndex,startIndex + itemPerPage)
 
     const nextPage=()=>{
         if((page + 1 ) * itemPerPage < demadePret.length){
             setPage(page + 1)
         }
     }
     const prevPage=()=>{
         if(page>0){
             setPage(page - 1)
         }
     }
     //Modal
     const [show,setShow] = useState(false)
     const [selectedUser, setSelectedUser] = useState(null);
     const openModal = (user) => setSelectedUser(user);
     const closeModal = () => setSelectedUser(null);

  return (
    <>
    <DetailPret setShow={setShow} show={show} materiel={DetailMat} isOpen={!!selectedUser} onClose={closeModal} user={selectedUser}/>
       <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle shadow-2xl">
            <h1 className='text-2xl mb-4'>Liste des Pret</h1>
            <div className=" flex items-center justify-between text-gray-500 focus-within:text-gray-900 mb-2 bg-white p-2 rounded-2xl shadow-sm">
                <input type="text" id="default-search" class="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none" placeholder="Search for user" />
                
            </div>
            <div className='flex flex-row items-center justify-between mb-2 bg-white p-2 rounded-2xl shadow-sm'>
            <ul className='flex gap-2 '>
                <li className='bg-secondary px-6 py-1 rounded-2xl'>All</li>
                <li className=' px-6 py-1 rounded-2xl'>En Cours</li>
                <li className=' px-6 py-1 rounded-2xl'>Retourner</li>
                <li className=' px-6 py-1 rounded-2xl'>En Retard</li>
            </ul>
            
            </div>
            <div class="overflow-hidden dark:bg-black p-2 bg-white rounded-2xl shadow-sm ">
                <table class="min-w-full rounded-xl dark:bg-black">
                    <thead>
                        <tr class="bg-white border-b-4">
                            <th scope="col" className="p-3  text-left text-lg leading-6 font-semibold capitalize rounded-tl-xl">Demandeur</th>
                            <th scope="col" className="p-3 text-left text-lg leading-6 font-semibold  capitalize"> etat</th>
                            <th scope="col" className="p-3 text-left text-lg leading-6 font-semibold  capitalize"> Email </th>
                            <th scope="col" className="p-3 text-left text-lg leading-6 font-semibold  capitalize"> date debut </th>
                            <th scope="col" className="p-3 text-left text-lg leading-6 font-semibold  capitalize"> date fin</th>
                            <th scope="col" className="p-3 text-left text-lg leading-6 font-semibold  capitalize rounded-tr-xl"> Actions </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300 ">
                        {/*
                            demadePret.length === 0 ? (<tr><td>Il n'y a pas encore de donner</td></tr>):(
                                demadePret.map((dem,idx)=>(
                                    <tr key={idx}>
                                        <td className="p-3 text-left text-lg leading-6 ">{dem.id}</td>
                                        <td className="p-3 text-left text-lg leading-6 ">{dem.demandeur.username}</td>
                                        <td className="p-3 text-left text-lg leading-6 ">{dem.etat}</td>
                                        <td className="p-3 text-left text-lg leading-6 ">{dem.materiel.type}</td>
                                        <td className="p-3 text-left text-lg leading-6 ">{dem.materiel.numero_serie}</td>
                                        <td className="p-3 text-left text-lg leading-6 ">{dem.date_debut}</td>
                                        <td className="p-3 text-left text-lg leading-6 ">{dem.date_fin}</td>
                                        <td className="p-3 text-left text-lg leading-6 flex items-center justify-center ">
                                            <button onClick={()=>ChangeEtat(dem.id)}><img src='/icone/done.png' className='w-10 hover:scale-110 cursor-pointer  p-2'/></button>
                                        </td>
                                    </tr>
                                ))
                            )*/
                        }
            {Object.keys(grouped).map((username) => {
            const { demandeur, demandes } = grouped[username];
            const sorted = [...demandes].sort((a, b) => new Date(a.date_debut) - new Date(b.date_debut));
            const first = sorted[0];
            const last = sorted[sorted.length - 1];

            return (
              <tr key={username}>
                <td className="p-3 text-left text-lg leading-6 ">{username}</td>
                <td className="p-3 text-left text-lg leading-6 ">{last.etat}</td>
                <td className="p-3 text-left text-lg leading-6 ">{demandeur.email}</td>
                <td className="p-3 text-left text-lg leading-6 ">{new Date(first.date_debut).toLocaleString()}</td>
                <td className="p-3 text-left text-lg leading-6 ">{new Date(last.date_fin).toLocaleString()}</td>
                <td className="p-3 text-left text-lg leading-6 ">
                    <button onClick={() => openModal({ username, demandes,id:demandeur.id })}><img src='/icone/details.png' className='w-10 hover:border rounded-full p-2'/></button>
                </td>
              </tr>
            );
          })}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-2">
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
    </>

  )
}

export default DemandePret