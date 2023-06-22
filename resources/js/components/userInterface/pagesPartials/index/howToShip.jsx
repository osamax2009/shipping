import { deliveryServices, howItWorks } from "../../../shared/constancy";

const HowToShip = () => {
    return (
        <div className="flex flex-col bg-white gap-4 justify-center items-center p-8  md:border-l md:border-r md:border-red-700">
            <div className="bg-gray-200/25 md:w-3/4 py-4 px-12">
                <div className="uppercase text-xl text-center font-semibold text-appGreen">
                    Our services
                </div>
                <div className="uppercase text-center text-md font-semibold text-gray-700 mt-2">
                    Door-to-door shipping services
                </div>
                <div className="grid gap-4  sm:grid-cols-2 md:grid-cols-4">
                    {deliveryServices.map((service, index) => (
                        <DeliveryService
                            key={index}
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                        />
                    ))}
                </div>
            </div>
            <div className="bg-gray-200/25 md:w-2/3 py-4 px-12">
                <div className="uppercase text-md text-center font-semibold text-gray-700 mt-2">
                    How does our door-to-door delivery works ?
                </div>
                <div className="grid gap-4 px-4  md:grid-cols-2 lg:grid-cols-4">
                    {howItWorks.map((how, index) => (
                        <HowItWorks
                            title={how.title}
                            description={how.description}
                            index={index + 1}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowToShip;

const DeliveryService = ({ title, icon, description }) => {
    return (
        <div className="p-3 flex flex-col text-center bg-white border-2 border-appGreen rounded-lg gap-2 items-center justify-center">
            <div className="text-2xl text-appGreen">{icon}</div>
            <div className="text-sm font-black text-appGreen">{title}</div>
            <div className="text-sm">{description}</div>
        </div>
    );
};

const HowItWorks = ({ title, index, description }) => {
    return (
        <div className="p-3 flex flex-col bg-white/25 gap-2 items-center">
            <div className="text-2xl font-bold text-appGreen">{index}.</div>
            <div className="text-sm">
                <span className="font-bold">{title} </span>
                {description}{" "}
            </div>
        </div>
    );
};
