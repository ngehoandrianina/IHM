import { Outlet, Link ,NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import {GoHome} from "react-icons/go"
import {IoHelpCircleOutline as Help} from "react-icons/io5"
import {CiLogout} from "react-icons/ci"
import {CgEditUnmask} from "react-icons/cg"
import authService from "../../Service/authService";
import React, { useEffect, useState } from "react";
import { FiLayout, FiUser } from "react-icons/fi";
import { ToastContainer } from "react-toastify";

function Layout(){
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const UserInfo = authService.getCurrentUser()
    const deconnect = ()=>{
      authService.logout()
      navigate('/login')
    }
    const [panne,setPanne] = useState([])
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/materielle/signalement-panne')
        .then((res)=>{
            if(res.data){
                setPanne(res.data.filter(item =>item.etat === 'Non traité'))
            }
            else{
                setPanne([])
            }
            console.log(res.data.filter(item =>item.etat === 'Non traité'))
        })
        .catch((err)=>{
            console.log(err)
            setPanne([])
        })
    },[])
    return(
        <div className="">
          <ToastContainer />
          <div className="relative h-16 flex bg-base-100 px-5 shadow-md">
            {/* Title */}
              <div className="flex items-center justify-center">
                <h1 className="text-xl text-semibold">
                  Technicien
                </h1>
              </div>

            {/* list tabs */}
              <ul className="w-full flex items-center justify-center gap-2">
                  <li className="flex items-center gap-1 ml-2 text-gray-700 rounded-md px-2 py-1 hover:bg-gray-100">
                    <GoHome className="text-xl"/>
                    <NavLink to='/user'>Home</NavLink>
                  </li>
                  <li className="flex relative items-center gap-1 ml-2 text-gray-700 rounded-md px-2 py-1 hover:bg-gray-100">
                    <CgEditUnmask />
                    <NavLink to='/user/materiel'>Materiels en panne</NavLink>
                    {
                      panne.length === 0 ? '' :
                      <span className="bg-red-700 rounded-full p-1 text-white absolute  text-[8px] top-0 right-0">{panne.length}</span>
                    }
                    
                  </li>
                  <li className="flex items-center gap-1 ml-2 text-gray-700 rounded-md px-2 py-1 hover:bg-gray-100">
                    <CgEditUnmask />
                    <NavLink to='/user/maintenance'>Maintenance</NavLink>
                  </li>
                  <li className="flex items-center gap-1 ml-2 text-gray-700 rounded-md px-2 py-1 hover:bg-gray-100">
                    <Help />
                    <NavLink to='/user/apropos'>Apropos</NavLink>
                  </li>
              </ul>
            {/* logout */}
            <div className="flex items-center">
            <h3 className="text-gray-500 mr-4">{UserInfo.username}</h3>
              <div className="p-3 bg-blue-100 rounded-full">
                
                <FiUser className='text-blue-600 text-xl cursor-pointer'
                  onClick={()=> setIsOpen(!isOpen)}
                />
              </div>
            </div>
            <div className={`absolute w-40 h-25 top-16 right-2 flex flex-row justify-center  items-center gap-2 
             bg-white rounded-b-2xl py-2 shadow-md ${isOpen ? "block": "hidden"}`}>
                <button onClick={()=>deconnect()} className="flex items-center justify-center border p-2 rounded cursor-pointer">Se deconnecter <CiLogout className="text-xl text-red-500 cursor-pointer" id="logout"/></button>
            </div>

          </div>
          <div className="w-full p-5" onClick={()=> setIsOpen(false)}>
            <Outlet/>
          </div>
        </div>
    );
}

export default Layout