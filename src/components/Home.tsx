import { TbTransfer } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFlightDetails } from "../redux/flightSlice";
import Loading from "./Loading";
import NavBar from "./NavBar";
import { TextField } from "@mui/material";
export default function Home() {



    const [isLoading, setIsLoading] = useState(true);

    let [users, setUsers] = useState([{ address: 'Mumbai', code: 'MUM' },
        { address: 'Delhi', code: 'DEL' }]);


    useEffect(() => {

        async function getData() {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/airports/');
                //console.log(response);
                if (response.data.data) {
                    setUsers(response.data.data);
                }
                //console.log(users);
            } catch (error) {
                console.log(error);
            }

        }

        getData();

        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
    }, [])

    const [filterCity1, setFilterCity1] = useState(users);
    const [filterCity2, setFilterCity2] = useState(users);

    const inputRef = useRef<HTMLInputElement | null>(null);



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
            navigate("/flights");
        } catch (error) {
            console.log(error);

        }

    }

    return (

        <div>
            {isLoading ? (<Loading isLoading={isLoading} />) : (
                <>
                    <NavBar />
                    <div className="w-full h-72 bg-blue-400 flex ">
                        <img className="w-full h-full" src="https://images.unsplash.com/photo-1726910133626-9b573eca70ff?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        <div className="w-[90%] h-[40%] bg-white rounded-md absolute ml-14 my-12">
                            <form onSubmit={submitHandler}>
                                <div className="flex py-16 justify-evenly">


                                    <div className="child-div " >
                                        <TextField
                                            ref={inputRef}
                                            name='arrival'
                                            id="outlined-basic"
                                            label="From"
                                            value={formData.arrival}
                                            variant="outlined"
                                            onChange={arrivalData}
                                            className="w-[80%]"

                                        />
                                        {
                                            formData.arrival == '' ? <></> :
                                                <ul className="border-2 border-black  bg-white ">
                                                    {filterCity1.map((user) => <li className="hover:bg-gray-200 px-4 py-1 flex justify-between"
                                                        onClick={() => {
                                                            setFormData((prevData) => ({
                                                                ...prevData,
                                                                "arrival": user.code
                                                            }));

                                                        }}
                                                    >   <div>
                                                            {user.address}
                                                        </div>
                                                        <div className="font-bold text-sm pt-2">
                                                            {user.code}
                                                        </div>
                                                    </li>)}
                                                </ul>
                                        }
                                    </div>

                                    <div className="text-4xl text-green-600 flex justify-center">
                                        <TbTransfer />
                                    </div>

                                    <div>

                                        <TextField
                                            id="destination"
                                            label="To"
                                            name="destination"
                                            value={formData.destination}
                                            onChange={destinationData}
                                            variant="outlined"
                                            className="w-[80%]"
                                        />

                                        {
                                            formData.destination == '' ? <></> :
                                                <ul className="border-2 border-black  bg-white z-100">
                                                    {filterCity2.map((user) => <li className="hover:bg-gray-200 px-4 py-1 flex justify-between"
                                                        onClick={() => {
                                                            setFormData((prevData) => ({
                                                                ...prevData,
                                                                "destination": user.code
                                                            }));

                                                        }}>
                                                        <div>
                                                            {user.address}
                                                        </div>
                                                        <div className="font-bold text-sm pt-2">
                                                            {user.code}
                                                        </div>
                                                    </li>)}
                                                </ul>
                                        }
                                    </div>

                                    <div className="p-2">

                                        <input type="date"
                                            id="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={dateData}
                                            className="border-slate-500 rounded-md border-2"
                                            placeholder="arrival airport"
                                        />
                                    </div>

                                    <button className="bg-blue-600 text-md py-3 text-2xl px-8 font-bold text-white rounded-2xl absolute top-40 z-50">Search</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>

    )
}