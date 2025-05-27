import React,{useEffect,useState} from 'react'
import axios from 'axios'
import AjoutUtilisateur from './AjoutUtilisateur'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Utilisateur = () => {
    const [show,setShow] = useState(false)
    const [Utilisateur,SetUtilisateur] = useState([])
    const [refresh,setRefresh] = useState(false)
    const [groupement,setGroupment] = useState([])
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/materielle/utilisateur')
        .then((res)=>{
            if(res.data){
                SetUtilisateur(res.data)
                const data = res.data
                const Type = [...new Set(data.map(item => item.role))]
                setGroupment(Type)
            }
            else{
                SetUtilisateur([])
            }
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
            SetUtilisateur([])
        })
    },[refresh])
      //Filtration
      const [filter,setFilter] = useState('All')
      const filteredUtilisateur = filter === 'All' ? Utilisateur : Utilisateur.filter(s=>s.role === filter)
      const [search, setSearch] = useState('');
        const filtered = filteredUtilisateur.filter(s =>
        s.username.toLowerCase().includes(search.toLowerCase()) ||
        s.role.toLowerCase().includes(search.toLowerCase()) ||
        s.departement.toLowerCase().includes(search.toLowerCase())
      );
    //pagination
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
    }
    //pagination
    //Delete
    const DeleteUtilisateur = (id) =>{
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
            if(res.isConfirmed){
                axios.delete(`http://127.0.0.1:8000/materielle/utilisateur/${id}/`)
                .then((res)=>{
                    MySwal.fire('Supprimer avec succes','element suprimer','success')
                    setRefresh((prev)=>!prev)
                })
                .catch((err)=>{
                    console.log(err)
                }) 
            }
        });
    }
    //Update
    const [upd,setupd] = useState(false)
    const [DataUpdate,setDataUpdate] = useState({})
    const Update =(user)=>{
        setDataUpdate(user)
        setShow(true)
        setupd(true)
    }
  return (
    <>
    <AjoutUtilisateur show={show} setShow={setShow} refresh={setRefresh} DataUpdate={DataUpdate} upd={upd} setupd={setupd} />
    <div class="flex flex-col h-[100%] justify-between pb-4 mt-2">
      <div class="overflow-x-auto">
        <div class="min-w-full">
            <div class=" flex items-center justify-between text-gray-500 focus-within:text-gray-900 mb-2 bg-white p-2 rounded-2xl shadow-sm">
                <input value={search}
                 onChange={(e) => {
                setSearch(e.target.value);
                setPage(0); // pour revenir à la 1ère page en cas de changement
                }}  type="text" id="default-search" class="block lg:w-80  h-11 pr-5 pl-10 py-2.5  font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none" placeholder="Chercher ..." />
                <button onClick={()=>setShow(true)} className='border px-6 py-2 hover:scale-95 rounded-4xl bg-primary text-white cursor-pointer text-[12px]'>+ Ajouter Utilisateur</button>
            </div>
            <div className='flex flex-row items-center justify-between mb-2 bg-white p-2 rounded-2xl shadow-sm'>
            <div className='flex flex-col lg:flex-row items-start lg:items-center gap-2'>
            <p className='font-thin ml-1'>filtrer par role :</p>
            <ul className='flex gap-2 items-center justify-center cursor-pointer'>
                <li onClick={()=>setFilter('All')} className={filter === 'All'?'bg-secondary px-4 py-1 rounded-2xl text-white shadow':'px-4 py-1'}>Tous</li>
                {   groupement &&
                   groupement.map((Util)=>(
                        <li key={Util} onClick={()=>setFilter(Util)} className={filter === Util?'bg-secondary px-4 py-1 rounded-2xl text-white shadow':'px-4 py-1'}>{Util}</li>
                   ))
                }
            </ul>
            </div>
            </div>
            <h1 className='font-bold mb-1 ml-1 '>Liste des utilisateurs :</h1>
            <div class="overflow-x-scroll dark:bg-black p-2 bg-white rounded-2xl shadow-sm ">
                <table class="min-w-full rounded-xl dark:bg-black">
                    <thead>
                        <tr class="bg-white border-b-4">
                            <th scope="col" class="p-3  text-left  leading-6 font-semibold capitalize rounded-tl-xl"> ID </th>
                            <th scope="col" class="p-3 text-left  leading-6 font-semibold  capitalize">Nom </th>
                            <th scope="col" class="p-3 text-left leading-6 font-semibold  capitalize"> Email </th>
                            <th scope="col" class="p-3 text-left leading-6 font-semibold  capitalize"> Role</th>
                            <th scope="col" class="p-3 text-left leading-6 font-semibold  capitalize"> Departemet</th>
                            <th scope="col" class="p-3 w-24 text-left leading-6 font-semibold  capitalize rounded-tr-xl"> Actions </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-300 ">
                    {Utilisateur.length === 0 ?(<tr><td>tsisy</td></tr>):(
                            visibleItems.map((User,idx)=>(
                                <tr key={idx} className='relative'>
                                     <td className="p-3 text-left  leading-6 ">{User.id}</td>
                                     <td className="p-3 text-left  leading-6 ">{User.username}</td>
                                     <td className="p-3 text-left leading-6 ">{User.email}</td>
                                     <td className="p-3 text-left  leading-6 ">{User.role}</td>
                                     <td className="p-3 text-left  leading-6 ">{User.departement}</td>
                                     <td className="p-2 text-left  leading-6 lg:flex lg:items-center lg:justify-between absolute lg:static top-0 right-0 ">
                                       <button onClick={()=>Update(User)} ><img src='/icone/edit.png' className='lg:w-10 w-8 hover:border rounded-full p-2'/></button>
                                       <button onClick={()=>DeleteUtilisateur(User.id)} ><img src='/icone/delete.png' className='lg:w-10 w-8 hover:border rounded-full p-2' /></button>
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

export default Utilisateur