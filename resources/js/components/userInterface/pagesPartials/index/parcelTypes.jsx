import { Bs1Circle, BsEnvelope } from "react-icons/bs";
import { FaPallet } from "react-icons/fa";
import { LuPackage2 } from 'react-icons/lu';
import { TbTruckDelivery } from "react-icons/tb"
import { parcelTypes } from "../../../shared/constancy";

const ParcelTypes = () => {
   
    return (
        <div className="flex flex-col gap-4 justify-center items-center  py-8 md:border-l md:border-r md:border-red-700">
            <div className="uppercase text-xl font-semibold text-appGreen">
                Our services
            </div>
            <div className="uppercase text-md font-semibold text-gray-700 mt-8">
            Door-to-door shipping services
            </div>
            <div className="grid gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {parcelTypes.map((parcel, index) => (
                    <SingleParcel
                        key={index}
                        title={parcel.label}
                        icon={parcel.icon}
                    />
                ))}
            </div>
        </div>
    );
};

export default ParcelTypes;

const SingleParcel = ({ title, icon }) => {
    return (
        <div className="p-6 bg-appGreen/25 rounded">
            <div className="text-4xl">{icon}</div>
            <div className="text-lg">{title}</div>
        </div>
    );
};
