import { useEffect, useMemo, useRef, useState } from "react";
import { getWithAxios } from "@/components/api/axios";
import Select from "react-select";
import {
    getCsrfToken,
    getUserFromAPI,
    postWithAxios,
} from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { Dropdown, Input, Modal, Button } from "@nextui-org/react";
import {
    Bs1Circle,
    Bs1CircleFill,
    Bs2Circle,
    Bs2CircleFill,
    Bs4CircleFill,
    BsEnvelope,
    BsFill3CircleFill,
    BsPinMap,
} from "react-icons/bs";
import { FaPallet } from "react-icons/fa";
import { LuPackage2 } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { appName, parcelTypes } from "../../../shared/constancy";

const Brand = () => {
    const [cities, setCities] = useState(null);

    const navigate = useNavigate();

    const steps = [
        {
            title: "Package \n informations",
            subtitle: "",
            icon: <Bs1CircleFill />,
        },

        {
            title: "Pickup \n informations",
            subtitle: "",
            icon: <Bs2CircleFill />,
        },

        {
            title: "delivery \n informations",
            subtitle: "",
            icon: <BsFill3CircleFill />,
        },

        {
            title: "payment \n informations",
            subtitle: "",
            icon: <Bs4CircleFill />,
        },
    ];

    const getCities = async () => {
        const { data } = await getWithAxios("/api/city-list");

        if (data) {
            setCities(data);
        }
    };

    const handleOrder = async () => {
        await getCsrfToken();
        const user = await getUserFromAPI();

        if (user == false) {
            navigate("/account/sign-in");
        }

        if (user) {
            /*  const dataToSend = {};
            const res = await postWithAxios("/api/order-save", dataToSend); */

            navigate("/account/dashboard/place-new-order");
        }
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
                <CityGetter title={"From"} />
                <CityGetter title={"To"} />
                <Services />
                <div>
                    <button
                        onClick={handleOrder}
                        className="h-full w-full text-white font-bold bg-blue-700 hover:bg-blue-600"
                    >
                        Create Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Brand;

const CityGetter = ({ title }) => {
    const [selected, setSelected] = useState();
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
       setExpanded(false)
    }, [selected]);

   

    useEffect(() => {
        getCities();
    }, []);
    
    useEffect(() => {
        document.addEventListener("click", (evt) => {
            const flyoutEl = divRef.current;
            let targetEl = evt.target; // clicked element      
            do {
              if(targetEl == flyoutEl) {
                // This is a click inside, does nothing, just return.
               
                return;
              }
              // Go up the DOM
              targetEl = targetEl.parentNode;
            } while (targetEl);
            // This is a click outside.      
           setExpanded(false)
          });
    },[])
    return (
        <div ref={divRef}  onMouseDown={() => setExpanded(true)}  className="relative w-full cursor-pointer">
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
                        <input type="text" placeholder="type here" className="form-control" value={cityName} onChange={handleFilter} />
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

const SetterButton = ({ city }) => {
    return (
        <div className=" text-bold cursor-pointer font-bold text-start w-full text-sm py-2 px-4 hover:bg-gray-100/50 focus:bg-gray-100/50">
            <button
                type="button"
                onClick={() => setCityName(city.name)}
                className="text-start w-full h-full"
            >
                {city.name}
            </button>
        </div>
    );
};

const Step = ({ title, subtitle, icon }) => {
    return (
        <div className="flex flex-col gap-4 items-center text-center  ">
            {/* <div className="text-2xl text-appGreen">{icon}</div> */}
            <div>
                <div className="uppercase text-sm text-gray-100">{title}</div>
                <div className="text-gray-300 text-sm">{subtitle}</div>
            </div>
        </div>
    );
};

const Services = () => {
    const [selected, setSelected] = useState();
    const [expanded, setExpanded] = useState(false);
    const divRef = useRef(null);

    /* const selectedValue = useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
    ); */

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
    useEffect(() => {
        handleFocus();
    }, [expanded]);

    useEffect(() => {
       setExpanded(false)
    }, [selected]);

    useEffect(() => {
        document.addEventListener("click", (evt) => {
            const flyoutEl = divRef.current;
            let targetEl = evt.target; // clicked element      
            do {
              if(targetEl == flyoutEl) {
                // This is a click inside, does nothing, just return.
               
                return;
              }
              // Go up the DOM
              targetEl = targetEl.parentNode;
            } while (targetEl);
            // This is a click outside.      
           setExpanded(false)
          });
    },[])
    
    return (
        <div ref={divRef}  onMouseDown={() => setExpanded(true)} className="relative w-full cursor-pointer">
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
