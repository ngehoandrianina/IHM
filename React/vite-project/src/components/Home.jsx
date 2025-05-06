import React,{useState} from 'react'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard'
import Materielle from './Materielle';
import Panne from './Panne';
import Maitenance from './Maitenance';
import DemandePret from './DemandePret';
import Salle from './Salle';
import Utilisateur from './Utilisateur';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const [activePage, setActivePage] = useState('dashboard');

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
      default:
        return <h2>Page non trouvée</h2>;
    }
  };
  const [isDark, setIsDark] = useState(false);
  return (
    <>
    <ToastContainer />
    <div className={isDark ? 'dark' : ''}>
    <div className='flex flex-row relative bg-[#f8f9fa] dark:bg-black dark:text-white '>
        <div>
            <Sidebar composant={setActivePage} active={activePage} />
        </div>
        <div className='h-screen w-screen flex flex-col items-center justify-start px-4'>
            <div className='flex items-center justify-between h-15 w-full bg-white rounded-2xl mt-2 px-4 shadow-sm'>
                <h1 className='text-primary'>Admin</h1>
                <h1>Deconnecter</h1>
            </div>
            <div  className='w-full' >
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