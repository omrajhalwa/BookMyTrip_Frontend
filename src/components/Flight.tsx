
import { useSelector } from "react-redux"
import { RootState } from "../redux/store";




export default function Flight() {

    const { curFlightDetails } = useSelector((store: RootState) => store.flightSlice);
    console.log(curFlightDetails);

    return (
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
                    <button className="text-white  px-4 rounded-md ml-6 disabled">Book</button>
                </div>

            </div>
            {
                curFlightDetails.map((flight) => (
                    <div className="bg-white m-2 flex p-2 justify-evenly">
                        <div>
                            <div>
                                {flight.flightNumber}
                            </div>
                            <div>
                                {flight.airplaneId}
                            </div>

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
                            <button className="bg-orange-500  px-4 rounded-md ml-6">Book</button>
                        </div>
                    </div>
                ))
            }


        </div>
    )
}