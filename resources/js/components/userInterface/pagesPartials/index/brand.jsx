import { useEffect, useMemo, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    Bs1CircleFill,
    Bs2CircleFill,
    Bs4CircleFill,
    BsFill3CircleFill,
} from "react-icons/bs";

import { appName, parcelTypes } from "../../../shared/constancy";
import { Button, Loading, Modal } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../../contexts/userContext";
import { charges, haversine_distance } from "../../../shared/distanceCalculator";
import { getUserFromAPI, getWithAxios } from "../../../api/axios";

const Brand = () => {
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [service, setServive] = useState();
    const [weight, setWeight] = useState(1);
    const [processing, setProcessing] = useState(false);
    const [open, setOpen] = useState(false);
    const [pickLocation, setPickLocation] = useState()
    const [deliveryLocation, setDeliveryLocation] = useState()
    const [pickLocationDetails, setPickLocationDetails] = useState()
    const [deliveryLocationDetails, setDeliveryLocationDetails] = useState()

    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleOpen = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const getLocation = async (location) => {
        const dataToSend = {
            search_text: location,
            country_code: "ca",
            language: "en",
        };
        const res = await getWithAxios(
            "/api/place-autocomplete-api",
            dataToSend
        );

        if (res.status == "OK") {
            return res.predictions[0];
        }
    };

    const getPlaceDetails = async (placeId,placeDetailSetter) => {
        const dataToSend = {
            placeid : placeId
        }
        const res = await getWithAxios("/api/place-detail-api",dataToSend)
        
      
        if(res.status == 'OK')
        {
            placeDetailSetter(res.result)      
        }
    }

    const handleOrder = async () => {
        setProcessing(true);

        if (!from || !to || !service) {
            setProcessing(false);
            toast("Empty filed submitted", {
                type: "error",
                hideProgressBar: true,
            });
        } else {
           
           /*  const distanceData = {
                origin : pickpoint.description,
                destination : delivery.description,
            } */
           // const distance = await getWithAxios('/api/distance-between-places', distanceData)
           // console.log(distance)

            const stateDate = {
                state: {
                    parcelType: service.label,
                    pickLocation: pickLocation.description,
                    deliveryLocation: deliveryLocation.description,
                    pickId : pickLocation.place_id,
                    deliveryId : deliveryLocation.place_id,
                    pickNumber: user?.contact_number,
                    // deliveryNumber : user?.contact_number,
                    requestFrom: "create_order",
                    pickCountry: from.country.code.toLowerCase(),
                    deliveryCountry: to.country.code.toLowerCase(),
                },
            };

            await getCsrfToken();
            const user = await getUserFromAPI();

            if (user == false) {
                navigate("/account/sign-in", stateDate);
            }

            if (user) {
                navigate("/account/dashboard/place-new-order", stateDate);
            }

            setProcessing(false);
        }
    };

    useEffect(() => {
      const run = async() => {
        const res = await getLocation(from?.name)
        setPickLocation(res)
        
       }

       run()
    },[from])

    useEffect(() => {
       const run = async() => {
         const res = await getLocation(to?.name)
         setDeliveryLocation(res)
        }
        run()
     },[to])

     useEffect(() => {
        getPlaceDetails(pickLocation?.place_id,setPickLocationDetails)
       // console.log(pickLocationDetails)

    },[pickLocation])

    useEffect(() => {
        getPlaceDetails(deliveryLocation?.place_id,setDeliveryLocationDetails)
      //  console.log(deliveryLocationDetails)
    },[deliveryLocation])

    return (
        <div className="bg-gradient-to-b from-[#4caf50] to-[#388a3a] pb-24 px-24 pt-32 h-fit ">
            <div className="text-[4rem] text-white text-center mt-4 font-bold">
                Save on wolrdwide
            </div>
            <div className=" text-white text-center text-3xl  mb-4">
                shipping with {appName}
            </div>

            <div className="grid bg-white  md:grid-cols-5">
                <CityGetter
                    title={"From"}
                    selected={from}
                    setSelected={setFrom}
                />
                <CityGetter title={"To"} selected={to} setSelected={setTo} />
                <Services selected={service} setSelected={setServive} />
                <WeightGetter selected={weight} setSelected={setWeight} />
                <div>
                    <button
                        onClick={() => setOpen(true)}
                        disabled={deliveryLocationDetails?.place_id ? false : true}
                        className="py-6 md:py-0 h-full w-full  text-white font-bold bg-blue-700 hover:bg-blue-600"
                    >
                        {processing ? <Loading /> : "Create Order"}
                    </button>
                </div>
            </div>
            <QuoteModal from={pickLocationDetails} to={deliveryLocationDetails} weight={weight} service={service} open={open} setOpen={setOpen} handleCreateOrder={handleOrder} />
        </div>
    );
};

export default Brand;

const CityGetter = ({ title, selected, setSelected }) => {
    const [expanded, setExpanded] = useState(false);
    const [cities, setCities] = useState(null);
    const [p_cities, setP_cities] = useState();
    const [cityName, setCityName] = useState();

    const divRef = useRef(null);

    const handleFocus = () => {
        if (expanded) {
            divRef.current.classList.add("ring-1");
            divRef.current.classList.add("ring-blue-700");
        } else {
            divRef.current.classList.remove("ring-1");
            divRef.current.classList.remove("ring-blue-700");
        }
    };

    const handleFilter = (e) => {
        const value = e.target.value;
        setCityName(value);

        if (value == "") {
            setP_cities(cities);
        } else {
            value.toLowerCase();
            let copie = cities;

            const res = copie.filter((item) => {
                const l_item = item.name.toLowerCase();

                return l_item.includes(value);
            });

            setP_cities(res);
        }
    };

    const getCities = async () => {
        const { data } = await getWithAxios("/api/city-list");

        if (data) {
            setCities(data);
            setP_cities(data);
        }
    };

    useEffect(() => {
        handleFocus();
    }, [expanded]);

    useEffect(() => {
        setExpanded(false);
    }, [selected]);

    useEffect(() => {
        getCities();
    }, []);

    useEffect(() => {
        document.addEventListener("click", (evt) => {
            const flyoutEl = divRef.current;
            let targetEl = evt.target; // clicked element
            do {
                if (targetEl == flyoutEl) {
                    // This is a click inside, does nothing, just return.

                    return;
                }
                // Go up the DOM
                targetEl = targetEl.parentNode;
            } while (targetEl);
            // This is a click outside.
            setExpanded(false);
        });
    }, []);
    return (
        <div
            ref={divRef}
            onMouseDown={() => setExpanded(true)}
            className="relative w-full cursor-pointer"
        >
            <label htmlFor="" className="pl-3 pt-2">
                <span className="uppercase font-bold text-black text-xl">
                    {title}
                </span>
            </label>

            <div
                type="text"
                onBlur={() => setExpanded(false)}
                placeholder="tape to search"
                className="rounded-lg text-lg border-0 w-full font-bold  focus:outline-none pl-3 pb-3 pt-1"
            >
                {selected ? (
                    <div className="flex gap-2 pt-1">
                        <div>{selected.name}</div>
                    </div>
                ) : (
                    <div className="text-lg font-bold text-gray-600">
                        Type to search
                    </div>
                )}
            </div>
            {expanded && (
                <div className="bg-white max-h-[290px] z-10 shadow absolute top-24 left-0 right-0 border rounded-lg overflow-hidden overflow-y-scroll ">
                    <div className="px-4 py-2">
                        <input
                            type="text"
                            placeholder="type here"
                            className="form-control"
                            value={cityName}
                            onChange={handleFilter}
                        />
                    </div>
                    {p_cities?.map((city, index) => (
                        <div
                            key={index}
                            onMouseDown={() => setSelected(city)}
                            className="flex cursor-pointer gap-2 py-2 px-4"
                        >
                            <div>{city.name}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const Services = ({ selected, setSelected }) => {
    const [expanded, setExpanded] = useState(false);
    const divRef = useRef(null);

    const handleSelection = (parcel) => {
        setSelected(parcel);
    };

    const handleFocus = () => {
        if (expanded) {
            divRef.current.classList.add("ring-1");
            divRef.current.classList.add("ring-blue-700");
        } else {
            divRef.current.classList.remove("ring-1");
            divRef.current.classList.remove("ring-blue-700");
        }
    };
    useEffect(() => {
        handleFocus();
    }, [expanded]);

    useEffect(() => {
        setExpanded(false);
    }, [selected]);

    useEffect(() => {
        document.addEventListener("click", (evt) => {
            const flyoutEl = divRef.current;
            let targetEl = evt.target; // clicked element
            do {
                if (targetEl == flyoutEl) {
                    // This is a click inside, does nothing, just return.

                    return;
                }
                // Go up the DOM
                targetEl = targetEl.parentNode;
            } while (targetEl);
            // This is a click outside.
            setExpanded(false);
        });
    }, []);

    return (
        <div
            ref={divRef}
            onMouseDown={() => setExpanded(true)}
            className="relative w-full cursor-pointer"
        >
            <label htmlFor="" className="pl-3 pt-2">
                <span className="uppercase font-bold text-black text-xl">
                    Service
                </span>
            </label>

            <div
                type="text"
                onBlur={() => setExpanded(false)}
                placeholder="tape to search"
                className="rounded-lg  text-lg border-0 w-full font-bold  focus:outline-none pl-3 pb-3 pt-1"
            >
                {selected ? (
                    <div className="flex gap-2 pt-1">
                        <div>{selected.icon}</div>
                        <div>{selected.label}</div>
                    </div>
                ) : (
                    <div className="text-lg font-bold text-gray-600">
                        select a service
                    </div>
                )}
            </div>
            {expanded && (
                <div className="bg-white max-h-[290px] z-10 shadow absolute top-24 left-0 right-0 border rounded-lg overflow-hidden overflow-y-scroll ">
                    {parcelTypes.map((parcel, index) => (
                        <div
                            key={index}
                            onMouseDown={() => setSelected(parcel)}
                            className="flex cursor-pointer gap-2 py-2 px-4"
                        >
                            <div>{parcel.icon}</div>
                            <div>{parcel.label}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const WeightGetter = ({selected, setSelected}) => {
    const [expanded, setExpanded] = useState(false);
    const divRef = useRef(null);
    const inputRef = useRef(null);

    const handleFocus = () => {
        if (expanded) {
            divRef.current.classList.add("ring-1");
            divRef.current.classList.add("ring-blue-700");
            inputRef.current.focus();
        } else {
            divRef.current.classList.remove("ring-1");
            divRef.current.classList.remove("ring-blue-700");
            inputRef.current.blur();

        }
    };
    useEffect(() => {
        handleFocus();
    }, [expanded]);

    useEffect(() => {
        document.addEventListener("click", (evt) => {
            const flyoutEl = divRef.current;
            let targetEl = evt.target; // clicked element
            do {
                if (targetEl == flyoutEl) {
                    // This is a click inside, does nothing, just return.

                    return;
                }
                // Go up the DOM
                targetEl = targetEl.parentNode;
            } while (targetEl);
            // This is a click outside.
            setExpanded(false);
        });
    }, []);

    return (
        <div
            ref={divRef}
            onMouseDown={() => setExpanded(true)}
            className="relative w-full cursor-pointer"
        >
            <label htmlFor="" className="pl-3 pt-2">
                <span className="uppercase font-bold text-black text-xl">
                    Weight
                </span>
            </label>

            <div
                type="text"
                onBlur={() => setExpanded(false)}
                placeholder="tape to search"
                className="rounded-lg  text-lg border-0 w-full font-bold  focus:outline-none pl-3 pb-3 pt-1"
            >
                <input
                ref={inputRef}
                    type="number"
                    className="outine-none cursor-pointer border-none focus:border-none focus:outiline-none pl-3 font-bold"
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                />
            </div>
        </div>
    );
};

const QuoteModal = ({from, to, weight, service, open, setOpen, handleCreateOrder}) => {

  
    const deliveryCharges = 3.80
    const [distance, setDistance] = useState()
    const [price, setPrice] = useState()
    const [inProcess, setInProcess] = useState()


    const assignDistance = () => {
        const res = haversine_distance(from, to)
        setDistance(res)
     }

     const calculateTotalCharge = () => {
        const brut = charges(distance,weight,service) + deliveryCharges
        const result = Math.round(brut * 100) / 100
       setPrice(result)
    }

    const showPrice = () => {    
        assignDistance()
        calculateTotalCharge()
    }
    

    useEffect(() => {
        showPrice()
    },[from,to,weight,service])
    
    return(
        <Modal open={open} onClose={() => setOpen(false)} closeButton preventClose>
            <Modal.Header>
                <div className="text-lg text-appGreen font-bold">
                    Order Total charges 
                </div>
            </Modal.Header>
            <Modal.Body>
            <div className="font-bold">
                    Parcel Type : {service?.label}
                </div>
                <div className="font-bold">
                    Pick Point : {from?.formatted_address}
                </div>

                <div className="font-bold">
                    Delivery Point : {to?.formatted_address}
                </div>

                <div className="font-bold">
                    Weight : {weight? weight : null}
                </div>

                <div className="text-end text-lg font-bold text-orange-700">
                    Total price = {price ? price : 'calculating...'}
                </div>
                <div className="flex gap-4 justify-end">
                    
                    <Button auto color={'success'} onPress={handleCreateOrder}>
                        Save order
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}
