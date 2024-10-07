import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ImAirplane } from "react-icons/im";

export default function NavBar() {

    const navigate = useNavigate();
    return (
        <div className='w-full h-16 p-2 bg-gray-950 flex sticky top-0 z-40'>
            <div className='text-blue-700 font-bold p-2 text-lg flex items-center'><ImAirplane /><div className='m-2'>BookMyTrip</div> </div>
            <div className='ml-auto flex'>
                <div onClick={(e) => navigate('/login')} className='text-blue-700 font-semibold p-2 text-md mx-1'>Login</div>
                <div className='text-blue-700 font-semibold p-2 text-md mx-1 '>Signup</div>
                <div className='text-blue-700 font-semibold p-2 text-md mx-1'>Logout</div>
            </div>
        </div>
    )
}
