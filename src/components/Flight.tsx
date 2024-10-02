
import { useSelector } from "react-redux"
import { RootState } from "../redux/store";
import NavBar from "./NavBar";




export default function Flight() {

    const { curFlightDetails } = useSelector((store: RootState) => store.flightSlice);

    function dateInNormalFormat(getdata: string) {

        return new Date(getdata).toLocaleTimeString('en-US', { hour12: false });
    }
    return (
        <div className="bg-slate-400">
            <NavBar />
            <div className="flex">


                <div className="w-[30%] bg-white p-4">
                    <div>
                       filter section
                    </div>
                </div>

                <div className="w-full h-screen  bg-blue-200 flex-col">

                    <div className="bg-white  flex p-2 justify-evenly text-sm border-gray-300 border-2">
                        <div className="">

                            AIR-CODE

                        </div>
                        <div>
                            DEPART
                        </div>

                        <div className="ml-4">
                            ARRIVE
                        </div>

                        <div className="ml-4">
                            PRICE
                        </div>

                        <div className="ml-4">
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
                                        Id-{flight.airplaneId}
                                    </div>

                                </div>
                                <div className="font-bold text-lg py-2">
                                    {dateInNormalFormat(flight.departureTime)}
                                </div>

                                <div className="font-bold text-lg py-2">
                                    {dateInNormalFormat(flight.arrivalTime)}
                                </div>

                                <div className="font-bold text-md py-2">
                                    {"\u20B9"}{flight.price}
                                </div>

                                <div className="text-green-500 py-2">
                                    {flight.totalSeats}
                                </div>

                                <div className="py-2">
                                    <button className="bg-orange-500  px-4 rounded-md  py-1 text-md">Book</button>
                                </div>
                            </div>

                        ))
                    }


                </div>
            </div>
        </div>
    )
}