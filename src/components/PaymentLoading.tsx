import { BarLoader, CircleLoader, ClipLoader, PuffLoader, HashLoader, BeatLoader, BounceLoader, FadeLoader, RingLoader, ScaleLoader } from 'react-spinners';


export default function Loading(isLoading: any) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="font-bold text-2xl sm:text-3xl lg:text-4xl flex-col text-center">

                {/* Transaction Status */}
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <div>Transaction is in Progress</div>
                    <div className="pt-2">
                        <BeatLoader color={"black"} loading={isLoading} size={15} margin={4} />
                    </div>
                </div>

                {/* Loader */}
                <div className="mt-6 px-8 sm:px-16">
                    <ScaleLoader
                        color={"#123abc"}
                        className="font-extrabold ml-auto sm:ml-16"
                        loading={isLoading}
                        width={12}
                        height={40}
                    />
                </div>
            </div>
        </div>

    )
}