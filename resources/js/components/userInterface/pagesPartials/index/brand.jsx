import { useEffect, useState } from "react";
import { getWithAxios } from "@/components/api/axios";
import Select from "react-select";
import { BsEnvelope } from "react-icons/bs";
import { getCsrfToken, getUserFromAPI, postWithAxios } from "../../../api/axios";
import { useNavigate } from "react-router-dom";

const Brand = () => {
    const [countries, setCountries] = useState(null);

    const navigate = useNavigate();

    const getCountries = async () => {
        const {data} = await getWithAxios("/api/country-list");
        
        if (data) {
            console.log('appzpzppp')
            setCountries(data)
        }

        console.log(data)

        console.log(countries)
        
    };

    const handleOrder = async () => {
        await  getCsrfToken()
        const user = await getUserFromAPI();
        console.log(user)
        
        if (user) {
            const dataToSend = {

            }
            const res = await postWithAxios('/api/order-save',dataToSend)

            console.log(res)
        }else{
            navigate("/account/sign-in");
        }

    };

    useEffect(() => {
        getCountries()
    }, []);

    return (
        <div className="bg-gradient-to-b from-[#4caf50] to-[#388a3a] pb-24 px-24 ">
            <div className="text-[4rem] text-white font-bold">
                We make shipping easy
            </div>
            <div className=" text-white text-3xl ">
                Immediate prices, easy booking
            </div>
            <div>
                <div class="grid bg-white rounded-lg md:grid-cols-5">
                    <div class="md:col-span-4 w-full grid rounded-t-lg md:rounded-l-lg gap-8 px-4 py-2 md:grid-cols-3">
                        <div className="form-group">
                            <label className="form-label font-bold">FROM</label>
                            <select name="" id="" className="custom-select">
                                <option value="">choose a country</option>
                                {
                                    countries?.map((country,index) => {
                                        <option key={index} value={country.name}> {country.name}</option>
                                    })
                                }
                            </select>
                        </div>

                        <div>
                            <label>To</label>
                            <select name="" id="" className="custom-select">
                            <option value="">choose a country</option>
                                {
                                    countries?.map((country,index) => {
                                        <option key={index} value={country.name}> {country.name}</option>
                                    })
                                }
                            </select>
                        </div>

                        <Services />
                    </div>
                    <div className="w-full bg-green-600 rounded-b-lg md:rounded-r-lg">
                        <button
                            onClick={handleOrder}
                            className="h-full w-full text-white font-bold bg-blue-600 rounded-b-lg md:rounded-r-lg hover:bg-blue-"
                        >
                            Create order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Brand;

const Services = () => {
    const services = [
        {
            icon: <BsEnvelope className="text-3xl" />,
            title: "Document",
            subtitle: "Personal IDs and paper documents",
        },

        {
            icon: <BsEnvelope className="text-3xl" />,
            title: "Package",
            subtitle: "Box up to 70Kg",
        },

        {
            icon: <BsEnvelope className="text-3xl" />,
            title: "Document",
            subtitle: "Personal IDs and paper documents",
        },

        {
            icon: <BsEnvelope className="text-3xl" />,
            title: "Document",
            subtitle: "Personal IDs and paper documents",
        },
    ];
    return (
        <div className="form-group">
            <label htmlFor="">Service</label>
            <select name="" id="" className="custom-select">
                <option value="" className="text-gray-400">
                    Select a service
                </option>
                {services.map((service, index) => (
                    <option key={index} value={service.title} className="py-4 ">
                        <div className="flex gap-4">
                            <div>icon : {service.icon}</div>
                            <div className=" py-2">
                                <div className="">{service.title}</div>
                                <div className="text-gray-400">
                                    {service.subtitle}
                                </div>
                            </div>
                        </div>
                    </option>
                ))}
            </select>
        </div>
    );
};
