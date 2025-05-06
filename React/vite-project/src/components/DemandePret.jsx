import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import FairePre from './FairePre'

const DemandePret = () => {
    const [date,setDate] = useState(new Date())
    const [demadePret,setDemandePret] = useState([])
    const [show,setShow] = useState(false)
    useEffect(()=>{
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
    },[])
  return (
    <>
        <FairePre show={show} setShow={setShow} />
       <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle shadow-2xl">
            <h1 className='text-2xl mb-4'>Demande de Pret</h1>
            <div className=" flex items-center justify-between text-gray-500 focus-within:text-gray-900 mb-2 bg-white p-2 rounded-2xl shadow-sm">
                <input type="text" id="default-search" class="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none" placeholder="Search for user" />
                <button onClick={()=>setShow(true)} className='border px-6 py-2 rounded-4xl bg-primary text-white'>+ Nouveau Pret</button>
            </div>
            <div className='flex flex-row items-center justify-between mb-2 bg-white p-2 rounded-2xl shadow-sm'>
            <ul className='flex gap-2 '>
                <li className='bg-secondary px-6 py-1 rounded-2xl'>All</li>
                <li className=' px-6 py-1 rounded-2xl'>En Cours</li>
                <li className=' px-6 py-1 rounded-2xl'>Accpeter</li>
                <li className=' px-6 py-1 rounded-2xl'>Refuser</li>
            </ul>
            
            </div>
            <div class="overflow-hidden dark:bg-black p-2 bg-white rounded-2xl shadow-sm ">
                <table class="min-w-full rounded-xl dark:bg-black">
                    <thead>
                        <tr class="bg-white border-b-4">
                            <th scope="col" className="p-3  text-left text-lg leading-6 font-semibold capitalize rounded-tl-xl">  </th>
                            <th scope="col" className="p-3  text-left text-lg leading-6 font-semibold capitalize"> ID </th>
                            <th scope="col" className="p-3 text-left text-lg leading-6 font-semibold  capitalize">date demande </th>
                            <th scope="col" className="p-3 text-left text-lg leading-6 font-semibold  capitalize"> date debut </th>
                            <th scope="col" className="p-3 text-left text-lg leading-6 font-semibold  capitalize"> date fin</th>
                            <th scope="col" className="p-3 text-left text-lg leading-6 font-semibold  capitalize"> etat</th>
                            <th scope="col" className="p-3 text-left text-lg leading-6 font-semibold  capitalize"> materiel id</th>
                            <th scope="col" className="p-3 text-left text-lg leading-6 font-semibold  capitalize"> demandeur id</th>
                            <th scope="col" className="p-3 text-left text-lg leading-6 font-semibold  capitalize rounded-tr-xl"> Actions </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300 ">
                        {
                            demadePret.length === 0 ? (<tr><td>Tsisy</td></tr>):(
                                demadePret.map((dem,idx)=>(
                                    <tr key={idx}>
                                        <td className="p-4 text-left text-lg leading-6 "><input type='checkbox'  /></td>
                                        <td className="p-3 text-left text-lg leading-6 ">{dem.id}</td>
                                        <td className="p-3 text-left text-lg leading-6 ">{dem.date_demande}</td>
                                        <td className="p-3 text-left text-lg leading-6 ">{dem.date_debut}</td>
                                        <td className="p-3 text-left text-lg leading-6 ">{dem.date_fin}</td>
                                        <td className="p-3 text-left text-lg leading-6 ">{dem.etat}</td>
                                        <td className="p-3 text-left text-lg leading-6 ">{dem.materiel_id}</td>
                                        <td className="p-3 text-left text-lg leading-6 ">{dem.demandeur_id}</td>
                                        <td className="p-3 text-left text-lg leading-6 ">{dem.id}</td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-2">
      <nav className="flex flex-row flex-nowrap justify-between md:justify-center items-center" aria-label="Pagination">
          <a className="flex w-10 h-10 mr-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-800 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
              href="#" title="Previous Page">
              <span className="sr-only">Previous Page</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="block w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
          </a>
          <a className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-700 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
              href="#" title="Page 1">
              1
          </a>
          <a className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-700 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
              href="#" title="Page 2">
              2
          </a>
          <a className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-black dark:border-white dark:bg-black dark:text-white pointer-events-none"
              href="#" aria-current="page" title="Page 3">
              3
          </a>
          <a className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-700 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
              href="#" title="Page 4">
              4
          </a>
          <a className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-700 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
              href="#" title="Page 5">
              5
          </a>
          <a className="flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-800 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
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