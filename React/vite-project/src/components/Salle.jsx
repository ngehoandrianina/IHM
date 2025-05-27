import React,{useState,useEffect} from 'react'
import axios from 'axios'
import ModifSalle from './ModifSalle'
const Salle = () => {
    const [Salle,setSalle] = useState([])
    const [show,setShow] = useState(false)
    const [refesh,setRefresh] = useState(false)
    const [groupBat,setGroupBat] = useState([])
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/materielle/salle')
        .then((res)=>{
            if(res.data){
                setSalle(res.data)
                const data = res.data
                const Type = [...new Set(data.map(item => item.batiment))]
                setGroupBat(Type)
                
            }
            else{
                setSalle([])
            }
           
            //console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
            setSalle([])
        })
    },[refesh])
    //Update
    const [Update,SetUpdate] = useState({})
    const [upd,setupd] = useState(false)
    const UpdateSalle = (Salle) =>{
        SetUpdate(Salle)
        setShow(true)
        setupd(true)
    }
    //Filtration
    const [filter,setFilter] = useState('All')
    const filteredSalle = filter === 'All' ? Salle : Salle.filter(s=>s.batiment === filter)
    const [search, setSearch] = useState('');
    const filtered = filteredSalle.filter(s =>
        s.nom.toLowerCase().includes(search.toLowerCase()) ||
        s.batiment.toLowerCase().includes(search.toLowerCase()) 
      );
     //pagination
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
  return (
    <>
    <ModifSalle setShow={setShow} show={show} refresh={setRefresh} update={Update} upd={upd} setupd={setupd} />
           <div class="flex flex-col h-[100%] justify-between pb-4 mt-2">
      <div class="overflow-x-auto">
        <div class="min-w-full inline-block align-middle shadow-2xl">
           
            <div class="flex items-center justify-between text-gray-500 focus-within:text-gray-900 mb-2 bg-white p-2 rounded-2xl shadow-sm">
                <input value={search}
                 onChange={(e) => {
                setSearch(e.target.value);
                setPage(0); // pour revenir à la 1ère page en cas de changement
                }} type="text" id="default-search" class="block md:w-80 h-11 pr-5 pl-10 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none text-[12px]" placeholder="Chercher ..." />
                <button onClick={()=>setShow(true)} className='border px-6 py-2 hover:scale-95 rounded-4xl bg-primary text-white cursor-pointer'>+ Ajouter</button>
            </div>
            <div className='flex flex-row items-center justify-start gap-4 mb-2 bg-white pl-4 p-2 rounded-2xl shadow-sm'>
            <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
            <p className='font-thin ml-1'>filtrer par batiment :</p>
                    
                  <ul className='flex'>
                  <li onClick={()=>setFilter('All')} className={filter === 'All'?'bg-secondary px-4 py-1 text-white  shadow rounded-2xl':'px-4 py-1'}>Tous</li>
                   {groupBat &&
                    groupBat.map((bat)=>(
                        <li key={bat} onClick={()=>setFilter(bat)} className={filter === bat ?'bg-secondary px-4 py-1 text-white  shadow rounded-2xl':'px-4 py-1'} >{bat}</li>
                    ))
                   }
                   </ul>
            </div>
            </div>
            <h1 className='font-bold mb-1 ml-1 '>Liste des salles :</h1>
            <div class="overflow-hidden dark:bg-black p-2 bg-white rounded-2xl shadow-sm ">
                <table class="min-w-full rounded-xl dark:bg-black">
                    <thead>
                        <tr class="bg-white border-b-4">
                            <th scope="col" class="p-3  text-left  leading-6 font-semibold capitalize rounded-tl-xl"> ID </th>
                            <th scope="col" class="p-3 text-left  leading-6 font-semibold  capitalize">Nom </th>
                            <th scope="col" class="p-3 text-left  leading-6 font-semibold  capitalize"> Batiment </th>
                            <th scope="col" class="p-3 text-left  leading-6 font-semibold  capitalize"> Etage</th>
                            <th scope="col" class="p-3 w-10 text-left  leading-6 font-semibold  capitalize rounded-tr-xl"> Actions </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-300 ">
                        {Salle.length === 0 ?(<tr><td>tsisy</td></tr>):(
                            visibleItems.map((sal,idx)=>(
                                <tr key={idx} className='relative'>
                                     <td className="p-3 text-left  leading-6 ">{sal.id}</td>
                                     <td className="p-3 text-left  leading-6 ">{sal.nom}</td>
                                     <td className="p-3 text-left  leading-6 ">{sal.batiment}</td>
                                     <td className="p-3 text-left  leading-6 ">{sal.etage}</td>
                                     <td className=' lg:flex lg:items-center lg:justify-center absolute top-2 right-8'>
                                        <button onClick={()=>UpdateSalle(sal)}><img src='/icone/edit.png' className='lg:w-10 w-8 hover:border rounded-full p-2'/></button>
                                     </td>
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
                <a key={idx} onClick={()=>setPage(idx)} class={idx === page ? ' flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-black dark:border-white dark:bg-black dark:text-white pointer-events-none':'flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-700 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600'}
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

export default Salle