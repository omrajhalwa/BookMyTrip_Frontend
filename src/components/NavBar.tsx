import React from 'react'

export default function NavBar() {
    return (
        <div className='w-full h-12 bg-blue-600 flex sticky top-0 z-40'>
            <div className='text-white font-bold p-2 text-lg'>BookMyTrip</div>
            <div className='ml-auto flex'>
                <div className='text-white font-semibold p-2 text-md mx-1'>Login</div>
                <div className='text-white font-semibold p-2 text-md mx-1'>Signup</div>
                <div className='text-white font-semibold p-2 text-md mx-1'>Logout</div>
            </div>
        </div>
    )
}
