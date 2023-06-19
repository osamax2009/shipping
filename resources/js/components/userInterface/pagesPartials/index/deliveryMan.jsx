import { Button, Image } from "@nextui-org/react";
import { deliveryDetails } from "../../../shared/constancy";

const DeliveryMan = () => {
    return (
        <div className="py-6 px-8 bg-white/75" id="partner">
            <div className="text-2xl text-appGreen font-bold mb-8 uppercase">
                Register as delivery man
            </div>
            <div className="font-bold text-xl">Deliver when you want</div>
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
            <div className="mt-2">
                <a
                    className="px-8 py-3 bg-black text-white text-md hover:bg-black/75 hover:no-underline"
                    target="blank"
                    href="https://play.google.com/store/apps/details?id=com.point.delivery"
                >
                    Become a 2point delivery partner
                </a>
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
