import { useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";



export default function Booking() {

    const flightId = useSelector((store: RootState) => store?.flightSlice?.selectedFlight);
    const user = useSelector((store: RootState) => store.userSlice.user);

    const [noOfSeats, setNoOfSeats] = useState(1);
    
    function submitHandler(event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log({
            flightId,
            userId:user.id,
            noOfSeats
        });
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