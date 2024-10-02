
import { useSelector } from "react-redux"
import { RootState } from "../redux/store";
import NavBar from "./NavBar";




export default function Flight() {

    const { curFlightDetails } = useSelector((store: RootState) => store.flightSlice);

    function dateInNormalFormat(getdata: string) {

        return new Date(getdata).toLocaleTimeString('en-US', { hour12: false });
    }
    return (
        <div>
            <NavBar />

            <div className="w-full h-100 p-3 bg-blue-200">

                <div className="bg-white m-2 flex p-2 justify-evenly text-sm">
                    <div>

                        AIR-CODE

                    </div>
                    <div>
                        DEPART
                    </div>

                    <div>
                        ARRIVE
                    </div>

                    <div>
                        PRICE
                    </div>

                    <div>
                        AvailSeats
                    </div>

                    <div>
                        <button className="text-white  px-4 rounded-md ml-6 disabled">Book</button>
                    </div>

                </div>
                {
                    curFlightDetails.map((flight) => (
                        <div className="bg-white m-2 flex p-2 justify-evenly">
                            <div className="text-slate-600 justify-center">
                                <div className="text-sm">
                                    {flight.flightNumber}
                                </div>
                                <div className="font-thin text-sm px-3">
                                    {flight.airplaneId}
                                </div>

                            </div>
                            <div className="font-bold text-lg">
                                {dateInNormalFormat(flight.departureTime)}
                            </div>

                            <div className="font-bold text-lg">
                                {dateInNormalFormat(flight.arrivalTime)}
                            </div>

                            <div>
                                {"\u20B9"}{flight.price}
                            </div>

                            <div className="text-green-500">
                                {flight.totalSeats}
                            </div>

                            <div>
                                <button className="bg-orange-500  px-4 rounded-md ml-6">Book</button>
                            </div>
                        </div>

                    ))
                }


            </div>
        </div>
    )
}