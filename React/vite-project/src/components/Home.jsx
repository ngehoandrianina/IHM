import React,{useEffect, useState} from 'react'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard'
import Materielle from './Materielle';
import Panne from './Panne';
import Maitenance from './Maitenance';
import DemandePret from './DemandePret';
import Salle from './Salle';
import Utilisateur from './Utilisateur';
import MaterielDispo from './MaterielDispo';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import authService from '../Service/authService';
import ModalUser from './ModalUser';
import { motion } from 'framer-motion';

const Home = () => {
    const [activePage, setActivePage] = useState('dashboard');
    const User = authService.getCurrentUser()
 

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard/>;
      case 'materielle':
        return <Materielle /> ;
      case 'utilisateur':
        return <Utilisateur />;
        case 'panne':
            return <Panne />;
        case 'maitenance':
            return <Maitenance />
        case 'demandepret':
            return <DemandePret />;
        case 'salle':
            return <Salle />;
        case 'materielleDispo':
          return <MaterielDispo />
      default:
        return <h2>Page non trouvée</h2>;
    }
  };
  const [isDark, setIsDark] = useState(false);
  const [show,setShow] = useState(false)
    //Date et heurre
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(()=>{
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
    },[])
    const formatHeure = () => {
      return currentTime.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    };
    const formatDate = () => {
      return currentTime.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };
    const [affiche,setaffiche] = useState(false)
  return (
    <>
    <ToastContainer />
    <div className={isDark ? 'dark' : ''}>
    <div className='flex flex-row relative bg-[#f8f9fa] dark:bg-black dark:text-white '>
        <div 
          className={`${affiche ? 'block':'hidden'} lg:block lg:relative absolute top-0 left-0 z-10 backdrop-blur-sm`}>
            <Sidebar composant={setActivePage} active={activePage} setaffiche={setaffiche} />
        </div>
          <div className='h-screen w-screen flex flex-col items-center justify-start px-4 '>
            <div className='flex fixed lg:static items-center justify-between gap-2 h-[8%] w-[95%] z-10   lg:w-full bg-white rounded-2xl mt-2 px-4 shadow-sm'>
              <div>
                <motion.h1 
                initial={{opacity:0}}
                animate={{opacity:1}}
                 className='lg:hidden' onClick={()=>setaffiche(!affiche)}><img 
                  src={affiche ? '/icone/close.png':'/icone/menu.png'} className='w-10' /></motion.h1>
                <h1 className=' hidden lg:block text-xl font-thin'>{formatDate()}</h1> 
              </div>
              <div><h1 className=' hidden lg:block text-xl font-thin'>{formatHeure()}</h1></div>
              <div className='flex'>
              <h1 onClick={()=>setShow(!show)} className='text-primary text-2xl'>{User.username}</h1>
                <button onClick={()=>setShow(!show)}><img src='/icone/admin.png' className='w-10' /></button>
              </div>
              <ModalUser show={show} setShow={setShow} />
            </div>
            <div  className='w-full h-[90%] mt-16 lg:mt-0 text-[12px] lg:text-sm' >
                {
                    renderContent()
                }
            </div>
        </div>
       
    </div>
    </div>
    </>
  )
}

export default Home