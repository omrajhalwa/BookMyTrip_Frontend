
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import BookingLoading from './BookingLoading'
import NavBar from "./NavBar";










export default function Payment() {


    const { bookingTransaction } = useSelector((store: RootState) => store.userSlice);
    const navigate = useNavigate();


    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/bookingService/api/v1/bookings/payments', {
                bookingId: bookingTransaction.id,
                userId: bookingTransaction.userId,
                totalCost: bookingTransaction.totalCost
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "x-idempotency-key": `${bookingTransaction.id}`
                }
                ,
                withCredentials: true
            })

            console.log(response.data);

            if (response.data.success) {
                navigate('/payment/transaction');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className="h-screen w-full overflow-hidden">
            <NavBar/>
            {
                 (

                    <div className="flex justify-center bg-gray-300 w-full h-full px-6">


                        <div className="bg-white px-32 py-6 h-[70%] rounded-lg mt-10">

                            <div className="font-bold text-4xl items-center mx-auto mt-2 flex justify-center">
                                <p>Payment</p>
                            </div>

                            <div className="mt-4">
                                <form onSubmit={submitHandler}>
                                    <div className="font-bold border-2 border-black p-1">
                                        Booking Status - {bookingTransaction.status}
                                    </div>
                                    <div className="font-bold border-2 border-black p-1">
                                        Booking Id   - {bookingTransaction.id}
                                    </div>
                                    <div className="font-bold border-2 border-black p-1">
                                        FlightId - {bookingTransaction.flightId}
                                    </div>
                                    <div className="font-bold border-2 border-black p-1">
                                        UserId - {bookingTransaction.userId}
                                    </div>

                                    <div className="font-bold border-2 border-black p-1">
                                        TotalCost - {bookingTransaction.totalCost}
                                    </div>

                                    <div className="flex justify-center mt-4">
                                        <button className="bg-blue-500 px-6 py-1 text-white rounded-md">Make payment</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>

    )
}