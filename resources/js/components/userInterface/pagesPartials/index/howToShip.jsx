const HowToShip = () => {
    return (
        <div className="flex flex-col bg-white gap-4 justify-center items-center p-8  md:border-l md:border-r md:border-red-700">
            <div className="uppercase text-xl font-semibold text-appGreen">
                Our services
            </div>
            <div className="uppercase text-md font-semibold text-gray-700 mt-2">
                Door-to-door shipping services
            </div>
            <div className="bg-gray-100/25  py-4 px-12">
                <div className="uppercase text-md text-center font-semibold text-gray-700 mt-2">
                    How does our door-to-door delivery works ?
                </div>
                <div className="grid gap-4 px-4  md:grid-cols-2 lg:grid-cols-4"></div>
            </div>
        </div>
    );
};

export default HowToShip;

const DeliveryService = ({ title, icon, description }) => {
    return (
        <div className="p-3 flex flex-col bg-white/25 gap-2 items-center justify-center">
            <div className="text-2xl">{icon}</div>
            <div className="text-lg">{title}</div>
            <div className="text-lg">{description}</div>
        </div>
    );
};


const HowItWorks = ({ title, icon, description }) => {
    return (
        <div className="p-3 flex flex-col bg-white/25 gap-2 items-center justify-center">
            <div className="text-2xl">{icon}</div>
            <div className="text-lg">{title}</div>
            <div className="text-lg">{description}</div>
        </div>
    );
};
