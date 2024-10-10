import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ImAirplane } from "react-icons/im";
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { setFirebase, setUser } from '../redux/userSlice';
import { RootState } from "../redux/store";
import { getAuth, signOut } from "firebase/auth";
export default function NavBar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {firebase} = useSelector((store :RootState) => store.userSlice);
    const auth = getAuth();
    async function logoutHandler() {
        async function jwtLogout(){
            try {
                const response = await axios.get('http://localhost:3001/api/v1/user/signout');
                console.log(response);

                dispatch(setUser({}));
                navigate('/login');

            } catch (error) {
                console.log(error);
            }
        }

        function signOutGoogle() {
            signOut(auth).then(() => {
                // Sign-out successful.
                dispatch(setFirebase(!firebase));
                dispatch(setUser({}));
                navigate('/login');
            }).catch((error) => {
                // An error happened.
            });
        }

        if(firebase){
            signOutGoogle();
        }else{
            jwtLogout();
        }
       
    }

   
    return (
        <div className='w-full h-16 p-2 bg-gray-950 flex sticky top-0 z-40'>
            <div className='text-blue-700 font-bold p-2 text-lg flex items-center'><ImAirplane /><div className='m-2'>BookMyTrip</div> </div>
            <div className='ml-auto flex'>
                <div onClick={(e) => navigate('/login')} className='text-blue-700 font-semibold p-2 text-md mx-1'>Login</div>
                <div onClick={logoutHandler} className='text-blue-700 font-semibold p-2 text-md mx-1'>Logout</div>
            </div>
        </div>
    )
}
