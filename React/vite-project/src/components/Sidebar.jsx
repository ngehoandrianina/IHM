import React, { useState } from 'react'
import Dashboard from './Dashboard'

const Sidebar = ({composant,active}) => {
  const [sty,setSty] = useState('')
    const style = active ? 'font-primary flex items-center w-50 py-2.5 px-1 colorA shadow-md rounded':'flex items-center'
  return (
    <>  
      <div className='h-[100%] w-60 py-4 '>
        <h1 className='text-center text-4xl'>Dashboard</h1>
        <div className='overflow-hidden flex flex-col items-center justify-start gap-4 mt-4 h-[100%]'>
            <div className='flex flex-col items-center p-2 bg-white shadow-sm rounded-2xl '>
            <ul className=' flex flex-col gap-2 bg-propre'>
                <li onClick={()=>composant('dashboard')} className={`text-sm font-semibold ${active === 'dashboard' ? 'text-white bg-primary' :'text-black'}  flex items-center gap-2  w-50 py-2.5 pl-4  rounded-4xl`}><img src='/icone/dashboard.png' className='w-6'/>Dashboard</li>
                <li onClick={()=>composant('materielleDispo')} className={`text-sm font-semibold ${active === 'materielleDispo' ? 'text-white bg-primary' :'text-black'}  flex gap-2  items-center w-50 py-2.5 pl-4  rounded-4xl`}><img src='/icone/materieldispo.png' className='w-6'/>Materielle Disponible</li>
                <li onClick={()=>composant('demandepret')} className={`text-sm font-semibold ${active === 'demandepret' ? 'text-white bg-primary' :'text-black'}  flex items-center gap-2 w-50 py-2.5 pl-4 rounded-4xl`}><img src='/icone/emprut.png' className='w-6' />Pret</li>
                <li onClick={()=>composant('panne')} className={`text-sm font-semibold ${active === 'panne' ? 'text-white bg-primary' :'text-black'}  flex items-center w-50 py-2.5 pl-4 gap-2  rounded-4xl`}><img src='/icone/panne.png' className='w-6' />Panne</li>
                <li onClick={()=>composant('maitenance')} className={`text-sm font-semibold ${active === 'maitenance' ? 'text-white bg-primary' :'text-black'}  flex items-center w-50 py-2.5 gap-2  pl-4 rounded-4xl`}><img src='/icone/maintenance.png' className='w-6' />Maitenance</li>
                
            </ul>
            </div>
            <h1>Gestion</h1>
            <div className='flex flex-col items-center p-2 bg-white shadow-sm rounded-2xl '>
            <ul className=' flex flex-col gap-2 bg-propre'>
                <li onClick={()=>composant('materielle')} className={`text-sm font-semibold ${active === 'materielle' ? 'text-white bg-primary' :'text-black'}  flex items-center w-50 py-2.5 pl-4 gap-2  rounded-4xl`}><img src='/icone/materiel.png' className='w-6' />Materielle</li>
                <li onClick={()=>composant('utilisateur')} className={`text-sm font-semibold ${active === 'utilisateur' ? 'text-white bg-primary' :'text-black'}  flex items-center w-50 py-2.5 pl-4 gap-2  rounded-4xl`}><img src='/icone/user.png' className='w-6' />Utilisateur</li>
                <li onClick={()=>composant('salle')} className={`text-sm font-semibold ${active === 'salle' ? 'text-white bg-primary' :'text-black'}  flex items-center w-50 py-2.5 pl-4 gap-2   rounded-4xl`}><img src='/icone/salle.png' className='w-6' />Salle</li>
            </ul>
            </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar