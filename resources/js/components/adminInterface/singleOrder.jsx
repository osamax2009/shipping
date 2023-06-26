import { Link, useNavigate, useParams } from "react-router-dom";
import { getWithAxios } from "../api/axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import {
    BsDownload,
    BsEnvelope,
    BsFillPinMapFill,
    BsPerson,
    BsTelephoneFill,
} from "react-icons/bs";
import { AiOutlineFileSearch } from "react-icons/ai";
import { Button } from "@nextui-org/react";
import { UserContext } from "../contexts/userContext";
import { toast } from "react-toastify";

const SingleOrder = () => {
    const [order, setOrder] = useState();
    const [client, setClient] = useState();
    const [history, setHistory] = useState();
    const [active, setActive] = useState(true);

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const params = useParams();
    const orderId = params.order_Id;

    const getOrder = async () => {
        const dataToSend = {
            id: orderId,
        };

        if (orderId) {
            let res;
            try {
                res = await getWithAxios("/api/order-detail", dataToSend);
            } catch (error) {
                res = "error";
            }

            if (res == "error") {
                toast("invalid order id", {
                    type: "error",
                    hideProgressBar: true,
                });

                if (user?.user_type == "client") {
                    const url = "/client/order-list";
                    navigate(url);
                }

                if (user?.user_type == "admin") {
                    const url = "/admin/orders";
                    navigate(url);
                }

                if (user?.user_type == "delivery_man") {
                    const url = "/delivery_man/orders";
                    navigate(url);
                }
            }

            if (res.data.id) {
                setOrder(res.data);
                console.log(res.order_history);
                setHistory(res.order_history);
                const id = {
                    id: res.data.client_id,
                };
                const client = await getWithAxios("/api/user-detail", id);
                setClient(client.data);
            }
        }
    };

    const handleTab = () => {
        !active ? setActive(true) : setActive(false);
    };

    useEffect(() => {
        getOrder();
    }, []);

    return (
        <div>
            <div className="flex justify-end gap-6 py-4 ">
                <Link
                    to={
                        user?.user_type == "admin"
                            ? "/admin/orders"
                            : "/client/order-list"
                    }
                    className="bg-green-500 text-white font-bold hover:bg-green-400 rounded-lg py-2 px-8 no-underline hover:no-underline"
                >
                    Back
                </Link>
                <Button auto color={"success"}>
                    <div className="flex items-center justify-center font-bold text-lg gap-2">
                        <BsDownload className="text-2xl" />
                        invoice
                    </div>
                </Button>
            </div>
            <div className="grid w-full gap-6 px-4 md:grid-cols-3">
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

                            <div className="grid mt-3 gap-4 md:grid-cols-2">
                                <div>
                                    <div className="pb-2">Pickup Address</div>
                                    <div className="flex border rounded-lg py-3 px-4 h-full items-center gap-6">
                                        <div className="text-xl text-green-700">
                                            <BsFillPinMapFill />
                                        </div>
                                        <div className="grid gap-4">
                                            <div>
                                                {order?.pickup_point.address}
                                            </div>
                                            <div className="grid gap-4">
                                                <div className=" flex gap-3 text-green-700">
                                                    <BsTelephoneFill />

                                                    {
                                                        order?.pickup_point
                                                            .contact_number
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="pb-2">Delivery Address</div>
                                    <div className="flex border rounded-lg py-3 px-4 h-full items-center gap-6">
                                        <div className="text-xl text-green-700">
                                            <BsFillPinMapFill />
                                        </div>
                                        <div className="grid gap-4">
                                            <div>
                                                {order?.delivery_point.address}
                                            </div>
                                            <div className="grid gap-4 ">
                                                <div className=" flex gap-3 text-green-700">
                                                    <BsTelephoneFill />

                                                    {
                                                        order?.delivery_point
                                                            .contact_number
                                                    }
                                                </div>
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
                                            <div>$ {order?.total_amount}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {!active && (
                        <div className="grid gap-4 font-bold bg-white text-black py-4 px-6 rounded-b-lg">
                            <ul class="steps steps-vertical">
                            {history[0] && <li data-content={<AiOutlineFileSearch/>} className="step step-success"> <Content history={history[0]} /> </li>}
                            {history[0] && <li data-content={<DataContent icon={<AiOutlineFileSearch/>} />} className="step step-success"> <Content history={history[0]} /> </li>}
                                {history[0] && <li data-content={<DataContent icon={<AiOutlineFileSearch/>} />} className="step step-success"> <Content history={history[0]} /> </li>}
                                {history[1] && <li data-content={<DataContent icon={<AiOutlineFileSearch/>} />} className="step step-success"> <Content history={history[1]} /> </li>}
                                {history[2] && <li data-content={<DataContent icon={<AiOutlineFileSearch/>} />} className="step step-success"> <Content history={history[2]} /> </li>}
                                {history[3] && <li data-content={<DataContent icon={<AiOutlineFileSearch/>} />} className="step step-success"> <Content history={history[3]} /> </li>}

                            </ul>
                        </div>
                    )}
                </div>

                <div className="">
                    <div className="flex justify-between font-bold bg-green-300 p-4 rounded-t-lg">
                        {user?.user_type == "admin"
                            ? " About user"
                            : "Ordered by"}
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
        </div>
    );
};

export default SingleOrder;

const DataContent = ({ icon }) => {
    return <div className="text-lg text-white">
        {icon}
    </div>;
};

const Content = ({history}) => {
    return (
        <div className="grid text-start gap-2 text-black">
            <div>{history?.history_type}</div>

            <div className="font-light">
                {history?.history_message}
                {history?.datetime}
            </div>
        </div>
    );
};
