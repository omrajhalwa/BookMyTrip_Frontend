
import { BarLoader, CircleLoader, ClipLoader, PuffLoader, HashLoader, BeatLoader, BounceLoader, FadeLoader, RingLoader, ScaleLoader } from 'react-spinners';


export default function Loading(isLoading: any) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="font-bold text-2xl sm:text-3xl lg:text-4xl flex flex-col items-center text-center">

                {/* Loading Text and BeatLoader */}
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-2">
                    <div>please wait, initializing booking</div>
                    <div className="pt-2">
                        <BeatLoader color={"black"} loading={isLoading} size={12} margin={3} />
                    </div>
                </div>

                {/* BarLoader */}
                <div className="p-4 mt-6 w-full sm:w-auto">
                    <BarLoader
                        color={"#123abc"}
                        loading={isLoading}
                        width={200}  
            
                        height={15}
                    />
                </div>

            </div>
        </div>

    )
}