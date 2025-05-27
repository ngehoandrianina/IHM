import React from 'react'
import authService from '../Service/authService'
import { useNavigate } from 'react-router-dom'
const ModalUser = ({show,setShow}) => {
    const navigate = useNavigate()
    const LogOut = () =>{
        authService.logout()
        navigate("/login")
    }
  return (
 <>
 {
    show && 
    <div className='bg-[#1b1b026a]  rounded px-2 py-4 absolute top-15 right-10 z-50'>
        <button onClick={()=>LogOut()} className='flex bg-white p-2 rounded-2xl font-thin hover:scale-95 '><img src='/icone/logout.png' className='w-6' />Se deconnecter</button>
    </div>
 }
 </>
 )
}

export default ModalUser