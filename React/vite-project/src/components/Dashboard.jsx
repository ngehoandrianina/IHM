import React from 'react'

const Dashboard = () => {
  return (
    <>
      <div className=' mt-2  flex items-center justify-between flex-row flex-wrap '>
        <div className=' bg-white p-2 rounded-2xl shadow w-56 px-4 ' >
          <div className='flex flex-row justify-between items-center'>
            <p className='font-thin text-[15px]'>Nombre total materiel</p>
            <p className='font-bold'>{'>'}</p>
          </div>
          <div className='flex flex-row justify-between items-center'>
          <h1 className='text-4xl'>1</h1>
          <img src='/gestionmat.webp' className='w-20 rounded-4xl' />
          </div>
        </div>
        <div className=' bg-white p-2 rounded-2xl shadow w-56 px-4 ' >
        <div className='flex flex-row justify-between items-center'>
            <p className='font-thin text-[15px]'>Nombre total materiel</p>
            <p className='font-bold'>{'>'}</p>
          </div>
          <div className='flex flex-row justify-between items-center'>
          <h1 className='text-4xl'>1</h1>
          <img src='/gestionmat.webp' className='w-20 rounded-4xl' />
          </div>
        </div>
        <div className=' bg-white p-2 rounded-2xl shadow w-56 px-4 ' >
        <div className='flex flex-row justify-between items-center'>
            <p className='font-thin text-[15px]'>Nombre total materiel</p>
            <p className='font-bold'>{'>'}</p>
          </div>
          <div className='flex flex-row justify-between items-center'>
          <h1 className='text-4xl'>1</h1>
          <img src='/gestionmat.webp' className='w-20 rounded-4xl' />
          </div>
        </div>
        <div className=' bg-white p-2 rounded-2xl shadow w-56 px-4 ' >
        <div className='flex flex-row justify-between items-center'>
            <p className='font-thin text-[15px]'>Nombre total materiel</p>
            <p className='font-bold'>{'>'}</p>
          </div>
          <div className='flex flex-row justify-between items-center'>
          <h1 className='text-4xl'>1</h1>
          <img src='/gestionmat.webp' className='w-20 rounded-4xl' />
          </div>
        </div>
        <div className=' bg-white p-2 rounded-2xl shadow w-56 px-4 ' >
        <div className='flex flex-row justify-between items-center'>
            <p className='font-thin text-[15px]'>Nombre total materiel</p>
            <p className='font-bold'>{'>'}</p>
          </div>
          <div className='flex flex-row justify-between items-center'>
          <h1 className='text-4xl'>1</h1>
          <img src='/gestionmat.webp' className='w-20 rounded-4xl' />
          </div>
        </div>
      </div>
      <div className='bg-white shadow mt-4 flex felx-col justify-between p-4 rounded-2xl'>
        <div>
          <h1>Liste des Emprunt en cours</h1>
          <table class="min-w-full rounded-xl dark:bg-black">
          <tr class="bg-white border-b-4">
              <th scope="col" class="p-3  text-left text-lg leading-6 font-semibold capitalize rounded-tl-xl"> Utilisateur</th>
              <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize">Materielle </th>
              <th scope="col" class="p-3 text-left text-lg leading-6 font-semibold  capitalize rounded-tr-xl"> Salle </th>
            </tr>
          </table>
        </div>
        <div>
          <h>Statistique des materielle</h>

        </div>
          
      </div>
    </>
  )
}

export default Dashboard