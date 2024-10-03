import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Parent from './Parent';
import Flight from './Flight';
import Login from './Login';
import Payment from './Payment';
import Booking from './Booking';


export default function Body() {


    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Parent />
        }
        , {
            path: "/flights",
            element: <Flight />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: '/bookings',
            element: <Booking />
        },
        {
            path: '/payment',
            element: <Payment />
        }
    ])


    return (
        <div className='h-full w-full'>
            <RouterProvider router={appRouter} />
        </div>
    )
}