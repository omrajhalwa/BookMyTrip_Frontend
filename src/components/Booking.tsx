import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { RootState } from "../redux/store";
import axios from 'axios';
import { setBookingTransaction } from '../redux/userSlice';
import BookingLoading from './BookingLoading'



export default function Booking() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const flightId = useSelector((store: RootState) => store.flightSlice?.selectedFlight);
    const user = useSelector((store: RootState) => store.userSlice?.user);
    const noOfSeats = useSelector((store: RootState) => store.flightSlice.noOfSeats);



    useEffect(() => {
        if (!user.email) {
            navigate('/login');
        }

        async function booking() {

            try {

                const response = await axios.post('http://localhost:3001/bookingService/api/v1/bookings/', {
                    flightId,
                    userId: user.id,
                    noOfSeats
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });

               // console.log(response);
                dispatch(setBookingTransaction(response.data.data));
                navigate('/payment');
            } catch (error) {
                console.log(error);
            }
        }

        booking();
    }, []);







    return (
        <div>
           <BookingLoading/>
        </div>
    )
}