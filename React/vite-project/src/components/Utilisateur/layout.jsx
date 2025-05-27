import { Outlet, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoHome } from "react-icons/go";
import { IoHelpCircleOutline as Help } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { CgEditUnmask } from "react-icons/cg";
import authService from "../../Service/authService";
import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import { RiToolsLine } from 'react-icons/ri';
import './layout.css';

function Layout() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    const [panne, setPanne] = useState([]);

    const deconnect = () => {
        authService.logout();
        navigate('/login');
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/materielle/signalement-panne')
            .then((res) => {
                if (res.data) {
                    setPanne(res.data.filter(item => item.etat === 'Non traité'));
                } else {
                    setPanne([]);
                }
            })
            .catch((err) => {
                console.log(err);
                setPanne([]);
            });
    }, []);

    const showNavigation = () => {
        setNavOpen(!navOpen);
    };

    return (
        <div>
            <ToastContainer />
            <div className="relative h-16 flex justify-between bg-base-100 px-2 shadow-md">
                <div className="nav-title flex items-center justify-center gap-2">
                    <RiToolsLine className="text-2xl text-orange-300 font-bold" />
                    <h1 className="text-xl font-semibold">Technicien</h1>
                </div>

                <div className="flex items-center">
                    <button className={navOpen ? "humberger open" : "humberger"} aria-label="toggle navigation" aria-expanded={navOpen}
                        type="button"
                        onClick={showNavigation}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <div className={navOpen ? "navlinks-container open" : "navlinks-container"}>
                        <NavLink to='/user/home' onClick={() => setNavOpen(false)}
                            className={({ isActive }) => `${isActive ? 'w-full flex gap-1 mr-4 px-2 py-1 shadow-sm rounded-md' : 'w-full flex gap-1 mr-4 rounded-sm px-2 py-1 hover:bg-gray-100'}`}>
                            <GoHome className="text-xl" />
                            <span>Home</span>
                        </NavLink>
                        <NavLink to='/user/materiel' onClick={() => setNavOpen(false)}
                            className={({ isActive }) => `${isActive ? 'w-full flex gap-1 mr-4 px-2 py-1 shadow-sm rounded-md' : 'w-full flex gap-1 mr-4 rounded-sm px-2 py-1 hover:bg-gray-100'}`}>
                            <CgEditUnmask className="text-xl" />
                            <span>Matériels</span>
                        </NavLink>
                        <NavLink to='/user/maintenance' onClick={() => setNavOpen(false)}
                            className={({ isActive }) => `${isActive ? 'w-full flex gap-1 mr-4 px-2 py-1 shadow-sm rounded-md' : 'w-full flex gap-1 mr-4 rounded-sm px-2 py-1 hover:bg-gray-100'}`}>
                            <CgEditUnmask className="text-xl" />
                            <span>Maintenance</span>
                        </NavLink>
                        <NavLink to='/user/apropos' onClick={() => setNavOpen(false)}
                            className={({ isActive }) => `${isActive ? 'w-full flex gap-1 mr-4 px-2 py-1 shadow-sm rounded-md' : 'w-full flex gap-1 mr-4 rounded-sm px-2 py-1 hover:bg-gray-100'}`}>
                            <Help className="text-xl" />
                            <span>A propos</span>
                        </NavLink>
                    </div>
                </div>

                <div className="user-icon flex items-center">
                    <div className="p-3 bg-blue-100 rounded-full">
                        <FiUser className='text-blue-600 text-xl cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
                    </div>
                </div>

                {isOpen && (
                    <div className="absolute w-40 top-16 right-2 bg-white rounded-b-2xl py-2 shadow-md z-50">
                        <h3 className="text-gray-500 text-center">User 01</h3>
                        <button onClick={deconnect} className="flex items-center justify-center w-full border p-2 mt-2 rounded cursor-pointer">
                            Se déconnecter <CiLogout className="text-xl text-red-500 ml-2" />
                        </button>
                    </div>
                )}
            </div>

            <div className="w-full p-5">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
