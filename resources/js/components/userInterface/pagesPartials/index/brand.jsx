import { useEffect, useMemo, useState } from "react";
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

const Brand = () => {
    const [countries, setCountries] = useState(null);

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

    const getCountries = async () => {
        const { data } = await getWithAxios("/api/country-list");

        if (data) {
            setCountries(data);
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
        getCountries();
    }, []);

    return (
        <div className="bg-gradient-to-b from-[#4caf50] to-[#388a3a] pb-24 px-24 pt-32 h-fit ">
            <div className="text-[4rem] text-white font-bold">
                We make shipping easy
            </div>
            <div className=" text-white text-3xl ">
                Immediate prices, easy booking
            </div>
            <div className="pt-8">
                <ul className="steps steps-vertical lg:steps-horizontal">
                    {steps.map((step, index) => (
                        <li className="step step-info text-sm ">
                            <Step
                                key={index}
                                title={step.title}
                                subtitle={step.subtitle}
                                icon={step.icon}
                            />{" "}
                        </li>
                    ))}
                </ul>
                <div className="flex justify-end">
                    <Button onPress={handleOrder}>
                        create order
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Brand;

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
    const [selected, setSelected] = useState(new Set(["Document"]));

    const selectedValue = useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
    );

    const services = [
        {
            icon: <BsEnvelope />,
            title: "Document",
        },

        {
            icon: <LuPackage2 />,
            title: "Package",
        },

        {
            icon: <LuPackage2 />,
            title: "Express package",
        },

        {
            icon: <FaPallet />,
            title: "Pallet",
        },

        {
            icon: <TbTruckDelivery />,
            title: "Van delivery",
        },

        {
            icon: <Bs1Circle />,
            title: "parcelone",
        },

        {
            icon: <Bs1Circle />,
            title: "parceltzo",
        },
    ];
    return (
        <div className="form-group">
            <label htmlFor="">Service</label>
            <div>
                <Dropdown>
                    <Dropdown.Button
                        flat
                        className="w-full"
                        color="success"
                        css={{ tt: "capitalize" }}
                    >
                        {selectedValue}
                    </Dropdown.Button>
                    <Dropdown.Menu
                        aria-label="Single selection actions"
                        color="secondary"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selected}
                        onSelectionChange={setSelected}
                    >
                        {services.map((service, index) => (
                            <Dropdown.Item key={service.title}>
                                <div className="flex gap-4">
                                    <div className="text-xl">
                                        {service.icon}
                                    </div>
                                    <div>
                                        <div className="uppercase">
                                            {service.title}
                                        </div>
                                        {/* <div>
                        {service.subTitle}
                        </div> */}
                                    </div>
                                </div>
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
};


