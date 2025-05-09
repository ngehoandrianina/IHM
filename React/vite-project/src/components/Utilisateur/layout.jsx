import { Outlet, Link ,NavLink, useNavigate} from "react-router-dom";
import {BsSearch} from "react-icons/bs"
import {GoHome} from "react-icons/go"
import {IoHelpCircleOutline as Help} from "react-icons/io5"
import {CiLogout} from "react-icons/ci"
import {CgEditUnmask} from "react-icons/cg"
import NavBarUser from "./NavBarUser";
import React, { useState } from "react";
import { FiLayout, FiUser } from "react-icons/fi";


function Layout(){
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div className="">
          <div className="relative h-16 flex bg-base-100 px-5 shadow-md">
            {/* Title */}
              <div className="flex items-center justify-center">
                <h1 className="text-xl text-semibold">
                  technicien
                </h1>
              </div>

            {/* list tabs */}
              <ul className="w-full flex items-center justify-center gap-2">
                  <li className="flex items-center gap-1 ml-2 text-gray-700 rounded-md px-2 py-1 hover:bg-gray-100">
                    <GoHome className="text-xl"/>
                    <NavLink to='/user'>Home</NavLink>
                  </li>
                  <li className="flex items-center gap-1 ml-2 text-gray-700 rounded-md px-2 py-1 hover:bg-gray-100">
                    <CgEditUnmask />
                    <NavLink to='/user/materiel'>Materiels</NavLink>
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
              <div className="p-3 bg-blue-100 rounded-full">
                <FiUser className='text-blue-600 text-xl cursor-pointer'
                  onClick={()=> setIsOpen(!isOpen)}
                />
              </div>
            </div>
            <div className={`absolute w-40 h-25 top-16 right-2 flex flex-col justify-end items-center gap-2
             bg-base-100 py-2 shadow-md ${isOpen ? "block": "hidden"}`}>
                <h3 className="text-gray-500">Mr Robot</h3>
                <CiLogout className="text-xl text-red-500 cursor-pointer" id="logout"
                  onClick={()=>{ navigate('/login') }}
                />
            </div>

          </div>
          <div className="w-full p-5" onClick={()=> setIsOpen(false)}>
            <Outlet/>
          </div>
        </div>
    );
}

export default Layout