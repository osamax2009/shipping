import { useEffect, useState } from "react";
import DashboardLayout from "../../dashboardComponents/dashbboardLayout";
import { getWithAxios } from "@/components/api/axios";
import { Button, Dropdown, Input, Radio } from "@nextui-org/react";
import { parcelTypes } from "../../shared/constancy";
import { useLocation, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PlaceOrder = () => {
    const location = useLocation();
    const { state } = location;

    const [weight, setWeight] = useState(state?.weight ? state.weight : 1);
    const [numberOfParcel, setNumberOfParcel] = useState(
        state?.numberOfParcel ? state.numberOfParcel : 1
    );
    const [parcelType, setParcelType] = useState(
        state?.parcelType ? state.parcelType : "Court Document"
    );
    const [pickLocation, setPickLocation] = useState(state?.pickLocation);
    const [pickNumber, setPickNumber] = useState(state?.pickNumber);
    const [pickDescription, setPickDescription] = useState(
        state?.pickDescription
    );
    const [deliveryLocation, setDeliveryLocation] = useState(
        state?.deliveryLocation
    );
    const [deliveryNumber, setDeliveryNumber] = useState(state?.deliveryNumber);
    const [deliveryDescription, setDeliveryDescription] = useState(
        state?.deliveryDescription
    );
    const [schedule, setSchedule] = useState(
        state?.schedule
            ? state.schedule
            : {
                  pickDate: null,
                  pickFrom: null,
                  pickTo: null,
                  deliverDate: null,
                  deliverFrom: null,
                  deliverTo: null,
              }
    );

    const [deliverNow, setDeliverNow] = useState(true);
    const [locations, setLocations] = useState([]);
    const [deLlocations, setDelLocations] = useState([]);
    const [pickId, setPickId] = useState(state?.pickId);
    const [deliveryId, setDeliveryId] = useState(state?.deliveryId);

    const navigate = useNavigate();

    const getLocation = async (e, locationSetter, locationsSetter) => {
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
        console.log(res);
        if (res.status == "OK") {
            locationsSetter(res.predictions);
        }
    };

    const assignLocation = (
        location,
        setter,
        setlocationsFor,
        locationIdSetter
    ) => {
        setter(location.description);
        setlocationsFor([]);
        locationIdSetter(location.place_id);
    };

    const handleDeliverNow = () => {
        deliverNow ? setDeliverNow(false) : setDeliverNow(true);
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/account/dashboard/new-order-resume", {
            state: {
                weight: weight,
                numberOfParcel: numberOfParcel,
                parcelType: parcelType,
                pickLocation: pickLocation,
                pickNumber: pickNumber,
                pickDescription: pickDescription,
                deliveryLocation: deliveryLocation,
                deliveryNumber: deliveryNumber,
                deliveryDescription: deliveryDescription,
                schedule: schedule,
                pickId: pickId,
                deliveryId: deliveryId,
            },
        });
    };

    return (
        <DashboardLayout>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-8 px-8">
                    {/* General informations */}
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            Order informations 
                        </div>
                        <div className="card-body">
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
                                <div className="grid gap-4 px-2 pt-4 ">
                                    <div className="p-2 bg-gray-100/25">
                                        <div className="mb-4">Pick Time</div>
                                        <div className="grid  lg:grid-cols-3">
                                            <div className="form-group">
                                                <label htmlFor="">Date</label>
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
                                                            pickDate:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="">From</label>
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
                                                            pickFrom:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">To</label>
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
                                                            pickTo: e.target
                                                                .value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-2 bg-gray-100/25">
                                        <div className="mb-4">Deliver Time</div>
                                        <div className="grid  lg:grid-cols-3">
                                            <div className="form-group">
                                                <label htmlFor="">Date</label>
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
                                                            deliverDate:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="">From</label>
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
                                                            deliverFrom:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">To</label>
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
                                                            deliverTo:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="grid mt-4 gap-8 lg:grid-cols-3">
                                <div className="form-group">
                                    <label htmlFor="">Weight</label>
                                    <input
                                        required
                                        type="number"
                                        className="form-control"
                                        value={weight}
                                        onChange={(e) =>
                                            setWeight(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">Number of parcels</label>
                                    <input
                                        required
                                        type="number"
                                        className="form-control"
                                        value={numberOfParcel}
                                        onChange={(e) =>
                                            setNumberOfParcel(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">Parcel type</label>
                                    <div>
                                        <Dropdown>
                                            <Dropdown.Button
                                                flat
                                                className="w-full"
                                                color="success"
                                                css={{ tt: "capitalize" }}
                                            >
                                                {parcelType}
                                            </Dropdown.Button>
                                            <Dropdown.Menu
                                                aria-label="Single selection actions"
                                                color="secondary"
                                                disallowEmptySelection
                                                selectionMode="single"
                                                selectedKeys={parcelType}
                                                onSelectionChange={
                                                    setParcelType
                                                }
                                            >
                                                {parcelTypes.map(
                                                    (parcel, index) => (
                                                        <Dropdown.Item
                                                            key={parcel.label}
                                                        >
                                                            {parcel.label}
                                                        </Dropdown.Item>
                                                    )
                                                )}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Pick informations */}
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            Pick informations
                        </div>
                        <div className="card-body">
                            <div className="grid gap-8  lg:grid-cols-3">
                                <div className="form-group">
                                    <label htmlFor="">Pick Up Location</label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        value={pickLocation}
                                        onChange={(e) =>
                                            getLocation(
                                                e,
                                                setPickLocation,
                                                setLocations
                                            )
                                        }
                                    />

                                    {locations.length > 0 && (
                                        <span className="form-control mt-2">
                                            {locations.map(
                                                (location, index) => (
                                                    <button
                                                        type="button"
                                                        className="my-3"
                                                        onClick={() =>
                                                            assignLocation(
                                                                location,
                                                                setPickLocation,
                                                                setLocations,
                                                                setPickId
                                                            )
                                                        }
                                                        key={index}
                                                    >
                                                        {location.description}
                                                    </button>
                                                )
                                            )}
                                        </span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">
                                        Pickup Contact Number
                                    </label>

                                    <PhoneInput
                                        value={pickNumber}
                                        inputProps={{
                                            required: true,
                                        }}
                                        country={state?.pickCountry ? state.pickCountry : "ca"}
                                        inputStyle={{}}
                                        onChange={(e) => setPickNumber(e)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">Pickup description</label>
                                    <textarea
                                        name=""
                                        id=""
                                        cols="30"
                                        rows="3"
                                        className="frorm-control"
                                        value={pickDescription}
                                        onChange={(e) =>
                                            setPickDescription(e.target.value)
                                        }
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Delivery informations */}
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            Delivery informations
                        </div>
                        <div className="card-body">
                            <div className="grid gap-8  lg:grid-cols-3">
                                <div className="form-group">
                                    <label htmlFor="">Delivery Location</label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        value={deliveryLocation}
                                        onChange={(e) =>
                                            getLocation(
                                                e,
                                                setDeliveryLocation,
                                                setDelLocations
                                            )
                                        }
                                    />

                                    {deLlocations.length > 0 && (
                                        <span className="form-control mt-2">
                                            {deLlocations.map(
                                                (location, index) => (
                                                    <button
                                                        type="button"
                                                        className="my-3"
                                                        onClick={() =>
                                                            assignLocation(
                                                                location,
                                                                setDeliveryLocation,

                                                                setDelLocations,
                                                                setDeliveryId
                                                            )
                                                        }
                                                        key={index}
                                                    >
                                                        {location.description}
                                                    </button>
                                                )
                                            )}
                                        </span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">
                                        Delivery Contact Number
                                    </label>
                                    <PhoneInput
                                        inputProps={{
                                            required: true,
                                        }}
                                        country={state?.deliveryCountry ? state.deliveryCountry : "ca"}

                                        value={deliveryNumber}
                                        onChange={(e) => setDeliveryNumber(e)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">
                                        Delivery description
                                    </label>
                                    <textarea
                                        name=""
                                        id=""
                                        cols="30"
                                        rows="3"
                                        className="frorm-control"
                                        value={deliveryDescription}
                                        onChange={(e) =>
                                            setDeliveryDescription(
                                                e.target.value
                                            )
                                        }
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="py-6 flex justify-end">
                        <Button type="submit">Submit</Button>
                    </div>
                </div>
            </form>
        </DashboardLayout>
    );
};

export default PlaceOrder;
