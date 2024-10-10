
import { BarLoader, CircleLoader, ClipLoader, PuffLoader, HashLoader, BeatLoader, BounceLoader, FadeLoader, RingLoader, ScaleLoader } from 'react-spinners';


export default function Loading(isLoading: any) {
    return (
        <div className="flex justify-center items-center w-full h-screen bg-gray-100">
            <div className="font-bold text-center px-4 md:px-40">

                {/* HashLoader for the main spinner */}
                <div className="w-full flex justify-center mb-6 md:mb-10">
                    <HashLoader
                        color={"#123abc"}
                        loading={isLoading}
                        size={60}           
                        className="mt-10 md:size-100"  /* Larger size for medium and up */
                    />
                </div>

                {/* Text and BeatLoader */}
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-2">
                    <div className="text-gray-700 text-lg md:text-2xl">Please wait</div>
                    <div>
                        <BeatLoader
                            color={"black"}
                            loading={isLoading}
                            size={8}          
                            margin={2}
                            className="md:size-15 md:margin-4"  /* Larger size on medium and up */
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}