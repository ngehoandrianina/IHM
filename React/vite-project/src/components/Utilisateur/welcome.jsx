import React from 'react'
import {FiSearch, FiSettings, FiLayout, FiFileText} from 'react-icons/fi';
const welcome = () => {
  return (
        <div className="w-full flex flex-col ">
            {/* title */}
            <div className='w-full flex flex-col items-center gap-2 h-[250px]' style={{background: `url('/assets/bg-materiel.jpg')`}}>
                <h1 className='text-gray-800 text-center font-semibold'>IT Inventory and Maintien</h1>
                
                <div className="relative w-[450px]">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-evetns-none">
                        <FiSearch className='text-gray-400'/>
                    </div>
                    <input 
                        type="text"
                        name=""
                        id="" 
                        className='w-full block pl-10 pr-3 py-3 border border-gray-300 rounded-lg
                        bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        placeholder='Search'
                    />
                </div>
            </div>
            
            {/* card */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 mt-auto">
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                        <div className="p-3 bg-blue-100 rounded-full mr-4">
                            <FiSettings className='text-blue-600 text-xl'/>
                        </div>
                        <h2 className='text-xl font-semibold text-gray-800'>General</h2>
                    </div>
                    <p className='text-gray-60'>
                            We offer a range of training package in a range of subject areas
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                        <div className="p-3 bg-blue-100 rounded-full mr-4">
                            <FiLayout className='text-blue-600 text-xl'/>
                        </div>
                        <h3 className='text-xl font-semibold text-gray-800'>Materiels</h3>
                    </div>
                    <p className='text-gray-60'>
                            We offer a range of training package in a range of subject areas
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                        <div className="p-3 bg-blue-100 rounded-full mr-4">
                            <FiLayout className='text-blue-600 text-xl'/>
                        </div>
                        <h3 className='text-xl font-semibold text-gray-800'>Maintien</h3>
                    </div>
                    <p className='text-gray-60'>
                            We offer a range of training package in a range of subject areas
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                        <div className="p-3 bg-blue-100 rounded-full mr-4">
                            <FiFileText className='text-blue-600 text-xl'/>
                        </div>
                        <h3 className='text-xl font-semibold text-gray-800'>About</h3>
                    </div>
                    <p className='text-gray-60'>
                            We offer a range of training package in a range of subject areas
                    </p>
                </div>
            </div>
        </div>

  )
}

export default welcome