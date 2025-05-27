import React,{useEffect,useState} from 'react'
import axios from 'axios'
import FairePre from './FairePre'
import { toast } from 'react-toastify'
const MaterielDispo = () => {
    const [materiel,setMateriel] = useState([])
    const [Group,setGroup] = useState({})
    const [refesh,setRefresh] = useState(false)
    const [type,setType] = useState([])
    const [show,setShow] = useState(false)

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/materielle/materiels')
        .then((res)=>{
            if(res.data){
                setMateriel(res.data.filter(item => item.etat === 'Disponible'))
                const data = res.data
                const Type = [...new Set(data.map(item => item.type))]
                setType(Type)
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
        },[])
    
        //Selection Type
        const [selectedType,setSelectedType]=useState('')
        const handleType =(type)=>{
            selectedType(type)
        }
     //Regroupement
     useEffect(()=>{
        const regroupement = {};
        materiel.forEach((mat)=>{
            if(!regroupement[mat.type]){
                regroupement[mat.type] = [];
            }
            regroupement[mat.type].push(mat)
        })
        setGroup(regroupement)
    },[materiel])
    const MatGroup = Object.entries(Group).map(([type,liste])=>{
        return{
            type:type,
            liste:liste
        }
    })
        const [filter,setFilter] = useState('All')
        const filtered = filter === 'All' ? MatGroup : MatGroup.filter(s=>s.type === filter)
     //pagination
    const [page,setPage] = useState(0)
    const itemPerPage = 3;
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
    //Materiele Selectionner
    const [SelectedMat,setSelectedMat] = useState([])

    const MatSelect = (Materiel)=>{
     setSelectedMat((prev)=>{
        const exist = prev.find(item => item.id === Materiel.id)
        if(exist){
            return prev.filter(item=>item.id !== Materiel.id)
        }
        else{
            return [...prev,{id:Materiel.id,nom:Materiel.nom}]
        }
     })
        
    }
    //open modal
    const ShowModal = () =>{
        if(SelectedMat.length === 0){
            toast.error('Choisir au moin un materielle pour un pret')
        }
        else{
            setShow(true)
        }
    }
  
  return (
    <>
    <div className="flex flex-col h-[100%]">
      <div className="h-[100%] flex flex-col justify-start  ">
        <div class="min-w-full ">
            <div class=" mt-2 flex items-center justify-between text-gray-500 focus-within:text-gray-900 mb-2 bg-white p-2 rounded-2xl shadow-sm">
                <h1 className='text-black ml-1 font-thin text-[10px] lg:text-lg'>Liste des materielles disponible</h1>
                <button onClick={()=>ShowModal()} className='hover:scale-95 border px-6 py-2 rounded-4xl bg-secondary text-white cursor-pointer'>Faire pret</button>
            </div>
            <div className='flex gap-2 flex-col lg:flex-row items-center justify-start mb-2 bg-white p-2 rounded-2xl shadow-sm'>
                <p className='font-thin ml-1'>Filtrer par type :</p>
        
                <ul className='flex gap-1 items-center justify-center pl-4 cursor-pointer'>
            
                <li onClick={()=>setFilter('All')}  className={filter === 'All'?'bg-secondary px-4 py-1 rounded-2xl text-white shadow':'px-4 py-1 '}>Tous</li>
                {   type &&
                   type.map((Util)=>(
                        <li key={Util} onClick={()=>setFilter(Util)} className={filter === Util?'bg-secondary px-4 py-1 rounded-2xl text-white shadow':'px-4 py-1'}>{Util}</li>
                   ))
                }
            </ul>
          
           
            </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 w-[100%] h-[100%] overflow-x-hidden'>
            {
                visibleItems.map(({type,liste})=>(
                <div key={type} class=" dark:bg-black p-2 bg-white rounded-2xl shadow-sm  h-[100%] overflow-y-scroll noscroll">
                    <div className='bg-primary p-1 rounded-2xl text-white'>
                        <h1 className='text-center text-xl'>{type}</h1>
                    </div>
                    
                    <ul className='flex flex-col gap-2 mt-2'>
                    {
                        liste.map((mat)=>(
                            <li key={mat.id} className='flex justify-between px-2'>{mat.nom} 
                            <input type='checkbox' style={{width:18}}
                            checked={SelectedMat.some(m => m.id  === mat.id)} 
                            onChange={()=>MatSelect(mat)} 
                            />
                            </li>                        
                            
                            ))
                    }   
                    </ul>
                </div>
                ))
            }
            </div>
        
      </div>
      <div class="container mx-auto px-4 mt-4">
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
                <a key={idx} onClick={()=>setPage(idx)} class={idx === page ? ' flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-black dark:border-white dark:bg-black dark:text-white pointer-events-none':' flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-700 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600'}
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
      <FairePre show={show} setShow={setShow} matSelected={SelectedMat} annul={setSelectedMat}/>
   </>
  )
}

export default MaterielDispo