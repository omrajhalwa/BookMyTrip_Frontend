import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ImAirplane } from "react-icons/im";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setFirebase, setUser } from '../redux/userSlice';
import { RootState } from "../redux/store";
import { getAuth, signOut } from "firebase/auth";
import { BACKEND_URL } from '../utils/constant';
export default function NavBar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { firebase } = useSelector((store: RootState) => store.userSlice);
    const auth = getAuth();
    async function logoutHandler() {
        async function jwtLogout() {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/user/signout`);
              

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

        if (firebase) {
            signOutGoogle();
        } else {
            jwtLogout();
        }

    }


    return (
        <div className="w-full h-16 p-2 lg:py-4 bg-gray-950 flex sticky top-0 z-40">
            {/* Logo */}
            <div className="text-blue-700 font-bold p-2 text-lg lg:text-2xl  flex items-center">
                <ImAirplane className="mr-2" />
                <div>BookMyTrip</div>
            </div>

            {/* Navigation Links */}
            <div className="ml-auto flex items-center">
                <div
                    onClick={(e) => navigate('/login')}
                    className="text-blue-700 font-semibold p-2 text-md mx-1 cursor-pointer hover:text-blue-500 transition duration-200 ease-in-out"
                >
                    Login
                </div>
                <div
                    onClick={logoutHandler}
                    className="text-blue-700 font-semibold p-2 text-md mx-1 cursor-pointer hover:text-blue-500 transition duration-200 ease-in-out"
                >
                    Logout
                </div>
            </div>
        </div>

    )
}
