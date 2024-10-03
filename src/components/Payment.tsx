import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import axios from "axios";
import { useNavigate } from "react-router-dom";












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
                    "x-idempotency-key": "1345145"
                }
                ,
                withCredentials: true
            })

            console.log(response);

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
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