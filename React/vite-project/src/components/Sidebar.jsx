import React, { useState } from 'react'
import Dashboard from './Dashboard'

const Sidebar = ({composant,active,setaffiche}) => {
  
  return (
    <> 
      <div className='h-[100%] flex gap-y-4  flex-col items-center w-60 py-4 cursor-pointer'>
        
        <div className=' flex w-full items-center lg:justify-center justify-between px-4'>
        <h1 className='text-center lg:text-2xl text-xl'>Tableau de bord</h1>
        
        </div>
        
        <div className='overflow-hidden flex flex-col items-center justify-start gap-4 lg:mt-3 h-[100%]'>
            <div className='flex flex-col items-center p-2 bg-white shadow-sm rounded-2xl '>
            <ul className=' flex flex-col gap-2 bg-propre'>
                <li onClick={()=>composant('dashboard')} className={`text-sm font-semibold ${active === 'dashboard' ? 'text-white bg-primary' :'text-black'}  flex items-center gap-2  w-50 py-2.5 pl-4  rounded-4xl`}><img src= {active === 'dashboard' ?'/icone/dashboard.png':'/icone/dashboard2.png'} className='w-6'/>Tableau de bord</li>
                <li onClick={()=>composant('materielleDispo')} className={`text-sm font-semibold ${active === 'materielleDispo' ? 'text-white bg-primary' :'text-black'}  flex gap-2  items-center w-50 py-2.5 pl-4  rounded-4xl`}><img src={active === 'materielleDispo' ? '/icone/materieldispo.png':'/icone/materieldispo2.png'} className='w-6'/>Materielle Disponible</li>
                <li onClick={()=>composant('demandepret')} className={`text-sm font-semibold ${active === 'demandepret' ? 'text-white bg-primary' :'text-black'}  flex items-center gap-2 w-50 py-2.5 pl-4 rounded-4xl`}><img src={active === 'demandepret' ?'/icone/emprut.png':'/icone/emprunt2.png'} className='w-6' />Pret</li>
                <li onClick={()=>composant('panne')} className={`text-sm font-semibold ${active === 'panne' ? 'text-white bg-primary' :'text-black'}  flex items-center w-50 py-2.5 pl-4 gap-2  rounded-4xl`}><img src={active === 'panne' ?'/icone/panne.png':'/icone/panne3.png'} className='w-6' />Panne</li>
                <li onClick={()=>composant('maitenance')} className={`text-sm font-semibold ${active === 'maitenance' ? 'text-white bg-primary' :'text-black'}  flex items-center w-50 py-2.5 gap-2  pl-4 rounded-4xl`}><img src={active === 'maitenance' ?'/icone/maintenance.png':'/icone/maintenance3.png'} className='w-6' />Maitenance</li>
                
            </ul>
            </div>
            <h1>Gestion</h1>
            <div className='flex flex-col items-center p-2 bg-white shadow-sm rounded-2xl '>
            <ul className=' flex flex-col gap-2 bg-propre'>
                <li onClick={()=>composant('materielle')} className={`text-sm font-semibold ${active === 'materielle' ? 'text-white bg-primary' :'text-black'}  flex items-center w-50 py-2.5 pl-4 gap-2  rounded-4xl`}><img src={active === 'materielle'?'/icone/materiel.png':'/icone/materiel2.png'} className='w-6' />Materielle</li>
                <li onClick={()=>composant('utilisateur')} className={`text-sm font-semibold ${active === 'utilisateur' ? 'text-white bg-primary' :'text-black'}  flex items-center w-50 py-2.5 pl-4 gap-2  rounded-4xl`}><img src={active === 'utilisateur'?'/icone/user.png':'/icone/user2.png'} className='w-6' />Utilisateur</li>
                <li onClick={()=>composant('salle')} className={`text-sm font-semibold ${active === 'salle' ? 'text-white bg-primary' :'text-black'}  flex items-center w-50 py-2.5 pl-4 gap-2   rounded-4xl`}><img src={active === 'salle' ? '/icone/salle.png':'/icone/salle2.png'} className='w-6' />Salle</li>
            </ul>
            </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar