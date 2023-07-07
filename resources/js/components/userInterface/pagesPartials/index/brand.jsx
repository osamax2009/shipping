import { useContext, useEffect, useMemo, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { appName, parcelTypes } from "../../../shared/constancy";
import {
    Button,
    Dropdown,
    Input,
    Loading,
    Modal,
    Radio,
} from "@nextui-org/react";
import { toast } from "react-toastify";

import {
    calculateCharges,
    haversine_distance,
} from "../../../shared/distanceCalculator";
import {
    getCsrfToken,
    getUserFromAPI,
    getWithAxios,
    postWithAxios,
} from "../../../api/axios";
import PhoneInput from "react-phone-input-2";
import { todaysDate, tomorrowsDate } from "../../../shared/date";
import { UserContext } from "../../../contexts/userContext";
import { AppSettingsContext } from "../../../contexts/appSettings";

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
    const [distance, setDistance] = useState();
    const [receivePaymentFrom, setReceivePaymentFrom] = useState("on_pickup");
    const [price, setPrice] = useState();
    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleOpen = () => {
        if (!from || !to || !service || !weight) {
            toast("Empty field submitted", {
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

    const pickupDPoint = () => {
        if (schedule.pickDate) {
            return {
                start_time: schedule.pickDate + " " + schedule.pickFrom,
                end_time: schedule.pickDate + " " + schedule.pickTo,
                address: pickLocationDetails.formatted_address,
                latitude: pickLocationDetails.geometry.location.lat,
                longitude: pickLocationDetails.geometry.location.lng,
                description: pickDescription,
                contact_number: pickNumber,
            };
        } else {
            return {
                date: todaysDate(),
                address: pickLocationDetails.formatted_address,
                latitude: pickLocationDetails.geometry.location.lat,
                longitude: pickLocationDetails.geometry.location.lng,
                description: pickDescription,
                contact_number: pickNumber,
            };
        }
    };

    const deliveryPoint = () => {
        if (schedule.deliverDate) {
            return {
                start_time: schedule.deliveryDate + " " + schedule.deliveryFrom,
                end_time: schedule.deliveryDate + " " + schedule.deliveryTo,
                address: deliveryLocationDetails.formatted_address,
                latitude: deliveryLocationDetails.geometry.location.lat,
                longitude: deliveryLocationDetails.geometry.location.lng,
                description: deliveryDescription,
                contact_number: deliveryNumber,
            };
        } else {
            return {
                date: tomorrowsDate(),
                address: deliveryLocationDetails.formatted_address,
                latitude: deliveryLocationDetails.geometry.location.lat,
                longitude: deliveryLocationDetails.geometry.location.lng,
                description: deliveryDescription,
                contact_number: deliveryNumber,
            };
        }
    };

    let currentDate = new Date().toJSON().slice(0, 10);

    const handleOrder = async () => {
        setOpen(false);
        setProcessing(true);

        const stateDate = {
            state: {
                client_id: user?.id,
                date: currentDate,
                country_id: user?.country_id,
                city_id: user?.city_id,
                pickup_point: pickupDPoint(),
                delivery_point: deliveryPoint(),
                extra_charges: [],
                parcel_type: service.value,
                total_weight: weight,
                total_distance: distance,
                payment_collect_from: receivePaymentFrom,
                status: "create",
                payment_type: "",
                payment_status: "",
                fixed_charges: 3.8,
                parent_order_id: "",
                total_amount: price,
                save_user_address: user?.id,
            },
        };

        await getCsrfToken();
        const user = await getUserFromAPI();

        if (user == false) {
            navigate("/account/sign-in", stateDate);
        }

        if (user) {
            const dataToSend = stateDate.state;
            const res = await postWithAxios("/api/order-save", dataToSend);

            if (res.order_id) {
                setProcessing(false);
                toast(res.message, {
                    type: "success",
                    hideProgressBar: true,
                });

                const url = "/" + user.user_type + "orderdetail/order_Id/" + res.order_Id
                navigate(url)
            }
        }
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
        <div className="bg-gradient-to-b from-[#4caf50] to-[#388a3a] pb-24 px-8 md:px-12 lg:px-24 pt-32 h-fit " id="createOrder">
            <div className="text-4xl text-white md:text-center mt-4 font-bold">
                Save on wolrdwide
            </div>
            <div className=" text-white text-lg text-center">
                shipping with {appName}
            </div>

            <div className="grid bg-white mt-6  md:grid-cols-2 lg:grid-cols-5">
                <CityGetter
                    title={"Pickup Address"}
                    selected={from}
                    setSelected={setFrom}
                />
                <CityGetter title={"Delivery Address"} selected={to} setSelected={setTo} />
                <Services selected={service} setSelected={setServive} />
                <WeightGetter selected={weight} setSelected={setWeight} />
                <div className="md:col-span-2 lg:col-span-1">
                    <button
                        onClick={handleOpen}
                        className="py-6  lg:py-0 h-full w-full  text-white font-bold bg-blue-700 hover:bg-blue-600"
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
                distance={distance}
                setDistance={setDistance}
                receivePaymentFrom={receivePaymentFrom}
                setReceivePaymentFrom={setReceivePaymentFrom}
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
            <div className="pl-3 pt-2">
                <span className="uppercase font-bold text-black text-lg">
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
                    <div className="flex gap-2 pt-1 text-md">
                        <div>{selected.description}</div>
                    </div>
                ) : (
                    <div className="text-md font-bold pt-1 text-gray-600">
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
            <div className="pl-3 pt-2">
                <span className="uppercase font-bold text-black text-lg">
                    Package Type
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

const WeightGetter = ({ selected, setSelected }) => {
    const [expanded, setExpanded] = useState(false);
    const divRef = useRef(null);
    const inputRef = useRef(null);

    const {appSettings, setAppSettings} = useContext(AppSettingsContext)
  

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
            <div className="pl-3 pt-2">
                <span className="uppercase font-bold text-black text-lg">
                    Weight {appSettings?.weight == "kg" ? "(KG)" : "(LBS)"}
                </span>
            </div>

            <div
                type="text"
                onBlur={() => setExpanded(false)}
                placeholder="tape to search"
                className="rounded-lg  text-lg border-0 w-fit font-bold  focus:outline-none pl-3 pb-3 pt-1"
            >
                <input
                    ref={inputRef}
                    type="number"
                    className="form-control"
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
    distance,
    setDistance,
    receivePaymentFrom,
    setReceivePaymentFrom,
}) => {
    const deliveryCharges = 3.8;
    const [inProcess, setInProcess] = useState();

    const handleDeliverNow = () => {
        deliverNow ? setDeliverNow(false) : setDeliverNow(true);
    };

    const assignDistance = () => {
        const res = haversine_distance(from, to);
        setDistance(res);
    };

    const calculateTotalCharge = () => {
        const brut = calculateCharges(distance, weight, service) + deliveryCharges;
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
                            <div className=" text-center font-bold mb-4 text-lg">
                                Pick Time
                            </div>
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
                                    <div>From</div>
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
                                    <div>To</div>
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
                            <div className="mb-4 text-center font-bold text-lg">
                                Deliver Time
                            </div>
                            <div className="grid">
                                <div className="grid gap-2 font-bold">
                                    <div>Date</div>
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
                                    <div>From</div>
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
                                    <div>To</div>
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
                        <div>Pickup Contact Number</div>

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
                        <div>Delivery Contact Number</div>
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
                        <div>Pickup description</div>
                        <textarea
                            rows="2"
                            className="form-control w-full resize-none"
                            value={pickDescription}
                            onChange={(e) => setPickDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <div>Delivery description</div>
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
                <div className="py-6">
                    <div className="text-black text-lg font-bold">
                        Collect payment from
                    </div>
                    <select
                        className="form-control"
                        value={receivePaymentFrom}
                        onChange={(e) => setReceivePaymentFrom(e.target.value)}
                    >
                        <option value="on_pickup">On PickUp</option>
                        <option value="on_delivery">On Delivery</option>
                    </select>
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
