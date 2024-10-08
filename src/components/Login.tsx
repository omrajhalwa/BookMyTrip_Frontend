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
    const [login, setLogin] = useState(true);


    async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3001/api/v1/user/${login ? "signin" : "signup"}`, {
                email,
                password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            
            if(login){
            console.log(response.data);
            dispatch(setUser(response.data));
            navigate('/');
            }else{
                setLogin(!login);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className='flex justify-center w-full h-screen  bg-black  py-10'>

            <form onSubmit={submitHandler} className="w-full flex justify-center">
                <div className=' bg-slate-950 border-white border-2  justify-center rounded-lg w-[28%]'>

                    {/* <motion.div animate={{ x: 100 }} /> */}
                    <div className='text-4xl text-blue-700 font-bold my-10 flex justify-center'>
                        <div>{login ? "Log In" : "Sign Up"}</div>
                    </div>

                    <div className="flex justify-center ">
                        <div className=' m-2 rounded-lg w-[60%]'>
                            <input type="text"
                                placeholder="   email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className=' w-full rounded-lg'
                            />
                        </div>
                    </div>

                    <div className="flex justify-center mt-2">
                        <div className=' m-2 rounded-md w-[60%]'>
                            <input type="password"
                                placeholder="   password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className=' w-full rounded-lg'
                            />
                        </div>
                    </div>

                    <div className='flex justify-center mt-2'>
                        <button className='px-4 py-2 bg-blue-700 rounded-md text-white'>{login ? "Log in" : "Sign Up"}</button>
                    </div>

                    <div>
                        <div className="text-white flex px-8 text-sm py-2"><div> {login ? "Don't" : "Already,"} have an account ?  </div><div className="text-blue-700 px-2" onClick={() => setLogin(!login)}>{login ? " SignUp" : " Login"}</div></div>
                    </div>

                </div>
            </form>
        </div>
    )
}