import { Image } from "@nextui-org/react"

const NotFoundPage = () => {
    return(
        <div className="flex h-screen w-screen items-center justify-center">
            <Image src="/images/404.png" width={"150"} height={"90"} className="h-2/3" />
        </div>
    )
}

export default NotFoundPage