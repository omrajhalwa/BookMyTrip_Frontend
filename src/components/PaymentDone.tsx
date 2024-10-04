import { useEffect, useState } from "react";

import PaymentLoading from './PaymentLoading'
import { useNavigate } from "react-router-dom";




export default function PaymentDone() {

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 5000)
    }, []);


    return (
        <>

            {
                isLoading ? (<PaymentLoading />) : (
                    <div className="flex-col justify-center mt-auto">
                        <div className="text-4xl font-bold">
                            Successfully booked a ticket
                        </div>
                        <div className="p-4">
                            <button onClick={(e) => navigate('/')} className="bg-blue-800 font-bold px-4 py-2 text-white rounded-md">Home</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}