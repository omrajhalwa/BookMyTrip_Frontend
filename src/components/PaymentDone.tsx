import { useEffect, useState } from "react";
import { RootState } from "../redux/store"
import PaymentLoading from './PaymentLoading'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";




export default function PaymentDone() {

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { bookingTransaction } = useSelector((store: RootState) => store.userSlice);


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 5000)
    }, []);


    return (
        <>

            {
                isLoading ? (<PaymentLoading />) : (



                    <div className="flex justify-center bg-gray-300 w-full h-screen px-6">


                        <div className="bg-white px-32 py-6 h-[70%] rounded-lg mt-10">

                            <div className="font-bold text-4xl items-center mx-auto mt-2 flex justify-center">
                                <p>SuccessFully Booked The Ticket</p>
                            </div>

                            <div className="mt-4 px-16">

                                <div className="font-bold border-2 border-black p-1 flex ">
                                    <div>Booking Status - </div><p className="text-green-600">  Booked</p>
                                </div>
                                <div className="font-bold border-2 border-black p-1">
                                    Transaction Id   - {bookingTransaction.id}
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

                                <div className="p-4 flex justify-center">
                                    <button onClick={(e) => navigate('/')} className="bg-blue-800 font-bold px-4 py-2 text-white rounded-md">Home</button>
                                </div>

                            </div>
                        </div>
                    </div>

                )
            }
        </>
    )
}