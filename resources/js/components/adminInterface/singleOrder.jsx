import { useParams } from "react-router-dom";
import { getWithAxios } from "../api/axios";
import { useState } from "react";
import { useEffect } from "react";
import { BsEnvelope, BsPerson } from "react-icons/bs";
import { AiOutlineFileSearch } from "react-icons/ai"

const SingleOrder = () => {
    const [order, setOrder] = useState();
    const [client, setClient] = useState();
    const [history, setHistory] = useState();
    const [active, setActive] = useState(true);

    const params = useParams();
    const orderId = params.order_Id;

    const getOrder = async () => {
        const dataToSend = {
            id: orderId,
        };
        const res = await getWithAxios("/api/order-detail", dataToSend);
        console.log(res);
        setOrder(res.data);
        setHistory(res.order_history);
        const id = {
            id: res.data.client_id,
        };
        const client = await getWithAxios("/api/user-detail", id);
        setClient(client.data);
    };

    const handleTab = () => {
        !active ? setActive(true) : setActive(false);
    };

    useEffect(() => {
        getOrder();
    }, []);

    return (
        <div className="grid gap-6 px-4 md:grid-cols-3">
            <div className="md:col-span-2">
                <div className="flex justify-between bg-green-300 p-4 rounded-t-lg">
                    <button
                        onClick={handleTab}
                        className={
                            active
                                ? "py-2 px-12 bg-white rounded-lg"
                                : "py-2 px-12"
                        }
                    >
                        Order detail
                    </button>

                    <button
                        className={
                            !active
                                ? "py-2 px-12 bg-white rounded-lg"
                                : "py-2 px-12"
                        }
                        onClick={handleTab}
                    >
                        Order history
                    </button>
                </div>
                {active && (
                    <div className="grid gap-4 font-bold bg-white text-black py-4 px-6 rounded-b-lg">
                        <div className="flex justify-between font-bold">
                            <div>Order Id</div>

                            <div>#{order?.id}</div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <div className="pb-2">Parcel Details</div>
                                <div className="border rounded-lg py-3 px-4">
                                    <div className="flex justify-between">
                                        <div>Parcel Type</div>
                                        <div>{order?.parcel_type}</div>
                                    </div>

                                    <div className="flex justify-between">
                                        <div>Weight</div>
                                        <div>{order?.total_weight}</div>
                                    </div>

                                    <div className="flex justify-between">
                                        <div>Number of Parcel</div>
                                        <div>
                                            {/* {order?.parcel_type} */} 1
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="pb-2">Payment Details</div>
                                <div className="border rounded-lg py-3 px-4">
                                    <div className="flex justify-between">
                                        <div>Payment type</div>
                                        <div>{order?.payment_type}</div>
                                    </div>

                                    <div className="flex justify-between">
                                        <div>Payment Status</div>
                                        <div>{order?.total_weight}</div>
                                    </div>

                                    <div className="flex justify-between">
                                        <div>Payment collect from</div>
                                        <div>
                                            {/* {order?.parcel_type} */} 1
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-12">
                            <div>
                                <div className="border rounded-lg py-3 px-4">
                                    <div className="flex justify-between">
                                        <div>Total price</div>
                                        <div>{order?.total_amount}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {!active && <div className="grid gap-4 font-bold bg-white text-black py-4 px-6 rounded-b-lg">
                    <div className="flex">
                        <div className="p-12 text-xl bg-green-700 rounded-[80px]">
                           <AiOutlineFileSearch /> 
                        </div>
                        <div className="grid gap-4">
                            <div>
                                {history?.history_type}
                            </div>

                            <div className="font-light">
                                {history?.history_message}
                                {history?.datetime}
                            </div>

                        </div>
                    </div>
                    </div>}
            </div>

            <div className="">
                <div className="flex justify-between font-bold bg-green-300 p-4 rounded-t-lg">
                    About user
                </div>
                <div className="grid gap-4 font-bold bg-white text-black py-4 px-6 rounded-b-lg">
                    <div className="flex gap-4 items-center font-bold">
                        <div>
                            <BsPerson className="text-4xl" />
                        </div>

                        <div className="">
                            <div>{order?.client_name}</div>
                            <div>{client?.contact_number}</div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <div className="flex items-center gap-4">
                            <div className="text-green-500 text-xl">
                                <BsEnvelope />
                            </div>
                            <div>{client?.email}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleOrder;
