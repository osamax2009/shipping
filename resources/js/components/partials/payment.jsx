import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getWithAxios, postWithAxios } from "../api/axios";
import { useEffect } from "react";
import { Image } from "@nextui-org/react";

const Payment = () => {
    const [paymentMethods, setPaymentMethods] = useState();
    const [selectedGateway, setSelectedGateway] = useState();
    const location = useLocation();
    const state = location.state;

    const getPaymentsMethods = async () => {
        const res = await getWithAxios("/api/paymentgateway-list");
        console.log(res);
        setPaymentMethods(res.data);
    };

    const savePayment = async () => {
        const dataToSend = {};

        const res = await postWithAxios("/api/paymentgateway-save", dataToSend);
    };

    useEffect(() => {
        getPaymentsMethods();
    }, []);
    return (
        <div>
            <div className="text-lg font-bold py-4">Payment methods</div>

            <div className="grid gap-4 md:grid-cols-3">
                {paymentMethods?.map((method, index) => (
                    <div
                        key={index}
                        onMouseDown={() => setSelectedGateway(method)}
                        className={
                            selectedGateway == method
                                ? "flex w-fit items-center p-4 gap-4 border border-green-600 rounded-xl cursor-pointer"
                                : "flex w-fit p-4 items-center  gap-4 border border-gray-400 rounded-xl cursor-pointer"
                        }
                    >
                        <Image
                            src={method.gateway_logo}
                            width={100}
                            height={70}
                            className="h-24"
                        />
                        <div className="font-bold">{method.title}</div>
                    </div>
                ))}
            </div>
            {
                selectedGateway && <div className=" grid md:grid-cols-2 gap-4 pt-6">
                    <div className="col-span-2">
                        Add your informations
                    </div>
                    <div className="form-group">
                        <label htmlFor=""> Title</label>
                        <input type="text" disabled value={selectedGateway.type} className="form-control" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Amount</label>
                        <input type="text" disabled value={state.paymentAmount} className="form-control" />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor=""> Credit card Number </label>
                        <input type="text" disabled value={selectedGateway.type} className="form-control" />
                    </div>
                </div>
            }
        </div>
    );
};

export default Payment;
