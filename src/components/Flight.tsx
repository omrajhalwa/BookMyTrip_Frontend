
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
        <div className="bg-slate-200 min-h-screen w-full">
            <NavBar />
            <div className="flex flex-col lg:flex-row w-full lg:px-40 md:px-40">
                <div className="w-full h-full flex-col">
                    {/* Header Section */}
                    <div className="bg-white flex p-2 justify-between lg:justify-between ml-4 text-sm border-gray-300 border-2 lg:text-xl">
                        <div className="text-red-700">AIR-CODE</div>
                        <div className="text-red-700">DEPART</div>
                        <div className="text-red-700">ARRIVE</div>
                        <div className="text-red-700">PRICE</div>
                        <div className="text-red-700">AvailSeats</div>
                        <div>
                            <button className="text-white px-4 rounded-md ml-2 disabled"></button>
                        </div>
                    </div>

                    {/* Flight Details Section */}
                    <div className="p-2 h-screen overflow-y-auto">
                        {curFlightDetails.map((flight) => (
                            <div className="bg-white m-2 flex  lg:flex-row p-4 justify-between items-center rounded-md">
                                {/* Flight Number and Airplane ID */}
                                <div className="text-slate-600 text-center lg:text-left">
                                    <div className="text-sm md:text-md lg:text-2xl">{flight.flightNumber}</div>
                                    <div className="font-thin text-sm">Id-{flight.airplaneId}</div>
                                </div>

                                {/* Departure Time and Airport */}
                                <div className="font-bold text-center lg:text-left py-2">
                                    <div className=" text-sm md:text-md lg:text-2xl">{dateInNormalFormat(flight.departureTime)}</div>
                                    <div className="text-sm md:text-md font-normal">{flight.departureAirportId}</div>
                                </div>

                                {/* Separator (:) */}
                                <div className="font-bold py-2 hidden lg:block">:</div>

                                {/* Arrival Time and Airport */}
                                <div className="font-bold text-center lg:text-left py-2">
                                    <div className=" text-sm md:text-md lg:text-2xl">{dateInNormalFormat(flight.arrivalTime)}</div>
                                    <div className="text-sm md:text-md  font-normal">{flight.arrivalAirportId}</div>
                                </div>

                                {/* Price */}
                                <div className="font-bold text-center lg:text-left text-sm md:text-md lg:text-xl py-2">
                                    {"\u20B9"}{flight.price}
                                </div>

                                {/* Available Seats */}
                                <div className="text-green-500 text-center lg:text-left py-2 text-sm md:text-md lg:text-lg">
                                    {flight.totalSeats}
                                </div>

                                {/* Book Button */}
                                <div className="py-2">
                                    <button
                                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => bookingHandler(flight.id, flight.price)}
                                        className="bg-orange-500 md:px-4 md:py-2 px-2 py-1 lg:px-6 lg:py-2 rounded-md text-md text-white text-sm md:text-md lg:text-lg"

                                    >
                                        Book
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}