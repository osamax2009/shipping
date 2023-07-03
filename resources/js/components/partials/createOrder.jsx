import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { parcelTypes } from "../shared/constancy";
import {
    Button,
    Checkbox,
    Modal,
   
} from "@nextui-org/react";
import { toast } from "react-toastify";
import { IoAlarmOutline } from "react-icons/io5";
import { charges, haversine_distance } from "../shared/distanceCalculator";
import { getWithAxios, postWithAxios } from "../api/axios";
import PhoneInput from "react-phone-input-2";
import { todaysDate, tomorrowsDate } from "../shared/date";
import { UserContext } from "../contexts/userContext";
import { FaMinus, FaPlus, FaRegCalendarAlt } from "react-icons/fa";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { TimePicker } from "@mui/x-date-pickers";
import { FormControl, MenuItem, Select } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { AppSettingsContext } from "../contexts/appSettings";

const AdminCreateOrder = () => {
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [service, setServive] = useState();
    const [weight, setWeight] = useState(1);
    const [numberOfParcel, setNumberOfParcel] = useState(1);
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
    const [country, setCountry] = useState(user?.country_id);
    const [city, setCity] = useState(user?.city_id);
    const [vehicles, setVehicles] = useState();
    const [vehicleId, setVehicleId] = useState();
    const [extraCharges, setExtraCharges] = useState()
    const [orderExtraCharges, setOrderExtraCharges] = useState({
        express : "",
        insurance : "",
        packaging : ""
    })

    const { user, setUser } = useContext(UserContext);
    const { appSettings, setAppSettings } = useContext(AppSettingsContext);

    const navigate = useNavigate();

    const handleDeliverNow = () => {
        deliverNow ? setDeliverNow(false) : setDeliverNow(true);
    };

    const getVehicles = async () => {
        const res = await getWithAxios("/api/vehicle-list");
        setVehicles(res.data);
    };

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

    const getExtraCharges = async() => {
        const res = await getWithAxios("/api/extracharge-list")
        setExtraCharges(res.data)
        console.log(res)
    }

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
                start_time:
                    dayjs(schedule.pickDate).format("YYYY-MM-DD") +
                    " " +
                    dayjs(schedule.pickFrom).format("HH:mm"),
                end_time:
                    dayjs(schedule.pickDate).format("YYYY-MM-DD") +
                    " " +
                    dayjs(schedule.pickTo).format("HH:mm"),
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
                start_time:
                    dayjs(schedule.deliveryDate).format("YYYY-MM-DD") +
                    " " +
                    dayjs(schedule.deliveryFrom).format("HH:mm"),
                end_time:
                    dayjs(schedule.deliveryDate).format("YYYY-MM-DD") +
                    " " +
                    dayjs(schedule.deliveryTo).format("HH:mm"),
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
                country_id: country,
                city_id: city?.id,
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
                fixed_charges: city?.fixed_charges,
                parent_order_id: "",
                total_amount: price,
                save_user_address: user?.id,
                vehicle_id: vehicleId,
            },
        };

        const dataToSend = stateDate.state;
        const res = await postWithAxios("/api/order-save", dataToSend);

        if (res.order_id) {
            setProcessing(false);
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });

            const url =
                "/" + user?.user_type + "/orderdetail/order_Id/" + res.order_id;
            navigate(url);
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

    useEffect(() => {
        getVehicles();
        getExtraCharges()
    }, []);

    return (
        <div className="">
            <div className="text-appGreen text-lg mt-4 font-bold">
                Create Order {price}
            </div>
            <div>
                <div className="flex flex-wrap items-center justify-end gap-12">
                    {/*  <div className="flex h-full  gap-4 w-fit justify-between items-center font-bold text-lg text-orange-700  py-2 px-6 rounded-xl border-2 mt-4 border-gray-400">
                        <span>Price</span>{" "}
                        <span>${deliveryLocationDetails ? price : 0}</span>
                    </div> */}
                    <div className="flex items-center h-full">
                        <Button
                            auto
                            color={"success"}
                            onPress={handleOpen}
                            className=""
                        >
                            save
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex py-4 mt-2 flex-wrap gap-4">
                    <button
                        onClick={handleDeliverNow}
                        className={
                            deliverNow
                                ? "py-3 px-6 border-2 border-appGreen rounded-lg"
                                : "py-3 px-6 border-2 border-gray-400 rounded-lg"
                        }
                    >
                        <div className="flex items-center justify-between px-2 gap-4">
                            <IoAlarmOutline
                                className={
                                    deliverNow
                                        ? "text-lg text-appGreen"
                                        : "text-lg text-gray-400"
                                }
                            />
                            <div className="font-bold text-lg text-gray-400">
                                {" "}
                                Express
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={handleDeliverNow}
                        className={
                            !deliverNow
                                ? "py-3 px-6 border-2 border-appGreen rounded-lg"
                                : "py-3 px-6 border-2 border-gray-400 rounded-lg"
                        }
                    >
                        <div className="flex items-center py-2 justify-between px-2  gap-4">
                            <FaRegCalendarAlt
                                className={
                                    !deliverNow
                                        ? "text-lg text-appGreen"
                                        : "text-lg text-gray-400"
                                }
                            />
                            <div className="font-bold text-lg text-gray-400">
                                {" "}
                                Schedule
                            </div>
                        </div>
                    </button>
                </div>
                {!deliverNow && (
                    <div className="grid gap-4 pt-2 md:grid-cols-2">
                        <div className="p-2 bg-gray-100/25">
                            <div className="font-bold mb-2 text-md">
                                Pick Time
                            </div>
                            <div className="grid p-4 border-2 border-gray-300 rounded-xl ">
                                <div className="grid gap-2 font-bold">
                                    <div className="">Date</div>
                                    <DatePicker
                                        label="Date"
                                        className="w-full"
                                        value={schedule.pickDate}
                                        onChange={(e) =>
                                            setSchedule({
                                                ...schedule,
                                                pickDate: e,
                                            })
                                        }
                                    />
                                </div>

                                <div className="grid gap-4  md:grid-cols-2 mt-3">
                                    <div className="grid gap-2 font-bold">
                                        <div>From</div>
                                        <TimePicker
                                            required
                                            label="From"
                                            className="w-full"
                                            value={schedule.pickFrom}
                                            onChange={(e) =>
                                                setSchedule({
                                                    ...schedule,
                                                    pickFrom: e,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="grid gap-2 font-bold">
                                        <div>To</div>
                                        <TimePicker
                                            required
                                            className="w-full"
                                            label="To"
                                            value={schedule.pickTo}
                                            onChange={(e) =>
                                                setSchedule({
                                                    ...schedule,
                                                    pickTo: e,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-2 bg-gray-100/25">
                            <div className="font-bold mb-2 text-md">
                                Deliver Time
                            </div>
                            <div className="grid p-4 border-2 border-gray-300 rounded-xl ">
                                <div className="grid gap-2 font-bold">
                                    <div className="">Date</div>
                                    <DatePicker
                                        label="Date"
                                        className="w-full"
                                        value={schedule.deliverDate}
                                        onChange={(e) =>
                                            setSchedule({
                                                ...schedule,
                                                deliverDate: e,
                                            })
                                        }
                                    />
                                </div>

                                <div className="grid gap-4  md:grid-cols-2 mt-3">
                                    <div className="grid gap-2 font-bold">
                                        <div>From</div>
                                        <TimePicker
                                            required
                                            label="From"
                                            className="w-full"
                                            value={schedule.deliverFrom}
                                            onChange={(e) =>
                                                setSchedule({
                                                    ...schedule,
                                                    deliverFrom: e,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="grid gap-2 font-bold">
                                        <div>To</div>
                                        <TimePicker
                                            required
                                            className="w-full"
                                            label="To"
                                            value={schedule.deliverTo}
                                            onChange={(e) =>
                                                setSchedule({
                                                    ...schedule,
                                                    deliverTo: e,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
                <NumberInput
                    title={"Weight"}
                    value={weight}
                    setValue={setWeight}
                />
                <NumberInput
                    title={"Number of parcels"}
                    value={numberOfParcel}
                    setValue={setNumberOfParcel}
                />
            </div>

            <ParcelType value={service} setValue={setServive} />

            <CountryAndCity
                country={country}
                setCountry={setCountry}
                city={city}
                setCity={setCity}
            />
            <div className="grid mt-4 md:grid-cols-2 gap-4">
                <PositionInformations
                    title={"Pickup"}
                    selected={from}
                    setSelected={setFrom}
                    phoneValue={pickNumber}
                    setPhoneValue={setPickNumber}
                    descriptionValue={pickDescription}
                    setDescriptionValue={setPickDescription}
                />
                <PositionInformations
                    title={"Delivery"}
                    selected={to}
                    setSelected={setTo}
                    phoneValue={deliveryNumber}
                    setPhoneValue={setDeliveryNumber}
                    descriptionValue={deliveryDescription}
                    setDescriptionValue={setDeliveryDescription}
                />
            </div>

            <div className="grid gap-4 items-center md:grid-cols-3">
                <div className="py-4 font-bold">
                    <div>Payment collect from</div>
                    <div>
                        <FormControl sx={{ m: 1 }} className="w-full">
                            <Select
                                inputProps={{ "aria-label": "Without label" }}
                                value={receivePaymentFrom}
                                label="Age"
                                onChange={(e) =>
                                    setReceivePaymentFrom(e.target.value)
                                }
                            >
                                <MenuItem defaultChecked value={"on_pickup"}>
                                    On Pickup
                                </MenuItem>
                                <MenuItem defaultChecked value={"on_delivery"}>
                                    On Delivery
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div>
                    {appSettings?.is_vehicle_in_order == "1" && (
                        <div className="py-4 font-bold">
                            <div>Vehicle</div>
                            <div>
                                <FormControl sx={{ m: 1 }} className="w-full">
                                    <Select
                                        inputProps={{
                                            "aria-label": "Without label",
                                        }}
                                        value={vehicleId}
                                        label="Age"
                                        onChange={(e) =>
                                            setVehicleId(e.target.value)
                                        }
                                    >
                                        {vehicles?.map((vehicle, index) => (
                                            <MenuItem
                                                key={index}
                                                defaultChecked
                                                value={vehicle.id}
                                            >
                                                {vehicle.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    )}
                </div>
                <div className="py-2 px-6">
                    <div className="font-bold text-lg py-4">Extra Charges</div>
                    <div className="flex flex-wrap gap-4 items-center">
                        {
                            extraCharges?.map((extraCharge, index) => {
                                if (extraCharge.title !== "GST" && extraCharge.title !== "PST")
                                {
                                    return  <div key={index}>
                                    <Checkbox
                                        defaultSelected
                                        label={extraCharge.title}
                                        value={extraCharge.charges}
                                        onChange={e => setOrderExtraCharges({...orderExtraCharges, e})}
                                    />
                                    <div> ( + {appSettings?.currency} {extraCharge.charges}) </div>
                                </div>
                                }
                            })
                        }
                       

                        {/* <div>
                            <Checkbox defaultSelected label="Add Insurance" />
                            <div> ( + {appSettings?.currency}20) </div>
                        </div>

                        <div>
                            <Checkbox defaultSelected label="Add Insurance" />
                            <div> ( + {appSettings?.currency}20) </div>
                        </div> */}
                    </div>
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
                handleOrder={handleOrder}
                city={city}
            />
        </div>
    );
};

export default AdminCreateOrder;


const CityGetter = ({ selected, setSelected }) => {
    const [expanded, setExpanded] = useState(false);
    const [cities, setCities] = useState(null);
    const [p_cities, setP_cities] = useState();
    const [cityName, setCityName] = useState();
    const [places, setPlaces] = useState();
    const [place, setPlace] = useState();

    const divRef = useRef(null);

    const getPlaces = async () => {
        const dataToSend = {
            search_text: cityName,
            country_code: "ca",
            language: "en",
        };
        const res = await getWithAxios(
            "/api/place-autocomplete-api",
            dataToSend
        );

        if (res.status == "OK") {
            setPlaces(res.predictions);
        }
    };

    useEffect(() => {
        if (expanded) {
            getPlaces();
        }
    }, [cityName]);

    useEffect(() => {
        setCityName(selected?.description);
        setExpanded(false);
    }, [selected]);

    return (
        <div ref={divRef} className="relative w-full cursor-pointer">
            <input
                type="text"
                className="outline-none w-full bg-white/50 text-black font-bold focus:outile-none border py-2 rounded-lg border-gray-400 focus:border-appGreen"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                onFocus={() => setExpanded(true)}
            />
            {expanded && places?.length > 0 ? (
                <div className="bg-white max-h-[290px] z-10 shadow absolute top-24 left-0 right-0 border rounded-lg overflow-hidden overflow-y-scroll ">
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
            ) : null}
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
    handleOrder,
    city
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
        const brut = charges(distance, weight, service,city) + deliveryCharges;
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
            className="overflow-y-scroll"
        >
            <Modal.Header>
                <div className="text-lg text-appGreen font-bold">
                   Order Summary
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="grid gap-6">
                    <div className="flex justify-between">
                        <div>
                            Delivery charges
                        </div>
                        <div>
                            {price}
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="font-bold">
                            Delivery charges
                        </div>
                        <div>
                            {price}
                        </div>
                    </div>

                    <div className="flex justify-between font-bold">
                        <div>
                           Total
                        </div>
                        <div>
                            {price}
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex w-full gap-4 justify-end">
                    <Button css={{ backgroundColor : "white" }} onPress={() => setOpen(false)} className="border border-gray-200" >
                        <div className="font-bold text-gray-400">
                            Cancel
                        </div>
                    </Button>

                    <Button color={"success"} onPress={handleCreateOrder}>
                        <div className="font-bold">
                            Create
                        </div>
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

const NumberInput = ({ title, value, setValue }) => {
    const minus = () => {
        if (value > 1) {
            setValue((v) => v - 1);
        }
    };

    const add = () => {
        setValue((v) => v + 1);
    };
    return (
        <div className="grid grid-cols-7 divide-x-2 w-full divide-gray-400 rounded-xl  text-gray-500 font-bold border-2 border-gray-400">
            <div className="col-span-4 text-md py-3 pl-4">{title}</div>
            <div>
                <button
                    onClick={minus}
                    className="flex justify-center items-center w-full h-full"
                >
                    <FaMinus className="text-center" />
                </button>
            </div>
            <div className="relative h-full">
                <input
                    type="number"
                    className=" absolute left-0 right-0 top-0 bottom-0 outline-none text-center border-0 bg-transparent focus:outline-none focus:border-b-2 focus:border-appGreen"
                    color="success"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    underlined
                />
            </div>
            <div>
                <button
                    onClick={add}
                    className="flex justify-center items-center w-full h-full"
                >
                    <FaPlus />
                </button>
            </div>
        </div>
    );
};

const ParcelType = ({ value, setValue }) => {
    return (
        <div className="py-4 w-full">
            <div className="font-bold mb-2">Parcel Type</div>

            <FormControl sx={{ m: 1 }} className="w-full">
                <Select
                    inputProps={{ "aria-label": "Without label" }}
                    value={value?.label}
                    label="Age"
                    onChange={(e) => setValue(e.target.value)}
                >
                    {parcelTypes?.map((parcel, index) => (
                        <MenuItem
                            key={index}
                            defaultChecked={index == 0 ? true : false}
                            value={parcel}
                        >
                            {" "}
                            {parcel.label}{" "}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

const CountryAndCity = ({ country, setCountry, city, setCity }) => {
    const [cities, setCities] = useState(null);
    const [countries, setCountries] = useState(null);

    const getCountries = async () => {
        const res = await getWithAxios("/api/country-list");
        setCountries(res.data);
    };

    const getCities = async () => {
        if (country) {
            const res = await getWithAxios("/api/city-list", {
                country_id: country,
            });
            setCities(res.data);
        } else {
            const res = await getWithAxios("/api/city-list");
            setCities(res.data);
        }
    };

    useEffect(() => {
        getCountries();
    }, []);

    useEffect(() => {
        getCities();
        if (cities?.length > 0) {
            setCity(cities[0]);
        }
    }, [country]);

    return (
        <div className="grid gap-4 font-bold md:grid-cols-2 lg:grid-cols-3">
            <div className="grid">
                <div>Country</div>
                <div>
                    <FormControl sx={{ m: 1 }} className="w-full">
                        <Select
                            inputProps={{ "aria-label": "Without label" }}
                            value={country}
                            label="Age"
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            {countries?.map((country, index) => (
                                <MenuItem
                                    key={index}
                                    defaultChecked={
                                        country.id == 2 ? true : false
                                    }
                                    value={country.id}
                                >
                                    {" "}
                                    {country.name}{" "}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>

            <div className="grid">
                <div>City</div>
                <div>
                    <FormControl sx={{ m: 1 }} className="w-full">
                        <Select
                            inputProps={{ "aria-label": "Without label" }}
                            value={city}
                            label="Age"
                            onChange={(e) => setCity(e.target.value)}
                        >
                            {cities?.map((city, index) => (
                                <MenuItem key={index} value={city}>
                                    {" "}
                                    {city.name}{" "}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>
        </div>
    );
};

const PositionInformations = ({
    title,
    selected,
    setSelected,
    phoneValue,
    setPhoneValue,
    descriptionValue,
    setDescriptionValue,
}) => {
    return (
        <div>
            <div className="font-bold">{title} Information</div>
            <div className="grid gap-4 mt-2 p-4 border-2 rounded-xl">
                <div>{title} Location</div>
                <CityGetter
                    title={title}
                    selected={selected}
                    setSelected={setSelected}
                />
                <div>
                    <div className="py-2">
                        {title} Contact Number {phoneValue}{" "}
                    </div>
                    <MuiTelInput
                        value={phoneValue}
                        /* inputProps={{
                            required: true,
                        }} */
                        /*  country={"pk"} */
                        className="!outline-none focus:!outline-none w-full"
                        forceCallingCode
                        defaultCountry="IN"
                        onChange={(e) => setPhoneValue(e)}
                    />
                </div>
                <div>
                    <div>{title} Description</div>
                    <textarea
                        name=""
                        value={descriptionValue}
                        onChange={(e) => setDescriptionValue(e.target.value)}
                        className="w-full border resize-none border-gray-400 rounded-xl"
                        id=""
                        rows="2"
                    ></textarea>
                </div>
                <div></div>
            </div>
        </div>
    );
};
