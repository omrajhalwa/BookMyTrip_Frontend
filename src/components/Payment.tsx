
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import BookingLoading from './BookingLoading'
import NavBar from "./NavBar";
import { BACKEND_URL } from "../utils/constant";










export default function Payment() {


    const { bookingTransaction } = useSelector((store: RootState) => store.userSlice);
    const navigate = useNavigate();


    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        try {
            const response = await axios.post(`${BACKEND_URL}/bookingService/api/v1/bookings/payments`, {
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

           console.log(response);

            if (response.data.success) {
                navigate('/payment/transaction');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className="h-screen w-full overflow-hidden">
            <NavBar />
            <div className="flex justify-center bg-gray-300 w-full h-full px-4 sm:px-6">
                <div className="bg-white px-6 sm:px-12 lg:px-32 py-6 h-auto sm:h-[70%] rounded-lg mt-10 w-full max-w-xl lg:max-w-3xl">
                    <div className="font-bold text-2xl sm:text-3xl lg:text-4xl items-center mx-auto flex justify-center">
                        <p>Payment</p>
                    </div>

                    <div className="mt-4">
                        <form onSubmit={submitHandler}>
                            <div className="font-bold border-2 border-black p-2 text-sm sm:text-md lg:text-lg">
                                Booking Status - {bookingTransaction.status}
                            </div>
                            <div className="font-bold border-2 border-black p-2 text-sm sm:text-md lg:text-lg">
                                Booking Id - {bookingTransaction.id}
                            </div>
                            <div className="font-bold border-2 border-black p-2 text-sm sm:text-md lg:text-lg">
                                Flight Id - {bookingTransaction.flightId}
                            </div>
                            <div className="font-bold border-2 border-black p-2 text-sm sm:text-md lg:text-lg">
                                User Id - {bookingTransaction.userId}
                            </div>
                            <div className="font-bold border-2 border-black p-2 text-sm sm:text-md lg:text-lg">
                                Total Cost - {bookingTransaction.totalCost}
                            </div>

                            <div className="flex justify-center mt-4">
                                <button className="bg-blue-500 px-4 sm:px-6 py-2 text-white rounded-md text-sm sm:text-md">
                                    Make Payment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    )
}