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



                    <div className="flex justify-center bg-gray-300 w-full h-screen px-4 sm:px-6">
                        <div className="bg-white px-6 sm:px-12 md:px-16 lg:px-32 py-6 h-[70%] md:h-[90%] lg:h-[80%] rounded-lg mt-10 w-full max-w-lg lg:max-w-3xl">
                            <div className="font-bold text-2xl sm:text-3xl lg:text-4xl items-center mx-auto flex justify-center">
                                <p>Successfully Booked Ticket</p>
                            </div>

                            <div className="mt-4 px-4 sm:px-8 lg:px-16">
                                <div className="font-bold border-2 border-black p-2 sm:p-3 flex">
                                    <div>Booking Status - </div>
                                    <p className="text-green-600 ml-2">Booked</p>
                                </div>
                                <div className="font-bold border-2 border-black p-2 sm:p-3">
                                    Transaction Id - {bookingTransaction.id}
                                </div>
                                <div className="font-bold border-2 border-black p-2 sm:p-3">
                                    Flight Id - {bookingTransaction.flightId}
                                </div>
                                <div className="font-bold border-2 border-black p-2 sm:p-3">
                                    User Id - {bookingTransaction.userId}
                                </div>
                                <div className="font-bold border-2 border-black p-2 sm:p-3">
                                    Total Cost - {bookingTransaction.totalCost}
                                </div>

                                <div className="p-4 flex justify-center">
                                    <button
                                        onClick={(e) => navigate('/')}
                                        className="bg-blue-800 font-bold text-sm sm:text-md lg:text-lg px-4 sm:px-6 py-2 text-white rounded-md"
                                    >
                                        Home
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                )
            }
        </>
    )
}