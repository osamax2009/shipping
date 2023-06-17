import { Image } from "@nextui-org/react"
import { appName } from "../../../shared/constancy"
import { Link } from "react-router-dom"
import { BsEnvelope, BsEnvelopeFill, BsFacebook, BsGeoAltFill, BsInstagram, BsLinkedin, BsTelephoneFill } from "react-icons/bs"

const PointFooter = ( ) => {
    return(
        <div className="bg-appGreen px-24 text-white pt-8 pb-4">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <div className="flex gap-2 items-center justify-start h-8 mb-4">
                        <img src="/images/ic_app_logo_color.png" className="h-8 " />
                        <div className="text-xl">
                            {appName}
                        </div>
                    </div>
                    <div>
                        Download the app by clicking the link below
                    </div>
                    <div className="flex gap-2 flex-wrap mt-4">
                        <div>
                            <a target="blank" href="https://play.google.com/store/apps/details?id=com.point.delivery">
                                <img src="/images/ic_play_store.png" className="h-10" />
                            </a>

                        </div>

                        <div>
                            <a target="blank" href="https://apps.apple.com/app/2point-delivery/id6450139295">
                                <img src="/images/ic_app_store.png" className="h-10" />
                            </a>

                        </div>


                    </div>
                </div>

                <div className="grid gap-4 font-bold">
                    <div className="uppercase py-4">
                        {appName}
                    </div>
                    <div>
                        <Link>
                            About us
                        </Link>
                    </div>
                    <div>
                        <Link>
                            Contact us
                        </Link>
                    </div>

                    <div>
                        <Link>
                            Privacy policy
                        </Link>
                    </div>
                    <div>
                        <Link to={"#partner"}>
                            {appName} for partner
                        </Link>
                    </div>
                </div>

                <div className="grid gap-4 font-bold">
                    <div className="uppercase py-4">
                        Contact Us
                    </div>
                    <div className="flex gap-3 items-center">
                        <BsEnvelopeFill />
                        <a href="mailto:info@2pointdelivery.com">info@2pointdelivery.com</a>
                    </div>
                    <div className="flex gap-3 items-center">
                        <BsTelephoneFill />
                        <Link>
                            +1 (639) 997-2710
                        </Link>
                    </div>
                    <div className="flex gap-3 items-center">
                        <BsGeoAltFill />
                        <Link>
                            14-2752 Montague street; S4S 0J9 <br />
                            Regina - Saskatchewan, Canada
                        </Link>
                    </div>
                   
                </div>

                <div className="grid gap-2 font-bold">
                    <div className="uppercase pt-4">
                        Socila media
                    </div>
                    <div className="flex flax-wrap gap-8 items-center text-2xl">
                        
                        <a target="blank" href="https://www.facebook.com/profile.php?id=100092747889754 ">
                        <BsFacebook />
                        </a>

                        <a target="blank" href="https://www.linkedin.com/in/2point-delivery-889159278/">
                        <BsLinkedin />
                        </a>

                        <a target="blank" href="https://www.instagram.com/2pointdelivery/">
                        <BsInstagram />
                        </a>
                    </div>
                   
                   
                </div>




            </div>
        </div>
    )
}

export default PointFooter