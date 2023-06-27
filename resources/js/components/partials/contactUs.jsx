import { BsEnvelope, BsEnvelopeFill, BsQuestionCircleFill } from "react-icons/bs";
import { appName } from "../shared/constancy";
import PointFooter from "../userInterface/pagesPartials/index/2pointFooter";
import { Image } from "@nextui-org/react";

const ContactUs = () => {
    return (
        <div className=" flex flex-col justify-between min-h-screen">
            <div className="py-24 text-center text-white font-bold text-4xl bg-appGreen">
                Constact Us
            </div>

            <div className="grid px-8 pt-12 md:px-12 lg:px-24 bg-[#f2eff6] md:grid-cols-2">
                <div className="font-bold text-5xl text-start w-full flex flex-col justify-center items-start">
                    Save the <br /> excuses and time
                    <div className="text-md mt-12">
                        You have now the power to move things
                    </div>
                    <div className="text-2xl pt-2  text-appGreen">Visit Us</div>
                    <hr className="bg-black/25 w-full " />
                    <div className="py-4 text-lg uppercase">{appName} Limited</div>
                   <div className="flex flex-col gap-3">
                   <div className="flex gap-3 text-md text-black items-center">
                        <BsQuestionCircleFill />
                        <a
                            className="text-black"
                            href="mailto:contact@2pointdelivery.com"
                        >
                            contact@2pointdelivery.com
                        </a>
                    </div>
                    <div className="flex gap-3 text-md text-black items-center">
                        <BsEnvelopeFill />
                        <a
                            className="text-black"
                            href="mailto:info@2pointdelivery.com"
                        >
                            info@2pointdelivery.com
                        </a>
                    </div>
                   </div>
                </div>

                <div>
                    <Image
                        src="/images/ic_aboutUs.png"
                        width={300}
                        height={400}
                    />
                </div>
            </div>

            <PointFooter />
        </div>
    );
};

export default ContactUs;
