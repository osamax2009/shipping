import { useEffect, useMemo, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    Bs1CircleFill,
    Bs2CircleFill,
    Bs4CircleFill,
    BsFill3CircleFill,
} from "react-icons/bs";

import { appName, parcelTypes } from "../../../shared/constancy";
import { Button, Input, Loading, Modal, Radio } from "@nextui-org/react";
import { toast } from "react-toastify";

import {
    charges,
    haversine_distance,
} from "../../../shared/distanceCalculator";
import { getCsrfToken, getUserFromAPI, getWithAxios } from "../../../api/axios";
import PhoneInput from "react-phone-input-2";

const Brand = () => {
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [service, setServive] = useState();
    const [weight, setWeight] = useState(1);
    const [processing, setProcessing] = useState(false);
    const [open, setOpen] = useState(false);
    const [pickLocationDetails, setPickLocationDetails] = useState();
    const [deliveryLocationDetails, setDeliveryLocationDetails] = useState();
    const [schedule, setSchedule] = useState({
        pickDate: null,
        pickFrom: null,
        pickTo: null,
        deliverDate: null,
        deliverFrom: null,
        deliverTo: null,
    });

    const [deliverNow, setDeliverNow] = useState(true);
    const [pickNumber, setPickNumber] = useState();
    const [pickDescription, setPickDescription] = useState();
    const [deliveryNumber, setDeliveryNumber] = useState();
    const [deliveryDescription, setDeliveryDescription] = useState();

    const [price, setPrice] = useState();

    const navigate = useNavigate();

    const handleOpen = () => {
        if (!from || !to || !service || !weight) {
            setProcessing(false);
            toast("Empty filed submitted", {
                type: "error",
                hideProgressBar: true,
            });
        } else {
            setOpen(true);
        }
    };

    const getPlaceDetails = async (placeId, placeDetailSetter) => {
        const dataToSend = {
            placeid: placeId,
        };
        const res = await getWithAxios("/api/place-detail-api", dataToSend);

        if (res.status == "OK") {
            placeDetailSetter(res.result);
        }
    };

    const handleOrder = async () => {
        setOpen(false);
        setProcessing(true);

        const stateDate = {
            state: {
                parcel: service,
                pickLocation: pickLocationDetails,
                deliveryLocation: deliveryLocationDetails,
                service: service,
                weight: weight,
                price: price,
                requestFrom: "create_order",
            },
        };

        await getCsrfToken();
        const user = await getUserFromAPI();

        if (user == false) {
            navigate("/account/sign-in", stateDate);
        }

        if (user) {
            navigate("/account/dashboard/new-order-resume", stateDate);
        }

        setProcessing(false);
    };

    useEffect(() => {
        getPlaceDetails(from?.place_id, setPickLocationDetails);
        // console.log(pickLocationDetails)
    }, [from]);

    useEffect(() => {
        getPlaceDetails(to?.place_id, setDeliveryLocationDetails);
        //  console.log(deliveryLocationDetails)
    }, [to]);

    return (
        <div className="bg-gradient-to-b from-[#4caf50] to-[#388a3a] pb-24 px-24 pt-32 h-fit ">
            <div className="text-[4rem] text-white text-center mt-4 font-bold">
                Save on wolrdwide
            </div>
            <div className=" text-white text-3xl text-center">
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
                        onClick={handleOpen}
                        className="py-6 md:py-0 h-full w-full  text-white font-bold bg-blue-700 hover:bg-blue-600"
                    >
                        {processing ? <Loading /> : "Create Order"}
                    </button>
                </div>
            </div>
            <QuoteModal
                from={pickLocationDetails}
                to={deliveryLocationDetails}
                price={price}
                setPrice={setPrice}
                weight={weight}
                service={service}
                open={open}
                setOpen={setOpen}
                pickNumber={pickNumber}
                deliveryNumber={deliveryNumber}
                pickDescription={pickDescription}
                deliveryDescription={deliveryDescription}
                deliverNow={deliverNow}
                schedule={schedule}
                setPickNumber={setPickNumber}
                setDeliveryNumber={setDeliveryNumber}
                setPickDescription={setPickDescription}
                setDeliveryDescription={setDeliveryDescription}
                setDeliverNow={setDeliverNow}
                setSchedule={setSchedule}
                handleCreateOrder={handleOrder}
            />
        </div>
    );
};

export default Brand;

const CityGetter = ({ title, selected, setSelected }) => {
    const [expanded, setExpanded] = useState(false);
    const [cities, setCities] = useState(null);
    const [p_cities, setP_cities] = useState();
    const [cityName, setCityName] = useState();
    const [places, setPlaces] = useState();
    const [place, setPlace] = useState();

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

    /* const handleFilter = (e) => {
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
    }; */

    const getPlaces = async (e, locationSetter, locationsSetter) => {
        locationSetter(e.target.value);
        const dataToSend = {
            search_text: e.target.value,
            country_code: "ca",
            language: "en",
        };
        const res = await getWithAxios(
            "/api/place-autocomplete-api",
            dataToSend
        );

        if (res.status == "OK") {
            locationsSetter(res.predictions);
        }
    };

    /* const getCities = async () => {
        const { data } = await getWithAxios("/api/city-list");

        if (data) {
            setCities(data);
            setP_cities(data);
        }
    }; */

    useEffect(() => {
        handleFocus();
    }, [expanded]);

    useEffect(() => {
        setExpanded(false);
    }, [selected]);

    /*     useEffect(() => {
        getCities();
    }, []); */

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
            <div  className="pl-3 pt-2">
                <span className="uppercase font-bold text-black text-xl">
                    {title}
                </span>
            </div>

            <div
                type="text"
                onBlur={() => setExpanded(false)}
                placeholder="tape to search"
                className="rounded-lg text-lg border-0 w-full font-bold  focus:outline-none pl-3 pb-3 pt-1"
            >
                {selected ? (
                    <div className="flex gap-2 pt-1 text-sm">
                        <div>{selected.description}</div>
                    </div>
                ) : (
                    <div className="text-sm font-bold text-gray-600">
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
                            value={place}
                            onChange={(e) => getPlaces(e, setPlace, setPlaces)}
                        />
                    </div>
                    {places?.map((place, index) => (
                        <div
                            key={index}
                            onMouseDown={() => setSelected(place)}
                            className="flex hover:bg-gray-100 cursor-pointer gap-2 py-3 px-4"
                        >
                            <div>{place.description}</div>
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
            <div  className="pl-3 pt-2">
                <span className="uppercase font-bold text-black text-xl">
                    Service
                </span>
            </div>

            <div
                type="text"
                onBlur={() => setExpanded(false)}
                placeholder="tape to search"
                className="rounded-lg  text-lg border-0 w-full font-bold  focus:outline-none pl-3 pb-3 pt-1"
            >
                {selected ? (
                    <div className="flex gap-2 pt-1">
                        <div>{selected.icon}</div>
                        <div>{selected.div}</div>
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
                            <div>{parcel.div}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const WeightGetter = ({ selected, setSelected }) => {
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
            <div  className="pl-3 pt-2">
                <span className="uppercase font-bold text-black text-xl">
                    Weight
                </span>
            </div>

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

const QuoteModal = ({
    from,
    to,
    weight,
    service,
    open,
    setOpen,
    price,
    setPrice,
    handleCreateOrder,
    deliverNow,
    setDeliverNow,
    setPickNumber,
    pickNumber,
    pickDescription,
    setPickDescription,
    deliveryNumber,
    setDeliveryNumber,
    deliveryDescription,
    setDeliveryDescription,
    schedule,
    setSchedule,
}) => {
    const deliveryCharges = 3.8;
    const [distance, setDistance] = useState();
    const [inProcess, setInProcess] = useState();

    const handleDeliverNow = () => {
        deliverNow ? setDeliverNow(false) : setDeliverNow(true);
    };

    const assignDistance = () => {
        const res = haversine_distance(from, to);
        setDistance(res);
    };

    const calculateTotalCharge = () => {
        const brut = charges(distance, weight, service) + deliveryCharges;
        const result = Math.round(brut * 100) / 100;
        setPrice(result);
    };

    const showPrice = () => {
        assignDistance();
        calculateTotalCharge();
    };

    useEffect(() => {
        showPrice();
    }, [from, to, weight, service]);

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            closeButton
            preventClose
            width="70vw"
            className="overflow-y-scroll"
        >
            <Modal.Header>
                <div className="text-lg text-appGreen font-bold">
                    Order Total charges
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="font-bold">Parcel Type : {service?.label}</div>
                <div className="font-bold">
                    Pick Point : {from?.formatted_address}
                </div>

                <div className="font-bold">
                    Delivery Point : {to?.formatted_address}
                </div>

                <div className="font-bold">
                    Weight : {weight ? weight : null} kg
                </div>

                <div className="text-end text-2xl font-bold text-orange-700">
                    $ Total price = {price ? price : "calculating..."}
                </div>
                <div className="text-lg">Additional informations</div>

                <div>
                    <Radio.Group
                        defaultValue="now"
                        orientation="horizontal"
                        onChange={handleDeliverNow}
                        color="success"
                    >
                        <Radio value="now">Deliver now</Radio>
                        <Radio value="schedule">Schedule</Radio>
                    </Radio.Group>
                </div>
                {!deliverNow && (
                    <div className="grid gap-4 px-2 pt-4 md:grid-cols-2">
                        <div className="p-2 bg-gray-100/25">
                            <div className=" text-center font-bold mb-4 text-xl">Pick Time</div>
                            <div className="grid ">
                                <div className="grid gap-2 font-bold">
                                    <div className="">Date</div>
                                    <Input
                                        status="secondary"
                                        required
                                        className="w-full"
                                        type="date"
                                        placeholder="from"
                                        value={schedule.pickDate}
                                        onChange={(e) =>
                                            setSchedule({
                                                ...schedule,
                                                pickDate: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div className="grid gap-2 font-bold">
                                    <div >From</div>
                                    <Input
                                        required
                                        className="w-full"
                                        type="time"
                                        status="secondary"
                                        placeholder="from"
                                        value={schedule.pickFrom}
                                        onChange={(e) =>
                                            setSchedule({
                                                ...schedule,
                                                pickFrom: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="grid gap-2 font-bold">
                                    <div >To</div>
                                    <Input
                                        required
                                        className="w-full"
                                        type="time"
                                        status="secondary"
                                        placeholder="to"
                                        value={schedule.pickTo}
                                        onChange={(e) =>
                                            setSchedule({
                                                ...schedule,
                                                pickTo: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-2 bg-gray-100/25">
                            <div className="mb-4 text-center font-bold text-xl">Deliver Time</div>
                            <div className="grid">
                                <div className="grid gap-2 font-bold">
                                    <div >Date</div>
                                    <Input
                                        status="secondary"
                                        required
                                        className="w-full"
                                        type="date"
                                        placeholder="from"
                                        value={schedule.deliverDate}
                                        onChange={(e) =>
                                            setSchedule({
                                                ...schedule,
                                                deliverDate: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div className="grid gap-2 font-bold">
                                    <div >From</div>
                                    <Input
                                        required
                                        className="w-full"
                                        type="time"
                                        status="secondary"
                                        placeholder="from"
                                        value={schedule.deliverFrom}
                                        onChange={(e) =>
                                            setSchedule({
                                                ...schedule,
                                                deliverFrom: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="grid gap-2 font-bold">
                                    <div >To</div>
                                    <Input
                                        required
                                        className="w-full"
                                        type="time"
                                        status="secondary"
                                        placeholder="to"
                                        value={schedule.deliverTo}
                                        onChange={(e) =>
                                            setSchedule({
                                                ...schedule,
                                                deliverTo: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="form-group">
                        <div >Pickup Contact Number</div>

                        <PhoneInput
                            value={pickNumber}
                            inputProps={{
                                required: true,
                            }}
                            country={"ca"}
                            inputStyle={{}}
                            onChange={(e) => setPickNumber(e)}
                        />
                    </div>
                    <div className="form-group">
                        <div >Delivery Contact Number</div>
                        <PhoneInput
                            inputProps={{
                                required: true,
                            }}
                            country={"ca"}
                            value={deliveryNumber}
                            onChange={(e) => setDeliveryNumber(e)}
                        />
                    </div>
                    <div className="form-group">
                        <div >Pickup description</div>
                        <textarea
                          
                            rows="2"
                            className="form-control w-full resize-none"
                            value={pickDescription}
                            onChange={(e) => setPickDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <div >Delivery description</div>
                        <textarea
                            
                            rows="2"
                            className="form-control w-full resize-none"
                            value={deliveryDescription}
                            onChange={(e) =>
                                setDeliveryDescription(e.target.value)
                            }
                        ></textarea>
                    </div>
                    
                </div>

                <div className="flex gap-4 justify-end">
                    <Button auto color={"success"} onPress={handleCreateOrder}>
                        Save order
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};
