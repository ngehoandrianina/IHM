import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FairePre from './FairePre'
import { toast } from 'react-toastify'
import DetailPret from './DetailPret'
import { DatePicker } from 'antd'

const DemandePret = () => {
    const [date,setDate] = useState(new Date())
    const [demadePret,setDemandePret] = useState([])
    const [Utilisateur,setUtilisateur] = useState({})
    const [refesh,setRefresh] = useState(false)
    const [groupement,setGroupment] = useState([])
    useEffect(()=>{
        //Get Demande De PRet
        axios.get('http://127.0.0.1:8000/materielle/demandes-pret')
        .then((res)=>{
            if(res.data){
                setDemandePret(res.data)
                const data = res.data
                const Type = [...new Set(data.map(item => item.etat))]
                setGroupment(Type)
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

        //Mettre a jour auto pret si retard
        axios.post('http://localhost:8000/materielle/api/maj-demandes-etat/')
        .then(() => {
        console.log("Demandes mises à jour !");
        // Tu peux relancer un fetch de la liste
        })
        .catch((err)=>{
            console.log('error Ajour')
            console.log(err)
        })
        ;
       
    },[refesh])
   
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
          //Regroupement
          const grouped = demadePret.reduce((acc,item)=>{
            const username = item.demandeur.username;
           
            if (!acc[username]) {
              acc[username] = {
                demandeur: {
                    username:item.demandeur.username,
                    id:item.demandeur.id,
                    email:item.demandeur.email
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
        //io io io
        const groupedArray = Object.keys(grouped).map(username => {
            const { demandeur, demandes } = grouped[username];
            const sorted = [...demandes].sort((a, b) => new Date(a.date_debut) - new Date(b.date_debut));
            const first = sorted[0];
            const last = sorted[sorted.length - 1];
            return {
              username,
              email: demandeur.email,
              id: demandeur.id,
              demandes: sorted,
              debut: first.date_debut,
              fin: last.date_fin,
              etat: last.etat
            };
          });
     //pagination
     //Recherceh 2 date
     const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
     const [search, setSearch] = useState('');
     const [filter,setFilter] = useState('All')
     const filteredByType = filter === 'All' ? groupedArray : groupedArray.filter(d => d.etat === filter);
     const filtered = filteredByType.filter(s =>{
        const matchSearch =
       s.username.toLowerCase().includes(search.toLowerCase()) ||
       s.email.toLowerCase().includes(search.toLowerCase()) ;

       const dateOnly = s.debut.slice(0, 10); // extrait 'YYYY-MM-DD'
      
       const matchDate =
         (!startDate || dateOnly >= startDate) &&
         (!endDate || dateOnly <= endDate);
     
       return matchSearch && matchDate;
     });
     const [page,setPage] = useState(0)
     const itemPerPage = 6;
     const TotalPage = Math.ceil(filtered.length / itemPerPage)
     const startIndex = page * itemPerPage;
     const visibleItems = filtered.slice(startIndex,startIndex + itemPerPage)


 
     const nextPage=()=>{
         if((page + 1 ) * itemPerPage < filtered.length){
             setPage(page + 1)
         }
     }
     const prevPage=()=>{
         if(page>0){
             setPage(page - 1)
         }
         console.log(groupedArray)
     }
     //Modal
     const [show,setShow] = useState(false)
     const [selectedUser, setSelectedUser] = useState(null);
     const openModal = (user) => setSelectedUser(user);
     const closeModal = () => setSelectedUser(null);
  return (
    <>
    <DetailPret setShow={setShow} refesh={setRefresh} show={show} materiel={DetailMat} isOpen={!!selectedUser} onClose={closeModal} user={selectedUser}/>
       <div className="flex flex-col h-[100%] justify-between pb-4 mt-2">
      <div className="overflow-x-auto">
        <div className="min-w-full">
            <div className=" flex items-center justify-between text-gray-500 focus-within:text-gray-900 mb-2 bg-white p-2 rounded-2xl shadow-sm">
                <input
                value={search}
                onChange={(e) => {
               setSearch(e.target.value);
               setPage(0); // pour revenir à la 1ère page en cas de changement
               }}
                 type="text" id="default-search" class="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none" placeholder="Chercher ..." />
            </div>
            <div className='flex flex-col gap-2 lg:flex-row items-start justify-between mb-2 bg-white p-2 rounded-2xl shadow-sm'>
            <div className='flex flex-row items-center'>
            <p className='font-thin ml-1'>filtrer par etat :</p>
            <ul className='flex gap-2 px-4 items-center cursor-pointer'>
                <li onClick={()=>setFilter('All')}  className={filter === 'All'?'bg-secondary px-4 py-1 rounded-2xl text-white shadow':'px-4 py-1'}>Tous</li>
                {   groupement &&
                   groupement.map((Util)=>(
                        <li key={Util} onClick={()=>setFilter(Util)} className={filter === Util?'bg-secondary px-4 py-1 rounded-2xl text-white shadow':'px-4 py-1 '}>{Util}</li>
                   ))
                }
            </ul>
            </div>
            <div className='flex flex-row items-center gap-4'>
            <p className='font-thin ml-1'>filtrer par date :</p>
            <DatePicker.RangePicker
           className='!border-black'
            placeholder={['Date de début', 'Date de fin']}
            onChange={(dates) => {
                if (dates) {
                setStartDate(dates[0].format('YYYY-MM-DD'));
                setEndDate(dates[1].format('YYYY-MM-DD'));
                } else {
                setStartDate('');
                setEndDate('');
                }
            }}
            format="YYYY-MM-DD"
            allowClear
             />
            </div>
            </div>
            <h1 className='ml-1 font-bold mb-2'>Liste des emprunts :</h1>
            <div class="overflow-x-scroll dark:bg-black p-2 bg-white rounded-2xl shadow-sm ">
                <table class="min-w-full rounded-xl dark:bg-black">
                    <thead>
                        <tr class="bg-white border-b-4">
                            <th scope="col" className="p-3  text-left  leading-6 font-semibold capitalize rounded-tl-xl">Demandeur</th>
                            <th scope="col" className="p-3 text-left  leading-6 font-semibold  capitalize"> etat</th>
                            <th scope="col" className="p-3 text-left  leading-6 font-semibold  capitalize"> Email </th>
                            <th scope="col" className="p-3 text-left  leading-6 font-semibold  capitalize"> date debut </th>
                            <th scope="col" className="p-3 text-left  leading-6 font-semibold  capitalize"> date fin</th>
                            <th scope="col" className="p-3 text-left  leading-6 font-semibold  capitalize rounded-tr-xl"> Actions </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300 ">
                       {
                            demadePret.length === 0 ? (<tr><td>Il n'y a pas encore de donner</td></tr>):(
                                visibleItems.map(({ username, email, demandes, debut, fin, etat, id })=>(
                                    <tr key={username}>
                                        <td className="p-3 text-left  leading-6 ">{username}</td>
                                        <td className="px-3 text-left  leading-6 "><h1 className={` ${ etat === 'En cours' ? 'bg-yellow-300': etat === 'Rendu' ? 'bg-green-500' : 'bg-red-600'  } pl-2 rounded-2xl text-white shadow-sm `}>{etat}</h1></td>
                                        <td className="p-3 text-left  leading-6  ">{email}</td>
                                        <td className="p-3 text-left  leading-6 ">{new Date(debut).toLocaleString()}</td>
                                        <td className="p-3 text-left  leading-6 ">{new Date(fin).toLocaleString()}</td>
                                        <td className="p-3 text-left  leading-6 ">
                                            <button onClick={() => openModal({ username, demandes,id:id,etat:etat })}><img src='/icone/details.png' className='w-10 hover:border rounded-full p-2'/></button>
                                        </td>
                                    </tr>
                                ))
                            )
                    }
             {/*
            {Object.keys(grouped).map((username) => {
            const { demandeur, demandes } = grouped[username];
            const sorted = [...demandes].sort((a, b) => new Date(a.date_debut) - new Date(b.date_debut));
            const first = sorted[0];
            const last = sorted[sorted.length - 1];

            return (
              <tr key={username}>
                <td className="p-3 text-left text-lg leading-6 ">{username}</td>
                <td className="px-3 text-left text-lg leading-6 "><h1 className={` ${ last.etat === 'En cours' ? 'bg-yellow-300':last.etat === 'Rendu' ? 'bg-green-500' : 'bg-red-600'  } pl-2 rounded-2xl text-white shadow-sm `}>{last.etat}</h1></td>
                <td className="p-3 text-left text-lg leading-6  ">{demandeur.email}</td>
                <td className="p-3 text-left text-lg leading-6 ">{new Date(first.date_debut).toLocaleString()}</td>
                <td className="p-3 text-left text-lg leading-6 ">{new Date(last.date_fin).toLocaleString()}</td>
                <td className="p-3 text-left text-lg leading-6 ">
                    <button onClick={() => openModal({ username, demandes,id:demandeur.id,etat:last.etat })}><img src='/icone/details.png' className='w-10 hover:border rounded-full p-2'/></button>
                </td>
              </tr>
            );
          })}*/}
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
                <a key={idx} onClick={()=>setPage(idx)} class={idx === page ? 'flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-black dark:border-white dark:bg-black dark:text-white pointer-events-none':'flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-700 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600'}
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