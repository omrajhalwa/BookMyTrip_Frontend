
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store";
import NavBar from "./NavBar";
import { setSelectedFlight } from '../redux/flightSlice'
import { useNavigate } from "react-router-dom";



export default function Flight() {

    const { curFlightDetails } = useSelector((store: RootState) => store.flightSlice);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function dateInNormalFormat(getdata: string) {
        return new Date(getdata).toLocaleTimeString('en-US', { hour12: false });
    }

    function bookingHandler(flightId: string, flightPrice: Number) {
        console.log(flightPrice);
        dispatch(setSelectedFlight(flightId));
        navigate('/bookings');
    }
    return (
        <div className="bg-slate-200  h-full w-full ">
            <NavBar />
            <div className="flex h-full sticky top-0  w-[100%] px-40">

                <div className="w-full h-full  flex-col ">

                    <div className="bg-white  flex p-2 justify-evenly text-sm border-gray-300 border-2  ">
                        <div className="text-red-700">

                            AIR-CODE

                        </div>
                        <div className="text-red-700">
                            DEPART
                        </div>

                        <div className="text-red-700">
                            ARRIVE
                        </div>

                        <div className="text-red-700">
                            PRICE
                        </div>

                        <div className="text-red-700">
                            AvailSeats
                        </div>

                        <div>
                            <button className="text-white  px-4 rounded-md ml-2 disabled"></button>
                        </div>

                    </div>

                    


                        <div className=" p-2 h-screen overflow-y-auto">
                            {
                                curFlightDetails.map((flight) => (
                                    <div className="bg-white m-2 flex p-2 justify-evenly rounded-md ">
                                        <div className="text-slate-600 justify-center">
                                            <div className="text-sm">
                                                {flight.flightNumber}
                                            </div>
                                            <div className="font-thin text-sm px-3">
                                                Id-{flight.airplaneId}
                                            </div>

                                        </div>
                                        <div className="font-bold text-lg py-2">
                                           <div> {dateInNormalFormat(flight.departureTime)}</div>
                                           <div className="text-sm font-normal px-4" >{flight.departureAirportId}</div>
                                        </div>

                                        <div className="font-bold py-3">:</div>

                                        <div className="font-bold text-lg py-2">
                                            <div>{dateInNormalFormat(flight.arrivalTime)}</div>
                                            <div className="text-sm font-normal px-4">{flight.arrivalAirportId}</div>
                                        </div>

                                        <div className="font-bold text-md py-2">
                                            {"\u20B9"}{flight.price}
                                        </div>

                                        <div className="text-green-500 py-2">
                                            {flight.totalSeats}
                                        </div>

                                        <div className="py-2">
                                            <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => bookingHandler(flight.id, flight.price)} className="bg-orange-500  px-4 rounded-md  py-1 text-md">Book</button>
                                        </div>
                                    </div>

                                ))
                            }

                        </div>
                    


                </div>
            </div>
        </div>
    )
}