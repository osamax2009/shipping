import { parcelTypes } from "../../../shared/constancy";
import {
    CarouselProvider,
    Slider,
    Slide,
    ButtonBack,
    ButtonNext,
} from "pure-react-carousel";

const ParcelTypes = () => {
    return (
        <div className="flex flex-col gap-4 justify-center items-center  py-8 md:border-l md:border-r md:border-red-700">
            <SlideElement />
        </div>
    );
};

export default ParcelTypes;

const SingleParcel = ({ title, icon }) => {
    return (
        <div className="p-3 flex flex-col animate-fadeInLeft md:min-w-[300px] py-8 bg-appGreen/25 gap-8 items-center justify-center">
            <div className="text-2xl">{icon}</div>
            <div className="text-lg">{title}</div>
        </div>
    );
};

/* Install pure-react-carousel using -> npm i pure-react-carousel */

function SlideElement() {
    return (
        <div className="2xl:mx-auto 2xl:container flex justify-center">
            <div className="2xl:px-20 px-6 py-12 w-full lg:w-4/5">
                {/* Carousel for Small-Sized Screen */}
                <CarouselProvider
                    className="relative block sm:hidden"
                    naturalSlideWidth={100}
                    isIntrinsicHeight={true}
                    totalSlides={4}
                    visibleSlides={1}
                    step={1}
                    infinite={true}
                >
                    <div className="js-flickity flex justify-center items-center">
                        <ButtonBack
                            role="button"
                            aria-label="slide backward"
                            className="w-12 h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center bg-white border border-gray-300 hover:bg-gray-400 absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
                            id="prev"
                        >
                            <svg
                                width={8}
                                height={14}
                                viewBox="0 0 8 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7 1L1 7L7 13"
                                    stroke="black"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </ButtonBack>
                        <Slider>
                            <Slide index={0}>
                                <div className="flex gap-6 px-2 lg:mr-7 mr-6 lg:w-1/2 sm:w-96 w-full h-full">
                                    <div className="relative w-full h-full lg:block hidden">
                                        <img
                                            src="https://i.ibb.co/VSsN4Jt/carousel-2.png"
                                            alt="sitting area"
                                            className="object-center object-cover w-full h-full"
                                        />
                                        <div className="pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0">
                                            <h1 className="text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white">
                                                Lounge Interior
                                            </h1>
                                        </div>
                                    </div>
                                    <SingleParcel
                                        title={parcelTypes[0].label}
                                        icon={parcelTypes[0].icon}
                                    />
                                </div>
                            </Slide>
                            <Slide index={1}>
                                <div className="flex gap-6 px-2 lg:mr-7 mr-6 lg:w-1/2 sm:w-96 w-full h-full">
                                    <div className="relative w-full h-full lg:block hidden">
                                        <SingleParcel
                                            title={parcelTypes[0].label}
                                            icon={parcelTypes[0].icon}
                                        />
                                    </div>
                                    <div className="relative w-full h-full lg:hidden">
                                        <SingleParcel
                                            title={parcelTypes[0].label}
                                            icon={parcelTypes[0].icon}
                                        />
                                    </div>
                                </div>
                            </Slide>
                            <Slide index={2}>
                                <div className="flex gap-6 px-2 lg:mr-7 mr-6 lg:w-1/2 sm:w-96 w-full h-full">
                                    <div className="relative w-full h-full lg:block hidden">
                                        <SingleParcel
                                            title={parcelTypes[0].label}
                                            icon={parcelTypes[0].icon}
                                        />
                                    </div>
                                    <div className="relative w-full h-full lg:hidden">
                                        <SingleParcel
                                            title={parcelTypes[0].label}
                                            icon={parcelTypes[0].icon}
                                        />
                                    </div>
                                </div>
                            </Slide>

                            <Slide index={3}>
                                <div className="flex gap-6 px-2 lg:mr-7 mr-6 lg:w-1/2 sm:w-96 w-full h-full">
                                    <div className="relative w-full h-full lg:block hidden">
                                        <SingleParcel
                                            title={parcelTypes[2].label}
                                            icon={parcelTypes[2].icon}
                                        />
                                    </div>
                                   
                                </div>
                            </Slide>
                        </Slider>
                        <ButtonNext
                            role="button"
                            aria-label="slide forward"
                            className="w-12 h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center bg-white border border-gray-300 hover:bg-gray-400 absolute z-30 right-0 mr-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                            id="next"
                        >
                            <svg
                                width={8}
                                height={14}
                                viewBox="0 0 8 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1 1L7 7L1 13"
                                    stroke="black"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>

                {/* Carousel for Medium and Large-Sized Screen */}
                <CarouselProvider
                    className="relative hidden sm:block"
                    naturalSlideWidth={100}
                    isIntrinsicHeight={true}
                    totalSlides={4}
                    visibleSlides={1}
                    step={1}
                    infinite={true}
                    currentSlide={0}
                    isPlaying={true}
                >
                    <div className="js-flickity flex justify-between items-center">
                        <ButtonBack
                            role="button"
                            aria-label="slide backward"
                            className="w-12 h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center bg-white border border-gray-300 hover:bg-gray-400 absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
                            id="prev"
                        >
                            <svg
                                width={8}
                                height={14}
                                viewBox="0 0 8 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7 1L1 7L7 13"
                                    stroke="black"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </ButtonBack>

                        <Slider className="carousel__sliderLarge">
                            <Slide
                                className="w-full"
                                index={0}
                            >
                                <div className="flex gap-6 px-2 w-full h-full">
                                    <SingleParcel
                                        title={parcelTypes[0].label}
                                        icon={parcelTypes[0].icon}
                                    />
                                    <SingleParcel
                                        title={parcelTypes[1].label}
                                        icon={parcelTypes[1].icon}
                                    />

                                </div>
                            </Slide>
                            <Slide
                                className="w-full"
                                index={1}
                            >
                                <div className="flex gap-6 px-2 w-full h-full">
                                    <SingleParcel
                                        title={parcelTypes[3].label}
                                        icon={parcelTypes[3].icon}
                                    />
                                    <SingleParcel
                                        title={parcelTypes[4].label}
                                        icon={parcelTypes[4].icon}
                                    />
                                </div>
                            </Slide>
                            <Slide
                                className="w-full"
                                index={2}
                            >
                                <div className="flex gap-6 px-2 w-full h-full">
                                    <SingleParcel
                                        title={parcelTypes[5].label}
                                        icon={parcelTypes[5].icon}
                                    />
                                    <SingleParcel
                                        title={parcelTypes[6].label}
                                        icon={parcelTypes[6].icon}
                                    />
                                </div>
                            </Slide>

                            <Slide
                                className="w-full"
                                index={3}
                            >
                                <div className="flex gap-6 px-2 w-full h-full">
                                    <SingleParcel
                                        title={parcelTypes[2].label}
                                        icon={parcelTypes[2].icon}
                                    />
                                   
                                </div>
                            </Slide>
                        </Slider>
                        <ButtonNext
                            role="button"
                            aria-label="slide forward"
                            className="w-12 h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center bg-white border border-gray-300 hover:bg-gray-400 absolute z-30 right-0 mr-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                            id="next"
                        >
                            <svg
                                width={8}
                                height={14}
                                viewBox="0 0 8 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1 1L7 7L1 13"
                                    stroke="black"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>
            </div>

            <style>
                {`
                    .flex gap-6 px-2 {
                        height: 386px;
                        padding-right:15px;
                    }
                    @media (min-width: 300px) and (max-width: 420px) {
                        .flex gap-6 px-2 {
                            height: 286px !important;
                            
                        }
                    }
                    
                    @media (max-width: 640px) {
                        .flex gap-6 px-2 {
                            padding-right:0;
                        }
                    }

                    .carousel__sliderLarge {
                        padding-left: 20%;
                        padding-right: 20%;
                    }

                    /* gives us the illusion of spaces between the slides */
                    .w-fit {
                        width: calc(100% - 20px);
                        height: calc(100% - 20px);
                        left: 10px;
                        top: 10px;
                        
                    }
                `}
            </style>
        </div>
    );
}
