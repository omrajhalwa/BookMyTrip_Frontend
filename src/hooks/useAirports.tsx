
import { useEffect } from "react";
import axios from 'axios';
import { setAirports } from "../redux/flightSlice";
import { useDispatch } from "react-redux";



export default function useAirports() {
    const dispatch = useDispatch();

    useEffect(() => {

        async function getData() {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/airports/');

                if (response.data.data) {
                    dispatch(setAirports(response.data.data));
                }

            } catch (error) {
                console.log(error);
            }

        }

        getData();
    },[]);

    return (
    <>
    </>
    )
}