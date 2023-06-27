import { Image } from "@nextui-org/react";
import PointFooter from "../userInterface/pagesPartials/index/2pointFooter";

const AboutUs = () => {
    return (
        <div className=" flex flex-col justify-between min-h-screen">
            <div className="py-24 text-center text-white font-bold text-4xl bg-appGreen">
                About Us
                <div className="text-md mt-12">
                    You have now the power to move things
                </div>
            </div>
            <div className="h-full  px-12 md:px-24 py-24 lg:py-12 text-justify bg-white font-bold">
                At Why 2 Point Delivery, we are passionate about providing
                exceptional parcel delivery services. With a focus on speed,
                reliability, and customer satisfaction, we strive to exceed
                expectations in every delivery. Our extensive network and
                nationwide coverage ensure that your packages reach their
                destinations swiftly and securely. We value transparency and
                convenience, offering real-time tracking, responsive customer
                support, and flexible delivery options. Trust Why 2 Point
                Delivery for a seamless and hassle-free experience, as we go the
                extra mile to ensure your parcels are handled with care and
                delivered with precision.{" "}
            </div>

            <div className="grid px-8 bg-[#f2eff6] md:grid-cols-2">
                <div className="font-bold text-5xl p-12 flex flex-col justify-center items-center">
                    Save the <br /> excuses  and time
                    <div className="text-md text-start mt-12">
                    You have now the power to move things
                </div>
                </div>

                <div>
                    <Image src="/images/ic_aboutUs.png" width={300} height={400} />
                </div>
              
            </div>

            <PointFooter />
        </div>
    );
};

export default AboutUs