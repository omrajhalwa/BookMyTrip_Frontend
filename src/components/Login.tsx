// React
import { motion } from "framer-motion"



import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';





export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/v1/user/signin', {
                email,
                password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })

            console.log(response.data);
            dispatch(setUser(response.data));
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div  className='flex justify-center w-full h-screen  flex-col bg-blue-400'>
            
            <form onSubmit={submitHandler}>
                <div  className='p-80'>

                {/* <motion.div animate={{ x: 100 }} /> */}
                    <div className='text-4xl font-bold p-10'>
                        Login
                    </div>

                    <div className='border-2 border-slate-400 m-2 rounded-md'>
                        <input type="text"
                            placeholder="   email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='border-2 border-slate-500 w-full'
                        />
                    </div>

                    <div className='border-2 border-slate-400 m-2 rounded-md'>
                        <input type="password"
                            placeholder="   password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='border-2 border-slate-500 w-full'
                        />
                    </div>
                    <div className='flex justify-center'>
                        <button className='px-4 py-2 bg-blue-600 rounded-md'>Login</button>
                    </div>

                </div>
            </form>
        </div>
    )
}