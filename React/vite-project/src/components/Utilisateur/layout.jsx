import { Outlet, Link ,NavLink, useNavigate} from "react-router-dom";
import {BsSearch} from "react-icons/bs"
import {GoHome} from "react-icons/go"
import {IoHelpCircleOutline as Help} from "react-icons/io5"
import {CiLogout} from "react-icons/ci"
import {CgEditUnmask} from "react-icons/cg"
import {RiToolsLine} from 'react-icons/ri'
import NavBarUser from "./NavBarUser";
import React, { useEffect, useState } from "react";
import { FiLayout, FiUser } from "react-icons/fi";
import './layout.css'

function Layout(){
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [navOpen, setNavOpen] = useState(false);

    const menu= document.querySelector(".humberger");
    const showNavigation = () =>{
        setNavOpen(!navOpen);
        const ariaToggle= menu.getAttribute("aria-expanded") === "true" ? "false" : "true";
        menu.setAttribute("aria-expanded", ariaToggle)
    }
    
    return(
        <div className="">
          <div className="relative h-16 flex justify-between bg-base-100 px-2 shadow-md">
            {/* Title */}
              <div className="nav-title flex items-center justify-center gap-2">
                <RiToolsLine className="text-2xl text-orange-300 font-bold"/>
                <h1 className="text-xl text-semibold">
                  Technicien
                </h1>
              </div>
            {/* list tabs */}
              <div className="flex items-center">
                <button className={navOpen ? "humberger open": "humberger"} aria-label="toggle navigation" aria-expanded="false"
                  type="button"
                  onClick={showNavigation}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className={navOpen ? "navlinks-container open" : "navlinks-container"}>
                    <NavLink to='/user/home'
                      className={({isActive}) => `${isActive ? 'w-full flex gap-1 mr-4 px-2 py-1 shadow-sm rounded-md' : 'w-full flex gap-1 mr-4 rounded-sm px-2 py-1 hover:bg-gray-100'}`}
                      onClick={()=> setNavOpen(false)}
                    >
                        <GoHome className="text-xl"/>
                        <span>Home</span>
                    </NavLink>

                    <NavLink to='/user/materiel'
                      className={({isActive}) => `${isActive ? 'w-full flex gap-1 mr-4 px-2 py-1 shadow-sm rounded-md' : 'w-full flex gap-1 mr-4 rounded-sm px-2 py-1 hover:bg-gray-100'}`}
                      onClick={()=> setNavOpen(false)}
                    >
                        <CgEditUnmask className="text-xl"/>
                        <span>Materiels</span>
                    </NavLink>

                    <NavLink to='/user/maintenance'
                      className={({isActive}) => `${isActive ? 'w-full flex gap-1 mr-4 px-2 py-1 shadow-sm rounded-md' : 'w-full flex gap-1 mr-4 rounded-sm px-2 py-1 hover:bg-gray-100'}`}
                      onClick={()=> setNavOpen(false)}
                    >
                      <CgEditUnmask className="text-xl"/>
                      <span>Maintenance</span>
                    </NavLink>

                    <NavLink to='/user/apropos'
                      className={({isActive}) => `${isActive ? 'w-full flex gap-1 mr-4 px-2 py-1 shadow-sm rounded-md' : 'w-full flex gap-1 mr-4 rounded-sm px-2 py-1 hover:bg-gray-100'}`}
                      onClick={()=> setNavOpen(false)}
                    >
                      <Help className="text-xl"/>
                      <span>Apropos</span>
                    </NavLink>
                </div>
              </div>
              
            {/* logout */}
            <div className="user-icon flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <FiUser className='text-blue-600 text-xl cursor-pointer'
                  onClick={()=> setIsOpen(!isOpen)}
                />
              </div>
            </div>
            <div className={`absolute w-40 h-25 top-16 right-0 border border-gray-200 rounded-sm flex flex-col justify-end items-center gap-2
             bg-white py-2 shadow-md z-100 ${isOpen ? "block": "hidden"}`}>
                <h3 className="text-gray-500">User 01</h3>
                <CiLogout className="text-xl text-red-500 cursor-pointer" id="logout"
                  onClick={()=>{ navigate('/login') }}
                />
            </div>

          </div>
          <div className="w-full p-5">
            <Outlet/>
          </div>
        </div>
    );
}

export default Layout