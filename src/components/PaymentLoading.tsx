import { BarLoader, CircleLoader, ClipLoader, PuffLoader, HashLoader, BeatLoader, BounceLoader, FadeLoader, RingLoader, ScaleLoader } from 'react-spinners';


export default function Loading(isLoading: any) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="font-bold text-4xl flex-col">

                <div className='flex '>
                    <div>Transaction is in Progress</div>  <div className='pt-2'><BeatLoader color={"black"} loading={isLoading} size={15} margin={4} /></div>
                </div>
                <div className='px-16'>
                    <ScaleLoader color={"#123abc"} className='font-extrabold ml-16' loading={isLoading} width={20} height={60} />

                </div>


            </div>
        </div>
    )
}