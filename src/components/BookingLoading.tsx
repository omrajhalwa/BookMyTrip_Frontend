
import { BarLoader, CircleLoader, ClipLoader, PuffLoader, HashLoader, BeatLoader, BounceLoader, FadeLoader, RingLoader, ScaleLoader } from 'react-spinners';


export default function Loading(isLoading: any) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="font-bold text-4xl flex-col">

                <div className='flex '>
                    <div>please wait, intializing booking</div>  <div className='pt-2'><BeatLoader color={"black"} loading={isLoading} size={15} margin={4} /></div>
                </div>
                <div className='p-2 ml-4'>
                    <BarLoader color={"#123abc"} className='font-extrabold ml-16' loading={isLoading} width={300} height={20} />

                </div>


            </div>
        </div>
    )
}