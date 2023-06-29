import { Button, Image } from "@nextui-org/react";
import { deliveryDetails } from "../../../shared/constancy";
import { useEffect } from "react";
import { getWithAxios } from "../../../api/axios";
import AliceCarousel from "react-alice-carousel";
import { useState } from "react";
import { FaMapPin } from "react-icons/fa";
import { BsFillPinMapFill } from "react-icons/bs";

const DeliveryMan = () => {
    const [cities, setCities] = useState(null);

    const responsive = {
        0: {
            items: 1,
        },
        600: {
            items: 4,
        },
        1024: {
            items: 6,
        },
    };

    const getCities = async () => {
        const { data } = await getWithAxios("/api/city-list");

        if (data) {
            setCities(data);
        }
    };

    useEffect(() => {
        getCities();
    }, []);

    return (
        <div className="py-6 px-8 bg-white/75" id="partner">
            <div className="text-lg md:text-2xl text-appGreen font-bold mb-8 uppercase">
                Register as delivery man
            </div>
            <div className="font-bold text-lg md:text-xl">Deliver when you want</div>
            <div className="grid mt-1 items-center gap-6 sm:grid-cols-2 md:grid-cols-4">
                {deliveryDetails.map((detail, index) => (
                    <DeliverDetail
                        key={index}
                        title={detail.title}
                        description={detail.description}
                    />
                ))}
                <div>
                    <Image src="/Take Away-pana.svg" />
                </div>
            </div>
            <div className="mt-4">
                <a
                    className="px-3 md:px-8 py-3 bg-black text-white text-md hover:bg-black/75 hover:no-underline"
                    target="blank"
                    href="https://play.google.com/store/apps/details?id=com.point.delivery"
                >
                   Become a 2point delivery partner
                </a>
            </div>

            <div className="flex justify-center w-full">
            <div className="w-3/4 mt-6 py-4">
                <AliceCarousel
                    responsive={responsive}
                    fadeOutAnimation={true}
                    mouseDragEnabled={true}
                >
                    {cities?.map((city, index) => (
                        <SingleCity
                            key={index}
                            title={city.name}
                            
                        />
                    ))}
                </AliceCarousel>
            </div>
            </div>
        </div>
    );
};

export default DeliveryMan;

const DeliverDetail = ({ title, description }) => {
    return (
        <div className="h-full">
            <div className="text-md font-bold py-2">{title}</div>
            <div>{description}</div>
        </div>
    );
};

const SingleCity = ({ title }) => {
    return (
        <div className="py-8 flex flex-col shadow-sm h-[140px] md:!w-[170px] bg-gray-100/50 text-black font-bold gap-2 items-center justify-center">
            <div className="text-center text-appGreen text-2xl">
                <BsFillPinMapFill />
            </div>
            <div className="text-md text-center">{title}</div>
        </div>
    );
};
