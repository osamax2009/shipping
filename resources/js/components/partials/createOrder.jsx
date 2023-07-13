import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { parcelTypes } from "../shared/constancy";
import { Button, Checkbox, Loading, Modal } from "@nextui-org/react";
import { toast } from "react-toastify";
import { IoAlarmOutline } from "react-icons/io5";
import {
    calculateCharges,
    haversine_distance,
} from "../shared/distanceCalculator";
import { getWithAxios, postWithAxios } from "../api/axios";
import { todaysDate, tomorrowsDate } from "../shared/date";
import { UserContext } from "../contexts/userContext";
import { FaMinus, FaPlus, FaRegCalendarAlt } from "react-icons/fa";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { TimePicker } from "@mui/x-date-pickers";
import { FormControl, MenuItem, Select } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { AppSettingsContext } from "../contexts/appSettings";
import { PhoneInput } from "react-contact-number-input";
import { useLayoutEffect } from "react";

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
    const [extraCharges, setExtraCharges] = useState();
    const [orderExtraCharges, setOrderExtraCharges] = useState(0);
    const [listOfExtraCharges, setListOfExtraCharges] = useState([]);
    const [gst, setGst] = useState();
    const [pst, setPst] = useState();

    const [gstCharge, setGstCharge] = useState();
    const [pstCharge, setPstCharge] = useState();

    const [charges, setCharges] = useState();

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
        if (!from || !to || !service || !weight || !city) {
            toast("Empty field submitted", {
                type: "error",
                hideProgressBar: true,
            });
        } else {
            setOpen(true);
        }
    };

    const getExtraCharges = async () => {
        const res = await getWithAxios("/api/extracharge-list");
        setExtraCharges(res.data);

        let value = 0;
        let list = [];

        res.data.map((extraCharge) => {
            if (extraCharge.title !== "GST" && extraCharge.title !== "PST") {
                value = value + extraCharge?.charges;
                list.push(extraCharge?.title);
            }

            if (extraCharge.title == "GST") {
                setGst(extraCharge);
            }

            if (extraCharge.title == "PST") {
                setPst(extraCharge);
            }
        });

        setOrderExtraCharges(value);
        setListOfExtraCharges(list);
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
                contact_number: pickNumber.phoneNumber,
            };
        } else {
            return {
                date: todaysDate(),
                address: pickLocationDetails.formatted_address,
                latitude: pickLocationDetails.geometry.location.lat,
                longitude: pickLocationDetails.geometry.location.lng,
                description: pickDescription,
                contact_number: pickNumber.phoneNumber,
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
                contact_number: deliveryNumber.phoneNumber,
            };
        } else {
            return {
                date: tomorrowsDate(),
                address: deliveryLocationDetails.formatted_address,
                latitude: deliveryLocationDetails.geometry.location.lat,
                longitude: deliveryLocationDetails.geometry.location.lng,
                description: deliveryDescription,
                contact_number: deliveryNumber.phoneNumber,
            };
        }
    };

    const assignDistance = () => {
        const res = haversine_distance(
            pickLocationDetails,
            deliveryLocationDetails
        );
        setDistance(res);
    };

    const calculateTotalCharge = () => {
        const distanceRes = haversine_distance(
            pickLocationDetails,
            deliveryLocationDetails
        );
        const brut = calculateCharges(distanceRes, weight, city);

        const fixed_charges = Math.round(brut.fixed_charges * 100) / 100;
        const distance_charges = Math.round(brut.distance_charges * 100) / 100;
        const weight_charges = Math.round(brut.weight_charges * 100) / 100;

        const c = {
            fixed_charges: fixed_charges,
            distance_charges: distance_charges,
            weight_charges: weight_charges,
        };

        setCharges(c);

        const unround =
            brut.fixed_charges + brut.distance_charges + brut.weight_charges;

        const result = Math.round(unround * 100) / 100;

        const brutGst = (result * gst?.charges) / 100;
        const brutPst = (result * pst?.charges) / 100;
        const netGst = Math.round(brutGst * 100) / 100;
        const netPst = Math.round(brutPst * 100) / 100;
        setGstCharge(netGst);
        setPstCharge(netPst);
        setPrice(result);
    };

    const showPrice = () => {
        calculateTotalCharge();
    };

    let currentDate = new Date().toJSON().slice(0, 10);

    const extraChargesData = () => {
        const array = [];
        extraCharges?.map((extra) => {
            if (listOfExtraCharges.includes(extra.title)) {
                const c = {
                    title: extra?.title,
                    value: extra?.charges,
                };
                array.push(c);
            }
        });

        const GST = {
            title: "GST",
            value: gstCharge,
        };
        array.push(GST);

        const PST = {
            title: "PST",
            value: pstCharge,
        };

        array.push(PST);

        return array;
    };

    const handleOrder = async () => {
        setOpen(false);

        const toastId = toast.loading("Saving your order...");

        const stateDate = {
            state: {
                client_id: user?.id,
                date: currentDate,
                country_id: country,
                city_id: city?.id,
                pickup_point: pickupDPoint(),
                delivery_point: deliveryPoint(),
                extra_charges: extraChargesData(),
                parcel_type: service.value,
                total_weight: weight,
                total_distance: haversine_distance(
                    pickLocationDetails,
                    deliveryLocationDetails
                ),
                payment_collect_from: receivePaymentFrom,
                status: "draft",
                payment_type: "cash",
                payment_status: "pending",
                fixed_charges: city?.fixed_charges,
                weight_charge: charges?.weight_charges,
                distance_charge: charges?.distance_charges,
                parent_order_id: "",
                total_amount:
                    Math.round(
                        (price + orderExtraCharges + pstCharge + gstCharge) *
                            100
                    ) / 100,
                save_user_address: user?.id,
                vehicle_id: vehicleId,
            },
        };

        const dataToSend = stateDate.state;
        const res = await postWithAxios("/api/order-save", dataToSend);

        if (res.order_id) {
            setProcessing(false);

            const url =
                "/" + user?.user_type + "/orderdetail/order_Id/" + res.order_id;
            navigate(url);

            toast.update(toastId, {
                render: res.message,
                type: "success",
                // hideProgressBar: true,
                isLoading: false,
                autoClose: 1500,
            });

            /* toast(res.message, {
                type: "success",
                hideProgressBar: true,
            }); */
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
        assignDistance();
    }, [from, to, weight, service, city]);

    useEffect(() => {
        showPrice();
    }, [pickLocationDetails, deliveryLocationDetails, weight, service, city]);

    useEffect(() => {
        getVehicles();
        getExtraCharges();
    }, []);

    return (
        <div className="">
            <div className="text-appGreen text-lg mt-4 font-bold">
                Create Order
            </div>
            <div>
                <div className="flex flex-wrap items-center justify-end gap-12">
                    <div className="flex items-center h-full">
                        <Button
                            auto
                            color={"success"}
                            type="submitb"
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

            <div className="grid pr-8 lg:grid-cols-2 gap-4">
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
                                inputProps={{
                                    "aria-label": "Without label",
                                }}
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
                        {extraCharges?.map((extraCharge, index) => {
                            if (
                                extraCharge.title !== "GST" &&
                                extraCharge.title !== "PST"
                            ) {
                                return (
                                    <ExtraChargeCheckbox
                                        key={index}
                                        extraCharge={extraCharge}
                                        orderExtraCharges={orderExtraCharges}
                                        setOrderExtraCharges={
                                            setOrderExtraCharges
                                        }
                                        listOfExtraCharges={listOfExtraCharges}
                                        setListOfExtraCharges={
                                            setListOfExtraCharges
                                        }
                                    />
                                );
                            }
                        })}
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
                orderExtraCharges={orderExtraCharges}
                charges={charges}
                setCharges={setCharges}
                listOfExtraCharges={listOfExtraCharges}
                extraCharges={extraCharges}
                gst={gst}
                pst={pst}
                setGstCharge={setGstCharge}
                setPstCharge={setPstCharge}
                pstCharge={pstCharge}
                gstCharge={gstCharge}
            />
        </div>
    );
};

export default AdminCreateOrder;

const ExtraChargeCheckbox = ({
    extraCharge,
    setOrderExtraCharges,
    orderExtraCharges,
    setListOfExtraCharges,
    listOfExtraCharges,
}) => {
    const [checked, setChecked] = useState(true);
    const { appSettings, setAppSettings } = useContext(AppSettingsContext);

    const calculateExtraCharges = () => {
        if (!checked) {
            setOrderExtraCharges(orderExtraCharges + extraCharge?.charges);
            const array = listOfExtraCharges;
            array?.push(extraCharge?.title);
            setListOfExtraCharges(array);
        } else {
            setOrderExtraCharges(orderExtraCharges - extraCharge?.charges);
            const array = listOfExtraCharges;
            const index = array.indexOf(extraCharge?.title);
            array.splice(index, 1);
            setListOfExtraCharges(array);
        }

        setChecked(!checked);
    };

    /*   useEffect(() => {
        calculateExtraCharges();
    }, []); */

    return (
        <div>
            <Checkbox
                label={extraCharge.title}
                value={checked}
                isSelected={checked}
                onChange={calculateExtraCharges}
            />
            <div>
                {" "}
                ( +{" "}
                {appSettings?.currency_position == "left"
                    ? appSettings?.currency
                    : null}{" "}
                {extraCharge.charges}){" "}
                {appSettings?.currency_position == "right"
                    ? appSettings?.currency
                    : null}{" "}
            </div>
        </div>
    );
};

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
    orderExtraCharges,
    charges,
    setCharges,
    city,
    extraCharges,
    listOfExtraCharges,
    gst,
    pst,
    setGstCharge,
    setPstCharge,
    pstCharge,
    gstCharge,
}) => {
    //  const deliveryCharges = 3.8;
    const [inProcess, setInProcess] = useState(true);
    const [extraList, setExtraList] = useState(listOfExtraCharges);

    const { appSettings, setAppSettings } = useContext(AppSettingsContext);

    const handleDeliverNow = () => {
        deliverNow ? setDeliverNow(false) : setDeliverNow(true);
    };

    useEffect(() => {
        if (from && to) {
            setInProcess(false);
        }
    }, [from, to]);

    useEffect(() => {
        setExtraList(listOfExtraCharges);
    }, [listOfExtraCharges]);

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
                {!inProcess ? (
                    <div className="grid gap-6">
                        <div className="flex justify-between">
                            <div>Delivery charges</div>
                            <div>
                                {" "}
                                {appSettings?.currency_position == "left"
                                    ? appSettings?.currency
                                    : null}{" "}
                                {charges?.fixed_charges}{" "}
                                {appSettings?.currency_position == "right"
                                    ? appSettings?.currency
                                    : null}{" "}
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div>Distance charges</div>
                            <div>
                                {" "}
                                {appSettings?.currency_position == "left"
                                    ? appSettings?.currency
                                    : null}{" "}
                                {charges?.distance_charges}{" "}
                                {appSettings?.currency_position == "right"
                                    ? appSettings?.currency
                                    : null}{" "}
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div>Weight Charges </div>
                            <div>
                                {" "}
                                {appSettings?.currency_position == "left"
                                    ? appSettings?.currency
                                    : null}{" "}
                                {charges?.weight_charges}{" "}
                                {appSettings?.currency_position == "right"
                                    ? appSettings?.currency
                                    : null}{" "}
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between">
                                <div className="">Extra Charges </div>
                                <div>
                                    {" "}
                                    {appSettings?.currency_position == "left"
                                        ? appSettings?.currency
                                        : null}{" "}
                                    {Math.round(
                                        (orderExtraCharges +
                                            pstCharge +
                                            gstCharge) *
                                            100
                                    ) / 100}{" "}
                                    {appSettings?.currency_position == "right"
                                        ? appSettings?.currency
                                        : null}{" "}
                                </div>
                            </div>
                            <div className="pl-4 pt-4">
                                {extraCharges?.map((extra, index) => {
                                    if (extraList?.includes(extra.title)) {
                                        return (
                                            <div
                                                key={index}
                                                className="flex justify-between text-sm"
                                            >
                                                <div>{extra.title}</div>
                                                <div>
                                                    {appSettings?.currency_position ==
                                                    "left"
                                                        ? appSettings?.currency
                                                        : null}{" "}
                                                    {extra.charges}{" "}
                                                    {appSettings?.currency_position ==
                                                    "right"
                                                        ? appSettings?.currency
                                                        : null}
                                                </div>
                                            </div>
                                        );
                                    }
                                })}

                                <div className="flex justify-between text-sm">
                                    <div> PST ({pst?.charges} %) </div>
                                    <div>
                                        {appSettings?.currency_position ==
                                        "left"
                                            ? appSettings?.currency
                                            : null}{" "}
                                        {pstCharge}{" "}
                                        {appSettings?.currency_position ==
                                        "right"
                                            ? appSettings?.currency
                                            : null}
                                    </div>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <div> GST ({gst?.charges} %) </div>
                                    <div>
                                        {appSettings?.currency_position ==
                                        "left"
                                            ? appSettings?.currency
                                            : null}{" "}
                                        {gstCharge}{" "}
                                        {appSettings?.currency_position ==
                                        "right"
                                            ? appSettings?.currency
                                            : null}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between font-bold">
                            <div>Total</div>
                            <div>
                                {" "}
                                {appSettings?.currency_position == "left"
                                    ? appSettings?.currency
                                    : null}{" "}
                                {Math.round(
                                    (price +
                                        orderExtraCharges +
                                        pstCharge +
                                        gstCharge) *
                                        100
                                ) / 100}{" "}
                                {appSettings?.currency_position == "right"
                                    ? appSettings?.currency
                                    : null}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="py-8 flex justify-center">
                        <Loading type="points" />
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <div className="flex w-full gap-4 justify-end">
                    <Button
                        css={{ backgroundColor: "white" }}
                        auto
                        onPress={() => setOpen(false)}
                        className="border border-gray-200"
                    >
                        <div className="font-bold text-gray-400">Cancel</div>
                    </Button>

                    <Button auto color={"success"} onPress={handleCreateOrder}>
                        <div className="font-bold">Create</div>
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

const NumberInput = ({ title, value, setValue }) => {
    const [inputWidth, setInputWidth] = useState();
    const inputDivRef = useRef(null);
    const inputRef = useRef(null);
    const minus = () => {
        if (value > 1) {
            setValue((v) => v - 1);
        }
    };

    const add = () => {
        setValue((v) => v + 1);
    };

    useEffect(() => {
        setInputWidth(inputDivRef.current.clientWidth);
        inputRef.current.className =
            inputDivRef.current.clientWidth +
            " absolute left-0 right-0 bg-transparent text-center h-full border-0 border-transparent  outline-none focus:outline-none";
    }, [document.body.clientWidth]);

    return (
        <div className="grid grid-cols-7 divide-x-2 w-full divide-gray-400 rounded-xl  text-gray-500 font-bold border-2 border-gray-400">
            <div className="col-span-3 text-md py-3 pl-4">{title}</div>
            <div>
                <button
                    onClick={minus}
                    className="flex justify-center items-center w-full h-full"
                >
                    <FaMinus className="text-center" />
                </button>
            </div>
            <div
                ref={inputDivRef}
                className="relative col-span-2 h-full flex justify-center"
            >
                <input
                    ref={inputRef}
                    style={{ width: inputWidth }}
                    type="number"
                    className="  text-center border-0 border-transparent  outline-none focus:outline-none"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
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
                    <div className="py-2">{title} Contact Number </div>
                    <PhoneInput
                        value={phoneValue}
                        countryCode={"ca"}
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
