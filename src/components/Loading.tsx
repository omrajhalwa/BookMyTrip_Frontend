
import { BarLoader, CircleLoader, ClipLoader, PuffLoader, HashLoader, BeatLoader, BounceLoader, FadeLoader, RingLoader, ScaleLoader } from 'react-spinners';


export default function Loading(isLoading: any) {
    return (
        <div className="flex justify-center items-center">
            <div className="font-bold text-4xl">

                <div className=''>
                    <HashLoader color={"#123abc"} loading={isLoading} size={100} className='mt-24' />
                </div>


                <div className='flex '>
                    <div>please wait</div>  <div className='pt-2'><BeatLoader color={"black"} loading={isLoading} size={15} margin={4} /></div>
                </div>
            </div>
        </div>
    )
}