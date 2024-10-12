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
import { BACKEND_URL } from "../utils/constant";





export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('omraj72470@gmail.com');
    const [password, setPassword] = useState<string>('12345');
    const [login, setLogin] = useState<boolean>(true);
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
            //document.cookie = `firebase_token=${idToken}; Secure; HttpOnly; SameSite=None; Path=/`;

            try{
              const response = await axios.post(`${BACKEND_URL}/api/v1/user/firebase-signin`,{
                token:idToken
              },{
                headers:{
                  'Content-Type':'application/json'
                },
                withCredentials:true
              });
              console.log(response);
            }catch(error){
              console.log(error);
            }

            // firebase id of user
            const uid : number = (+user.providerData[0].uid % 1e9);

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
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${login ? "signin" : "signup"}`, {
                email,
                password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            console.log(response);
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

        <div className="flex justify-center items-center w-full min-h-screen bg-black py-10 px-2">
        <form onSubmit={submitHandler} className="w-full flex justify-center">
          <div className="bg-slate-950 border-white border-2 rounded-lg w-full max-w-md p-8 sm:w-[70%] md:w-[40%] lg:w-[28%]">
      
            {/* Title */}
            <div className="text-3xl sm:text-4xl text-blue-700 font-bold my-6 flex justify-center">
              {login ? "Log In" : "Sign Up"}
            </div>
      
            {/* Email Input */}
            <div className="flex justify-center">
              <div className="w-full sm:w-[80%]">
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
      
            {/* Password Input */}
            <div className="flex justify-center mt-4">
              <div className="w-full sm:w-[80%]">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
      
            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-700 rounded-md text-white hover:bg-blue-800 transition-all duration-200 ease-in-out"
              >
                {login ? "Log In" : "Sign Up"}
              </button>
            </div>
      
            {/* Toggle Between Log In / Sign Up */}
            <div className="text-white text-center py-4">
              <span>{login ? "Don't" : "Already,"} have an account?</span>
              <span
                className="text-blue-700 ml-2 cursor-pointer"
                onClick={() => setLogin(!login)}
              >
                {login ? " Sign Up" : " Log In"}
              </span>
            </div>
      
            {/* Google Sign In */}
            <div className="flex justify-center mt-4">
              <div
                className="bg-white text-black p-3 flex items-center justify-center w-full sm:w-[80%] rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200 ease-in-out"
                onClick={signInWithGoogle}
              >
                <FcGoogle className="text-2xl mr-2" />
                <span>Google</span>
              </div>
            </div>
      
          </div>
        </form>
      </div>
      
    )
}