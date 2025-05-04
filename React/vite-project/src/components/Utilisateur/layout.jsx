import { Outlet, Link ,NavLink} from "react-router-dom";
import {BsSearch} from "react-icons/bs"
import {GoHome} from "react-icons/go"
import {IoHelpCircleOutline as Help} from "react-icons/io5"
import {CiLogout} from "react-icons/ci"
import {CgEditUnmask} from "react-icons/cg"


function Layout(){
    return(
        <div className="flex">
          <div className="h-screen w-60 bg-base-100 shadow-sm">
            {/* Title */}
              <div className="mt-5">
                <h1 className="text-2xl text-center text-bold">
                  Utilisateur
                </h1>
              </div>

            {/* search */}
              <div className="flex gap-2 items-center rounded-md bg-gray-100 mt-5 px-2 py-1 ml-2 mr-2">
                <BsSearch className="text-gray-500 block float left cursor-pointer"/>
                <input type="search" placeholder="search" className="text-base bg-transparent w-full focus:outline-none"/>
              </div>

            {/* list tabs */}
              <ul className="w-full flex flex-col gap-2 mt-4">
                  <li className="flex items-center gap-1 ml-2 text-gray-700 rounded-md px-2 py-1 hover:bg-gray-300">
                    <GoHome className="text-xl"/>
                    <NavLink to='/user'>Home</NavLink>
                  </li>
                  <li className="flex items-center gap-1 ml-2 text-gray-700 rounded-md px-2 py-1 hover:bg-gray-300">
                    <CgEditUnmask />
                    <NavLink to='/user/materiel'>Materiels</NavLink>
                  </li>
                  <li className="flex items-center gap-1 ml-2 text-gray-700 rounded-md px-2 py-1 hover:bg-gray-300">
                    <Help />
                    <NavLink to='/user/apropos'>Apropos</NavLink>
                  </li>
              </ul>
            {/* logout */}
              <button className="flex items-center gap-1 ml-3 text-gray-700 mt-50">
                  <CiLogout className="text-xl text-red-500"/>
                  <span>Logout</span>
              </button>
          </div>

          <div className="w-full py-5 px-5">
            <Outlet/>
          </div>
        </div>
    );
}

export default Layout