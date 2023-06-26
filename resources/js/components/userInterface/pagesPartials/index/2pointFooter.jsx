import { Image } from "@nextui-org/react"
import { appName } from "../../../shared/constancy"
import { Link } from "react-router-dom"
import { BsEnvelope, BsEnvelopeFill, BsFacebook, BsGeoAltFill, BsInstagram, BsLinkedin, BsTelephoneFill } from "react-icons/bs"

const PointFooter = ( ) => {
    
    const handleClickScroll = () => {
        const element = document.getElementById('partner');
      
        if (element) {
          // 👇 Will scroll smoothly to the top of the next section
          element.scrollIntoView({ behavior: 'smooth', block :"center" });
        }
      };
    return(
        <div className="bg-appGreen px-4 md:px-24 text-white pt-8 pb-4">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <div>
                    <div className="flex gap-2 items-center justify-start h-8 mb-4">
                        <img src="/images/ic_app_logo_color.png" className="h-8" />
                        <div className="text-xl">
                            {appName}
                        </div>
                    </div>
                    <div>
                        Download the app <br /> by clicking the link below
                    </div>
                    <div className="flex gap-2 flex-wrap mt-4">
                        <div>
                            <a className="text-white" target="blank" href="https://play.google.com/store/apps/details?id=com.point.delivery">
                                <img src="/images/ic_play_store.png" className="h-10" />
                            </a>

                        </div>

                        <div>
                            <a className="text-white" target="blank" href="https://apps.apple.com/app/2point-delivery/id6450139295">
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
                        <Link className="text-white " to={"/aboutus"}>
                            About us
                        </Link>
                    </div>
                    <div>
                        <Link className="text-white " to={"/contactus"} >
                            Contact us
                        </Link>
                    </div>

                    <div>
                        <Link className="text-white " to={"/privacypolicy"}>
                            Privacy policy
                        </Link>
                    </div>
                    <div>
                        <button onClick={handleClickScroll} >
                            <Link className="text-white ">
                                {appName} for partner
                            </Link>
                        </button>
                        
                    </div>
                </div>

                <div className="grid gap-4 font-bold">
                    <div className="uppercase py-4">
                        Contact Us
                    </div>
                    <div className="flex gap-3 items-center">
                        <BsEnvelopeFill />
                        <a className="text-white" href="mailto:info@2pointdelivery.com">info@2pointdelivery.com</a>
                    </div>
                    <div className="flex gap-3 items-center">
                        <BsTelephoneFill />
                        <a className="text-white" href="tel:+1 (639) 997-2710">
                            +1 (639) 997-2710
                        </a>
                    </div>
                    <div className="flex gap-3 items-center">
                        <BsGeoAltFill />
                        <Link className="text-white ">
                            14-2752 Montague street; S4S 0J9 <br />
                            Regina - Saskatchewan, Canada
                        </Link>
                    </div>
                   
                </div>

                <div className="grid gap-2 font-bold">
                    <div className="uppercase pt-4">
                        Social media
                    </div>
                    <div className="flex flax-wrap gap-8 items-center text-2xl">
                        
                        <a className="text-white" target="blank" href="https://www.facebook.com/profile.php?id=100092747889754 ">
                        <BsFacebook />
                        </a>

                        <a className="text-white" target="blank" href="https://www.linkedin.com/in/2point-delivery-889159278/">
                        <BsLinkedin />
                        </a>

                        <a className="text-white" target="blank" href="https://www.instagram.com/2pointdelivery/">
                        <BsInstagram />
                        </a>
                    </div>
                   
                   
                </div>




            </div>
        </div>
    )
}

export default PointFooter