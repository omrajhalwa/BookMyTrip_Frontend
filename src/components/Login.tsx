// React


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


import { getAuth,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect } from "react";
import { motion } from "framer-motion"
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFirebase, setUser } from '../redux/userSlice';
import { FcGoogle } from "react-icons/fc";
import { RootState } from "../redux/store";





export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(true);
    const {firebase} = useSelector((store :RootState) => store.userSlice);
   

    const provider = new GoogleAuthProvider();




// Initialize Firebase
const firebaseConfig : string = process.env.REACT_APP_FIREBASE_CONFIG ? process.env.REACT_APP_FIREBASE_CONFIG : '';
     
const app = initializeApp(JSON.parse(firebaseConfig));
const analytics = getAnalytics(app);
const auth = getAuth();





    function signInWithGoogle() {

        signInWithPopup(auth,provider).then(async (result) => {
            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
        
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)

            const idToken = await result.user.getIdToken(true);
            //setup firebase token in cookie
            document.cookie=`firebase_token=${idToken};Secure;SameSite=Strict;Path=/`;
            // firebase id of user
            const uid = (+user.providerData[0].uid % 1e9);

            dispatch(setUser({email:user.providerData[0].email,id:uid}));
            dispatch(setFirebase(!firebase));
            navigate('/');
        }).catch((error) => {
        
             // Handle Errors here.
             const errorCode = error.code;
             const errorMessage = error.message;
             // The email of the user's account used.
             const email = error.customData.email;
             // The AuthCredential type that was used.
             const credential = GoogleAuthProvider.credentialFromError(error);
        })
        
        }
    
    




   


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

                    <div className="py-2">
                        <div className="text-white flex px-8 text-sm py-2"><div> {login ? "Don't" : "Already,"} have an account ?  </div><div className="text-blue-700 px-2" onClick={() => setLogin(!login)}>{login ? " SignUp" : " Login"}</div></div>
                    </div>
                   <div className="flex justify-center py-4"><div className="bg-white p-2 flex justify-center w-[60%] rounded-lg" onClick={signInWithGoogle}><FcGoogle className="text-2xl mr-2" /> <div>Google</div></div></div> 
                </div>
            </form>

            
        </div>
    )
}