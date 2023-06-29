import { parcelTypes } from "../../../shared/constancy";
import {
    CarouselProvider,
    Slider,
    Slide,
    ButtonBack,
    ButtonNext,
} from "pure-react-carousel";
import AliceCarousel from "react-alice-carousel";

const ParcelTypes = () => {
    return (
        <div className="flex bg-white justify-center w-full mt-6 overflow-x-hidden">
            <div className="flex justify-center bg-white w-10/12 md:px-8 pb-4 pt-12 overflow-x-hidden">
                <SlideElement />
            </div>
        </div>
    );
};

export default ParcelTypes;

const SingleParcel = ({ title, icon }) => {
    return (
        <div className="p-8 flex flex-col h-[140px] shadow-sm w-[120px] md:!w-[170px] bg-gray-100/50 text-black font-bold gap-2 items-center justify-center">
            <div className="text-xl">{icon}</div>
            <div className="text-md">{title}</div>
        </div>
    );
};

/* Install pure-react-carousel using -> npm i pure-react-carousel */

function SlideElement() {
    const responsive = {
        0: {
            items: 1,
        },
        600: {
            items: 3,
        },
        1024: {
            items: 5,
        },
    };
    return (
        <AliceCarousel
            responsive={responsive}
            fadeOutAnimation={true}
            mouseDragEnabled={true}
            
        >
            {parcelTypes.map((parcel, index) => (
                <SingleParcel
                    key={index}
                    title={parcel.label}
                    icon={parcel.icon}
                />
            ))}
        </AliceCarousel>
    );
}
