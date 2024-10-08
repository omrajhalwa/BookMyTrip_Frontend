
import { BarLoader, CircleLoader, ClipLoader, PuffLoader, HashLoader, BeatLoader, BounceLoader, FadeLoader, RingLoader, ScaleLoader } from 'react-spinners';


export default function Loading(isLoading: any) {
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className="font-bold text-4xl px-40">

                <div className='w-full px-10'>
                    <HashLoader color={"#123abc"} loading={isLoading} size={100} className='mt-10' />
                </div>


                <div className='flex'>
                    <div>please wait</div>  <div className='pt-2'><BeatLoader color={"black"} loading={isLoading} size={15} margin={4} /></div>
                </div>
            </div>
        </div>
    )
}