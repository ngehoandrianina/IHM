import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SignalementPanne from './SignalementPanne';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const MySwal = withReactContent(Swal);
const Panne = () => {
    const [panne,setPanne] = useState([])
    const [type,setType] = useState([])
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/materielle/signalement-panne')
        .then((res)=>{
            if(res.data){
                setPanne(res.data)
               const data = res.data
                const Type = [...new Set(data.map(item => item.etat))]
                setType(Type)
            }
            else{
                setPanne([])
            }
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
            setPanne([])
        })
    },[])
const showAlert =()=>{
    MySwal.fire({
        title: 'Êtes-vous sûr ?',
        text: "Cette action est irréversible.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Annuler',
      });
}
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
//pagination
    const [filter,setFilter] = useState('All')
    const filteredByType = filter === 'All' ? panne : panne.filter(s => s.etat    === filter);
    const [search, setSearch] = useState('');
   /* const filtered = filteredByType.filter(s =>
        s.utilisateur.username.toLowerCase().includes(search.toLowerCase()) ||
       s.materiel.nom.toLowerCase().includes(search.toLowerCase()) 
      );*/
      const filtered = filteredByType.filter(s => {
        const matchSearch =
          s.utilisateur.username.toLowerCase().includes(search.toLowerCase()) ||
          s.materiel.nom.toLowerCase().includes(search.toLowerCase());
      
        const dateOnly = s.date_signalement.slice(0, 10); // extrait 'YYYY-MM-DD'
      
        const matchDate =
          (!startDate || dateOnly >= startDate) &&
          (!endDate || dateOnly <= endDate);
      
        return matchSearch && matchDate;
      });
const [page,setPage] = useState(0)
const itemPerPage = 7;
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
}
//Signalement
const [show,setShow] = useState(false)
  return (
    <>
    <SignalementPanne show={show} setShow={setShow} />
       <div class="flex flex-col h-[100%] justify-between pb-4 mt-2">
      <div class="overflow-x-auto">
        <div class="min-w-full ">
            <div class=" flex items-center justify-between text-gray-500 focus-within:text-gray-900 mb-2 bg-white p-2 rounded-2xl shadow-sm">
                <input value={search}
                 onChange={(e) => {
                setSearch(e.target.value);
                setPage(0); // pour revenir à la 1ère page en cas de changement
                }} type="text" id="default-search" class="block w-40 lg:w-80 h-11 pr-5 pl-8 lg:py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none text-[12px] lg:text-sm" placeholder="Chercher ..." />
                <button onClick={()=>setShow(true)} className='bg-primary text-white p-2 px-4 rounded-2xl hover:scale-95 cursor-pointer text-[12px]'>Signaler panne</button>
            </div>
            <div className='flex flex-col lg:flex-row items-start gap-3 lg:gap-0 lg:items-center justify-between p-2 bg-white mb-2 rounded-2xl shadow-sm'>
            <div className='flex items-center gap-4'>
            <p className='font-thin ml-1 text-[12px]'>filtrer par etat :</p>
            <ul className='flex cursor-pointer text-[12px]'>
                <li onClick={()=>(setFilter('All'),setStartDate(''),setEndDate(''))}  className={filter === 'All'?'bg-secondary px-4 py-1 rounded-2xl text-white shadow':'px-4 py-1'}>Tous</li>
                {   type &&
                   type.map((Util)=>(
                        <li key={Util} onClick={()=>setFilter(Util)} className={filter === Util?'bg-secondary px-4 py-1 rounded-2xl text-white shadow':'px-4 py-1'}>{Util}</li>
                   ))
                }
            </ul>
            </div>
            <div>
            <div className='flex items-center gap-4 text-[12px]'>
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
           
            </div>
            <h1 className='font-bold mb-1 ml-1'>Liste des signalement de panne :</h1>

            <div class="overflow-x-scroll dark:bg-black p-2 bg-white rounded-2xl shadow-sm">
                <table class="min-w-full rounded-xl dark:bg-black text-[12px] lg:text-lg ">
                    <thead>
                        <tr class="bg-white border-b-4">
                            <th scope="col" class="p-3  text-left  leading-6 font-semibold w-10 capitalize rounded-tl-xl"> ID </th>
                            <th scope="col" class="p-3 text-left  leading-6 font-semibold w-62 capitalize">date signalement </th>
                            <th scope="col" class="p-3 text-left  leading-6 font-semibold  capitalize"> description </th>
                            <th scope="col" class="p-3 text-left  leading-6 font-semibold w-30  capitalize"> etat</th>
                            <th scope="col" class="p-3 text-left  leading-6 font-semibold w-28  capitalize"> materiel</th>
                            <th scope="col" class="p-3 text-left  leading-6 font-semibold w-14 capitalize rounded-tr-xl"> Utilisateur </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-300 ">
                    {panne.length === 0 ?(<tr><td>tsisy</td></tr>):(
                            visibleItems.map((pan,idx)=>(
                                <tr key={idx}>
                                     <td className="p-3 text-left  leading-6 ">{pan.id}</td>
                                     <td className="p-3 text-left  text-[12px] lg:text-[15px] leading-6 ">{pan.date_signalement}</td>
                                     <td className="p-3 text-left  leading-6 ">{pan.description}</td>
                                     <td className="p-3 text-left  leading-6 "><h1 className={ `${pan.etat === 'Resolu'?'bg-green-500':pan.etat === 'Non traité'?'bg-amber-400':'bg-red-500'} text-white px-2 rounded-2xl text-[15px]`}>{pan.etat}</h1></td>
                                     <td className="p-3 text-left  leading-6 ">{pan.materiel.nom}</td>
                                     <td className="p-3 text-left  leading-6 ">{pan.utilisateur.username}</td>
                                </tr>
                            ))
                        )}
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

export default Panne