import { useEffect, useState } from "react";
import DashboardLayout from "../../dashboardComponents/dashbboardLayout";
import Select from 'react-select'
import { getWithAxios } from "@/components/api/axios";

const PlaceOrder = () => {
    const [countries, setCountries] = useState();

    const getCountries = async () => {
        const data = await getWithAxios("/api/country-list");
        console.log(data);

        if (data.status == "success") {
            setCountries(data.data.countries);
        }
    };


    useEffect(() => {
        getCountries()
    },[])

    return (
        <DashboardLayout>
            <div className="px-8">
                <div className="card">
                    <div className="card-header bg-primary text-white">
                        Place new order
                    </div>
                    <div className="card-body">
                        <div className="grid gap-8 md:grid-cols-4">
                            <div className="form-group">
                                <label htmlFor="">From</label>
                                <Select options={countries} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">To</label>
                                <Select  options={countries} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Service</label>
                                <input
                                    className="form-control"
                                    placeholder="country name..."
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Ordering as</label>
                                <input
                                    className="form-control"
                                    placeholder="country name..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PlaceOrder;
