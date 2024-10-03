import { TbTransfer } from "react-icons/tb";
import { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFlightDetails } from "../redux/flightSlice";
export default function Home() {
    //dispatching into redux store
    const dispatch = useDispatch();

    //navigating to another page
    const navigate = useNavigate();

    //whole form info in single object
    const [formData, setFormData] = useState({
        arrival: '',
        destination: "",
        date: ''

    })

    //for setting arrival city
    function arrivalData(e: React.ChangeEvent<HTMLInputElement>) {
        //console.log(e.target);
        const { name, value } = e.target;
        //console.log(value);

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    //for setting destination city
    function destinationData(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    // for setting date into state
    function dateData(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // console.log(formData);
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/flights?trips=${formData.arrival}-${formData.destination}&date=${formData.date}`, {
                headers: {
                    'Content-Type': 'application/json', // Set Content-Type header
                }
            }
            );
            //console.log(response.data.data);
            dispatch(setFlightDetails(response.data.data));
            navigate("flights");
        } catch (error) {
            console.log(error);

        }

    }

    return (
        <div className="w-full h-60 bg-blue-400 flex px-14 py-12">
            <div className="w-[100%] h-[100%] bg-white rounded-md">
                <form onSubmit={submitHandler}>
                    <div className="flex py-16 justify-evenly">


                        <div>

                            <input type="text"
                                id="arrival"
                                name="arrival"
                                value={formData.arrival}
                                onChange={arrivalData}
                                className="border-slate-500 rounded-md border-2 mx-2 text-md text-slate-700"
                                placeholder="   arrival airport"
                            />
                        </div>

                        <div className="text-2xl">
                            <TbTransfer />
                        </div>

                        <div>

                            <input type="text"
                                id="destination"
                                name="destination"
                                value={formData.destination}
                                onChange={destinationData}
                                className="border-slate-500 rounded-md border-2 mx-2"
                                placeholder="  destination airport"
                            />
                        </div>

                        <div>

                            <input type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={dateData}
                                className="border-slate-500 rounded-md border-2 mx-2"
                                placeholder="arrival airport"
                            />
                        </div>

                        <button className="bg-blue-600 text-md py-1 px-2 text-white rounded-md">Search</button>
                    </div>
                </form>
            </div>
        </div>
    )
}