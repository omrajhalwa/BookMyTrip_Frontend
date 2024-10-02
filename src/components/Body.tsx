import {RouterProvider , createBrowserRouter} from 'react-router-dom';
import Parent from './Parent';
import Flight from './Flight';




export default function Body() {
    

    const appRouter = createBrowserRouter([
        {
            path:"/",
            element:<Parent/>
        }
        ,{
            path:"/flights",
            element:<Flight/>
        }
    ])


    return (
        <div className='h-full w-full'>
            <RouterProvider router = {appRouter}/>
        </div>
    )
}