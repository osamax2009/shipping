import { useEffect, useMemo, useRef, useState } from "react";
import { getWithAxios } from "@/components/api/axios";

import {
    getCsrfToken,
    getUserFromAPI,
    postWithAxios,
} from "../../../api/axios";
import { useNavigate } from "react-router-dom";

import {
    Bs1CircleFill,
    Bs2CircleFill,
    Bs4CircleFill,
    BsFill3CircleFill,
} from "react-icons/bs";

import { appName, parcelTypes } from "../../../shared/constancy";
import { Loading } from "@nextui-org/react";
import { toast } from "react-toastify";

const Brand = () => {
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [service, setServive] = useState();
    const [processing, setProcessing] = useState(false);

    const navigate = useNavigate();

    const getCities = async () => {
        const { data } = await getWithAxios("/api/city-list");

        if (data) {
            setCities(data);
        }
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
    const handleOrder = async () => {
        if(!from || !to || !service)
        {
            toast("Empty filed submitted", {
                type : "error",
                hideProgressBar : true
            })
        }
        setProcessing(true);

        const pickpoint = await getLocation(from.name);
        const delivery = await getLocation(to.name);
        const stateDate = {
            state: {
                parcelType: service.label,
                pickLocation: pickpoint.description,
                deliveryLocation: delivery.description,
                requestFrom: "create_order",
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
    };

    useEffect(() => {
        getCities();
    }, []);

    return (
        <div className="bg-gradient-to-b from-[#4caf50] to-[#388a3a] pb-24 px-24 pt-32 h-fit ">
            <div className="text-[4rem] text-white text-center mt-4 font-bold">
                Save on wolrlwide
            </div>
            <div className=" text-white text-center text-3xl  mb-4">
                shipping with {appName}
            </div>

            <div className="grid bg-white  md:grid-cols-4">
                <CityGetter
                    title={"From"}
                    selected={from}
                    setSelected={setFrom}
                />
                <CityGetter title={"To"} selected={to} setSelected={setTo} />
                <Services selected={service} setSelected={setServive} />
                <div>
                    <button
                        onClick={handleOrder}
                        className="py-6 md:py-0 h-full w-full  text-white font-bold bg-blue-700 hover:bg-blue-600"
                    >
                        {
                            processing ? <Loading /> : "Create Order"
                        }
                    </button>
                </div>
            </div>
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

    const handleSelection = (parcel) => {
        setSelected(parcel);
        //  setExpanded(false)
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
            <label htmlFor="" className="absolute top-3 left-4">
                <span className="uppercase font-bold text-black text-xl">
                    {title}
                </span>
            </label>

            <div
                type="text"
                onBlur={() => setExpanded(false)}
                placeholder="tape to search"
                className="rounded-lg h-full text-lg border-0 w-full font-bold  focus:outline-none pl-3 pb-3 pt-10"
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
            <label htmlFor="" className="absolute top-3 left-4">
                <span className="uppercase font-bold text-black text-xl">
                    Service
                </span>
            </label>

            <div
                type="text"
                onBlur={() => setExpanded(false)}
                placeholder="tape to search"
                className="rounded-lg h-full text-lg border-0 w-full font-bold  focus:outline-none pl-3 pb-3 pt-10"
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
