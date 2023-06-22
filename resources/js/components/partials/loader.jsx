import { Image } from "@nextui-org/react"

const Loader = () => {
    return (
        <div className="flex justify-center bg-white items-center h-screen w-screen">
           <div className="flex items-center justify-center h-[200px] w-[200px] p-12 rounded-[140px] shadow-md bg-appGreen animate-headShake animate-infinite">
                <Image src="/app_logo_primary.png" width={250} height={140} className="h-72" />
           </div>
        </div>
    )
}

export default Loader