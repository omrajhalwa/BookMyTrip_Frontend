import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { RootState } from "../redux/store";
import axios from 'axios';
import { setBookingTransaction } from '../redux/userSlice';



export default function Booking() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const flightId = useSelector((store: RootState) => store.flightSlice?.selectedFlight);
    const user = useSelector((store: RootState) => store.userSlice?.user);


    const [noOfSeats, setNoOfSeats] = useState(1);


    useEffect(() => {
        if (!user.id) {
            navigate('/login');
        }
    }, [])


    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // console.log({
        //     flightId,
        //     userId: user.id,
        //     noOfSeats
        // });

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

            console.log(response);
            dispatch(setBookingTransaction(response.data.data));
            navigate('/payment');
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='flex p-50 justify-center '>
            <div className='flex-col p-10'>
                <div className='py-10'>
                    booking page
                </div>
                <form onSubmit={submitHandler}>
                    <div className='border-2 border-gray-500 m-4'>
                        <input type="number"
                            placeholder="no of seats"
                            name='noOfSeats'
                            value={noOfSeats}
                            onChange={(event) => setNoOfSeats(+event.target.value)}
                        />
                    </div>
                    <div>
                        <button className='bg-blue-600 rounded-md px-4 py-2'>Book Flight</button>
                    </div>
                </form>
            </div>
        </div>
    )
}