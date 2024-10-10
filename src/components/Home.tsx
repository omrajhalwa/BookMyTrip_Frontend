import { TbTransfer } from "react-icons/tb";
import { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFlightDetails, setNoOfSeats } from "../redux/flightSlice";
import Loading from "./Loading";
import NavBar from "./NavBar";
import { TextField } from "@mui/material";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useAirports from "../hooks/useAirports";
import { RootState } from "../redux/store";
import Footer from "./Footer";
export default function Home() {
    useAirports();
    const [isLoading, setIsLoading] = useState(true);
    const [flag, setFlag] = useState(true);
    let users = useSelector((store: RootState) => store.flightSlice.Airports);


    const [showRecommendations1, setShowRecommendations1] = useState(false);
    const searchBarRef1 = useRef<HTMLInputElement | null>(null);
    const recommendationsRef1 = useRef<HTMLInputElement | null>(null);

    const [showRecommendations2, setShowRecommendations2] = useState(false);
    const searchBarRef2 = useRef<HTMLInputElement | null>(null);
    const recommendationsRef2 = useRef<HTMLInputElement | null>(null);

    const [calendar, setCalender] = useState(false);
    const calendarRef1 = useRef<HTMLDivElement | null>(null);
    const calendarRef2 = useRef<HTMLDivElement | null>(null);

    const [seat, setSeat] = useState(false);
    const seatRef1 = useRef<HTMLDivElement | null>(null);
    const seatRef2 = useRef<HTMLDivElement | null>(null);

    // Show recommendations when the search bar is focused
    const handleFocus1 = () => {
        setShowRecommendations1(true);
    };
    const handleFocus2 = () => {
        setShowRecommendations2(true);
    };
    // Show calendar when calender bar in focused
    const calendarFocus2 = () => {
        setCalender(true);
    }
    const seatFocus2 = () => {
        setSeat(true);
    }

    // Hide recommendations when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
        if (
            searchBarRef1.current &&
            !searchBarRef1.current.contains(event.target as Node) &&
            recommendationsRef1.current &&
            !recommendationsRef1.current.contains(event.target as Node)
        ) {
            setShowRecommendations1(false);
        }

        if (
            searchBarRef2.current &&
            !searchBarRef2.current.contains(event.target as Node) &&
            recommendationsRef2.current &&
            !recommendationsRef2.current.contains(event.target as Node)
        ) {
            setShowRecommendations2(false);
        }


        if (
            calendarRef1.current &&
            !calendarRef1.current.contains(event.target as Node) &&
            calendarRef2.current &&
            !calendarRef2.current.contains(event.target as Node)
        ) {
            setCalender(false);
        }

        if (
            seatRef1.current &&
            !seatRef1.current.contains(event.target as Node) &&
            seatRef2.current &&
            !seatRef2.current.contains(event.target as Node)
        ) {
            setSeat(false);
        }
    };


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [])

    const [filterCity1, setFilterCity1] = useState(users);
    const [filterCity2, setFilterCity2] = useState(users);

    //dispatching into redux store
    const dispatch = useDispatch();

    //navigating to another page
    const navigate = useNavigate();

    //whole form info in single object
    const [formData, setFormData] = useState({
        arrival: 'MUM',
        destination: "DEL",
        date: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
        noOfSeats: 1
    });


    function dateConvertorIsoToString(date: Date) {

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so add 1
        const day = String(date.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    }

    //for setting arrival city
    function arrivalData(e: React.ChangeEvent<HTMLInputElement>) {
        //console.log(e.target);
        const { name, value } = e.target;
        //console.log(value);
        const searchCity = value;

        const filterItems = users.filter((user) =>
            user.address.toLowerCase().includes(searchCity.toLowerCase()));
        //console.log(filterItems)
        setFilterCity1(filterItems);

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    //for setting destination city
    function destinationData(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        const searchCity = value;

        const filterItems = users.filter((user) =>
            user.address.toLowerCase().includes(searchCity.toLowerCase()));
        setFilterCity2(filterItems);

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }
    function noOfSeatsHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;


        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }


    // for setting date into state
    function dateData(e: any) {
        const value = dateConvertorIsoToString(e);

        setFormData((prevData) => ({
            ...prevData,
            date: value
        }));
    }

    async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/flights?trips=${formData.arrival}-${formData.destination}&date=${formData.date}`, {
                headers: {
                    'Content-Type': 'application/json', // Set Content-Type header
                }
            }
            );
            dispatch(setNoOfSeats(formData.noOfSeats));
            dispatch(setFlightDetails(response.data.data));
            navigate("/flights");
        } catch (error) {
            console.log(error);

        }

    }

    return (

        <div className="bg-blue-600 h-full">
            {isLoading ? (
                <Loading isLoading={isLoading} />
            ) : (
                <div className="bg-blue-600 h-full">
                    <NavBar />
                    <div className="w-full h-screen bg-slate-900 relative flex">


                        {/* Form container */}
                        <div className="w-[90%] h-auto bg-white rounded-md absolute left-[5%] top-10 p-6 shadow-lg z-20">
                            <form onSubmit={submitHandler}>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-8 bg-white">

                                    {/* From Input */}
                                    <div className="w-full">
                                        <TextField
                                            ref={searchBarRef1}
                                            onFocus={handleFocus1}
                                            name="arrival"
                                            label="From"
                                            value={formData.arrival}
                                            variant="outlined"
                                            onChange={arrivalData}
                                            className="w-full"
                                        />
                                        {showRecommendations1 && (
                                            <div
                                                ref={recommendationsRef1}
                                                className="overflow-y-auto h-40 absolute top-25 bg-white z-50 rounded-md shadow-md mt-2 w-[80%] md:w-[23%]"
                                            >
                                                <ul className="border border-gray-300">
                                                    {filterCity1.map((user) => (
                                                        <li
                                                            key={user.code}
                                                            className="hover:bg-gray-200 px-4 py-1 flex justify-between border-b border-gray-300 cursor-pointer"
                                                            onClick={() => {
                                                                setFormData((prevData) => ({
                                                                    ...prevData,
                                                                    arrival: user.code,
                                                                }));
                                                            }}
                                                        >
                                                            <div>
                                                                <div>{user.address}</div>
                                                                <div className="text-sm text-gray-500">{user.name}</div>
                                                            </div>
                                                            <div className="font-bold text-sm pt-2">{user.code}</div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* To Input */}
                                    <div className="w-full">
                                        <TextField
                                            id="destination"
                                            label="To"
                                            name="destination"
                                            value={formData.destination}
                                            onChange={destinationData}
                                            variant="outlined"
                                            className="w-full font-bold"
                                            ref={searchBarRef2}
                                            onFocus={handleFocus2}
                                        />
                                        {showRecommendations2 && (
                                            <div
                                                ref={recommendationsRef2}
                                                className="overflow-y-auto h-40 absolute top-25 bg-white z-50 rounded-md shadow-md mt-2 w-[80%] md:w-[23%]"
                                            >
                                                <ul className="border border-gray-300">
                                                    {filterCity2.map((user) => (
                                                        <li
                                                            key={user.code}
                                                            className="hover:bg-gray-200 px-4 py-1 flex justify-between border-b border-gray-300 cursor-pointer"
                                                            onClick={() => {
                                                                setFormData((prevData) => ({
                                                                    ...prevData,
                                                                    destination: user.code,
                                                                }));
                                                            }}
                                                        >
                                                            <div>
                                                                <div>{user.address}</div>
                                                                <div className="text-sm text-gray-500">{user.name}</div>
                                                            </div>
                                                            <div className="font-bold text-sm pt-2">{user.code}</div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* Date Picker */}
                                    <div className="w-full">
                                        <div
                                            className="border-black border-2 w-full h-14 rounded-md flex items-center px-4"
                                            ref={calendarRef1}
                                            tabIndex={0}
                                            onFocus={calendarFocus2}
                                        >
                                            <div className="text-blue-600 text-sm">
                                                <p>Departure</p>
                                            </div>
                                            <div className="font-bold text-lg ml-auto">{formData.date}</div>
                                        </div>
                                        {calendar && (
                                            <div ref={calendarRef2} className="absolute z-30 text-sm w-[90%] md:w-[100%] lg:w-[100%]">
                                                <Calendar onChange={dateData} value={formData.date} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Traveller Input */}
                                    <div className="w-full">
                                        <div
                                            className="border-black border-2 w-full h-14 rounded-md flex items-center px-4"
                                            ref={seatRef1}
                                            tabIndex={0}
                                            onFocus={seatFocus2}
                                        >
                                            <div className="text-blue-600 text-sm">
                                                <p>Traveller</p>
                                            </div>
                                            <div className="font-bold text-lg ml-auto">{formData.noOfSeats} Traveller</div>
                                        </div>
                                        {seat && (
                                            <div className="border-2 w-[80%] md:w-[90%] lg:w-[100%] mt-2 absolute" ref={seatRef2}>
                                                <input
                                                    type="number"
                                                    placeholder="No of seats"
                                                    name="noOfSeats"
                                                    value={formData.noOfSeats}
                                                    onChange={noOfSeatsHandler}
                                                    className="w-full border-2 border-black p-2"
                                                    min={1}
                                                />
                                            </div>
                                        )}
                                    </div>

                                   
                                
                                </div>
                                <div>
                                     {/* Search Button */}
                                    <div className="w-full flex justify-center ">
                                        <button className="bg-blue-950 text-lg py-4 px-8 font-bold text-white rounded-2xl">
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            )}
        </div>


    )
}