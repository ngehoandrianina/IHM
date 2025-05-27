import React,{useState,useEffect} from 'react'
import axios from 'axios';
import MyLineChart from './MyLineChart'
import MyPieChart from './MyPieChart';
import MyBarChart from './MyBarChart';
const Dashboard = () => {
  const [materiel,setMateriel] = useState([])
  const [demadePret,setDemandePret] = useState([])
  const [stat,setStat] = useState({
    disponible:0,
    panne:0,
    maintenance:0,
    pret:0,
  })
  useEffect(()=>{
   
    axios.get('http://127.0.0.1:8000/materielle/materiels')
    //axios.get('http://127.0.0.1:8000/materielle/demandes-pret')
    .then((res)=>{
        if(res.data){
            setMateriel(res.data)
        }
        else{
            setMateriel([])
        }
        
    })
    .catch((err)=>{
        console.log(err)
        setMateriel([])
    })
    },[])
    //Comptage
    useEffect(()=>{
      const compteur = {
        disponible:0,
        panne:0,
        maintenance:0,
        pret:0
      }
        materiel.forEach(item=>{
        const etat = item.etat.toLowerCase()
        if(etat.includes("disponible")) compteur.disponible += 1;
        else if(etat.includes('en pret')) compteur.pret += 1;
        else if(etat.includes('en panne')) compteur.panne += 1;
        else if(etat.includes('en Maintenance')) compteur.maintenance += 1;
        setStat(compteur)
      })
    },[materiel])
  

  return (
    <>
      <div className='mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-0 lg:flex lg:items-center justify-between flex-row flex-wrap '>
        <div className=' bg-white p-2 rounded-2xl shadow lg:w-56 px-4 lg:mt-2' >
          <div className='flex flex-row justify-between items-center'>
            <p className='font-thin text-[15px]'>Nombre total materiel</p>
            <p className='font-bold'>{'>'}</p>
          </div>
          <div className='flex flex-row justify-between items-center'>
          <img src='/icone/total.png' className='w-12 rounded-4xl' />
          <h1 className='text-4xl'>{materiel.length}</h1>
          
          </div>
        </div>
        <div className=' bg-white p-2 rounded-2xl shadow lg:w-56 px-4 lg:mt-2' >
        <div className='flex flex-row justify-between items-center'>
            <p className='font-thin text-[15px]'>Materiel Disponible</p>
            <p className='font-bold'>{'>'}</p>
          </div>
          <div className='flex flex-row justify-between items-center'>
          <img src='/icone/dispo.png' className='w-12 rounded-4xl' />
          <h1 className='text-4xl'>{stat.disponible}</h1>
          
          </div>
        </div>
        <div className=' bg-white p-2 rounded-2xl shadow lg:w-56 px-4 lg:mt-2' >
        <div className='flex flex-row justify-between items-center'>
            <p className='font-thin text-[15px]'>Materiel en pret</p>
            <p className='font-bold'>{'>'}</p>
          </div>
          <div className='flex flex-row justify-between items-center'>
          <img src='/icone/pret.png' className='w-12 rounded-4xl' />
          <h1 className='text-4xl'>{stat.pret}</h1>
          
          </div>
        </div>
        <div className=' bg-white p-2 rounded-2xl shadow lg:w-56 px-4 lg:mt-2 ' >
        <div className='flex flex-row justify-between items-center'>
            <p className='font-thin text-[15px]'>Materiel en panne</p>
            <p className='font-bold'>{'>'}</p>
          </div>
          <div className='flex flex-row justify-between items-center'>
          <img src='/icone/panne2.png' className='w-12 rounded-4xl' />
          <h1 className='text-4xl'>{stat.panne}</h1>
         
          </div>
        </div>
        <div className=' bg-white p-2 rounded-2xl shadow lg:w-56 px-4 lg:mt-2' >
        <div className='flex flex-row justify-between items-center'>
            <p className='font-thin text-[15px]'>Materiel en Maitenance</p>
            <p className='font-bold'>{'>'}</p>
          </div>
          <div className='flex flex-row justify-between items-center'>
          <img src='/icone/maintenance2.png' className='w-12 rounded-4xl' />
          <h1 className='text-4xl'>{stat.maintenance}</h1>
          
          </div>
        </div>
      </div>
      <div className='  mt-4 gap-6 flex flex-col lg:flex-row flex-wrap lg:flex-nowrap lg:justify-between '>
        <div className='lg:w-[50%]   bg-white shadow rounded-2xl p-4 flex flex-col items-center justify-center'>
          <h>Statistique des materielle</h>
          <MyLineChart data={materiel} />
          <h>Statistique des materielle</h>
          <MyBarChart data={materiel} />
        </div>
        <div className='lg:w-[25%] bg-white shadow rounded-2xl pb-36 flex flex-col items-center justify-between overflow-hidden'>
        <h className='bg-primary text-white w-[100%] p-4 text-center ' >Repartiton des materielles</h>
        <MyPieChart data={materiel}  />
        </div>
        <div className='lg:w-[25%] bg-white shadow rounded-2xl  flex flex-col items-center justify-start overflow-hidden'>
          <h1 className='bg-teal-600 text-white w-[100%] p-4 text-center '>Liste des Emprunt en cours</h1>
          <table class="min-w-full rounded-xl dark:bg-black">
            <thead >
            <tr class="bg-white border-b-4">
              <th scope="col" class="p-3  text-center text-lg leading-6 font-semibold capitalize rounded-tl-xl"> Utilisateur</th>
            </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 text-center border-b-2 text-lg leading-6 ">Kidsofa</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Dashboard