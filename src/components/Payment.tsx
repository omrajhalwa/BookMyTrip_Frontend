
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import BookingLoading from './BookingLoading'
import NavBar from "./NavBar";










export default function Payment() {

    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 5000)
    }, [])

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

        <><NavBar/>
            {
                isLoading ? (<BookingLoading />) : (

                    <div className="flex justify-center">


                        <div className="">

                            <div className="font-bold text-4xl">
                                payment
                            </div>

                            <div>
                                <form onSubmit={submitHandler}>
                                    <div>
                                        Booking Status - {bookingTransaction.status}
                                    </div>
                                    <div>
                                        Booking Id   - {bookingTransaction.id}
                                    </div>
                                    <div>
                                        flightId -{bookingTransaction.flightId}
                                    </div>
                                    <div>
                                        userId - {bookingTransaction.userId}
                                    </div>

                                    <div>
                                        totalCost - {bookingTransaction.totalCost}
                                    </div>

                                    <div>
                                        <button className="bg-blue-500 px-6 py-1 text-white rounded-md">pay</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        </>

    )
}