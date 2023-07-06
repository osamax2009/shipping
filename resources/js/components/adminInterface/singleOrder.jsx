import { Link, useNavigate, useParams } from "react-router-dom";
import { getWithAxios, postWithAxios } from "../api/axios";
import { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import {
    BsDownload,
    BsEnvelope,
    BsFillPinMapFill,
    BsPerson,
    BsTelephoneFill,
} from "react-icons/bs";
import { AiOutlineFileSearch } from "react-icons/ai";
import { Button, Image } from "@nextui-org/react";
import { UserContext } from "../contexts/userContext";
import { toast } from "react-toastify";
import ReactPDF, { Document, Page, Text, View } from "@react-pdf/renderer";
import { AppSettingsContext } from "../contexts/appSettings";

const SingleOrder = () => {
    const [order, setOrder] = useState();
    const [client, setClient] = useState();
    const [history, setHistory] = useState();
    const [active, setActive] = useState(true);

    const linkRef = useRef(null);

    const { user, setUser } = useContext(UserContext);
    const { appSettings, setAppSettings } = useContext(AppSettingsContext);
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
                // console.log(res.order_history);
                setHistory(res.order_history);
                const id = {
                    id: res.data.client_id,
                };
                const client = await getWithAxios("/api/user-detail", id);
                setClient(client.data);
            }
        }
    };

    const downloadInvoice = async () => {
        /* const res = await getWithAxios("/get-invoice-from-backend", {
            id: params.order_id,
            //order : JSON.stringify(order)
        }); */

        linkRef.current.click();
        console.log(res);
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
                <Button auto onPress={downloadInvoice} color={"success"}>
                    <div className="flex items-center justify-center font-bold text-lg gap-2">
                        <BsDownload className="text-2xl" />
                        Invoice
                    </div>
                </Button>
                <div>
                    <a
                        ref={linkRef}
                        className="hidden"
                        href={"/get-invoice-from-backend?id=" + params.order_Id}
                        target="blank"
                    >
                        invoice
                    </a>
                </div>
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
                                            <div>
                                                {order?.payment_type
                                                    ? order?.payment_type
                                                    : "cash"}
                                            </div>
                                        </div>

                                        <div className="flex justify-between">
                                            <div>Payment Status</div>
                                            <div>
                                                {order?.payment_status
                                                    ? order?.payment_status
                                                    : "pending"}
                                            </div>
                                        </div>

                                        <div className="flex justify-between">
                                            <div>Payment collect from</div>
                                            <div>
                                                {order?.payment_collect_from ==
                                                "on_pickup"
                                                    ? "On Pickup"
                                                    : "On Delivery"}{" "}
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
                            {order?.vehicle_data && (
                                <div className="pt-8">
                                    <div>
                                        <div className="pb-2">Vehicle</div>
                                        <div className="border rounded-lg py-3 px-4">
                                            <div className="flex justify-between">
                                                <div>Vehicle name</div>
                                                <div>
                                                    {order?.vehicle_data?.title}
                                                </div>
                                            </div>

                                            <div className="flex py-4 items-center justify-between">
                                                <div>Vehicle Image</div>
                                                <div className="flex justify-center">
                                                    {order?.vehicle_image ? (
                                                        <Image
                                                            height={90}
                                                            width={100}
                                                            src={
                                                                order?.vehicle_image
                                                            }
                                                        />
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="pt-8">
                                <div className="pb-2">Payment Details</div>
                                <div className="border rounded-lg py-3 px-4">
                                    <div className="flex justify-between">
                                        <div>Payment type</div>
                                        <div>
                                            {order?.payment_type
                                                ? order?.payment_type
                                                : "cash"}
                                        </div>
                                    </div>

                                    <div className="flex justify-between">
                                        <div>Payment Status</div>
                                        <div>
                                            {order?.payment_status
                                                ? order?.payment_status
                                                : "pending"}
                                        </div>
                                    </div>

                                    <div className="flex justify-between">
                                        <div>Payment collect from</div>
                                        <div>
                                            {order?.payment_collect_from ==
                                            "on_pickup"
                                                ? "On Pickup"
                                                : "On Delivery"}{" "}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-12">
                                <div>
                                    <div className="grid gap-4 border rounded-lg py-3 px-4">
                                        <div className="flex justify-between">
                                            <div>Delivery Charges</div>
                                            {appSettings?.currency_position ==
                                            "left" ? (
                                                <div>
                                                    {" "}
                                                    {appSettings?.currency}{" "}
                                                    {order?.fixed_charges}
                                                </div>
                                            ) : (
                                                <div>
                                                    {" "}
                                                    {order?.fixed_charges}{" "}
                                                    {appSettings?.currency}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex justify-between">
                                            <div>Distance Charge</div>
                                            {appSettings?.currency_position ==
                                            "left" ? (
                                                <div>
                                                    {" "}
                                                    {appSettings?.currency}{" "}
                                                    {order?.distance_charge}
                                                </div>
                                            ) : (
                                                <div>
                                                    {" "}
                                                    {
                                                        order?.distance_charge
                                                    }{" "}
                                                    {appSettings?.currency}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex justify-between">
                                            <div>Weight Charge</div>
                                            {appSettings?.currency_position ==
                                            "left" ? (
                                                <div>
                                                    {" "}
                                                    {appSettings?.currency}{" "}
                                                    {order?.weight_charge}
                                                </div>
                                            ) : (
                                                <div>
                                                    {" "}
                                                    {order?.weight_charge}{" "}
                                                    {appSettings?.currency}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex justify-between">
                                            <div> </div>
                                            {appSettings?.currency_position ==
                                            "left" ? (
                                                <div>
                                                    {" "}
                                                    {appSettings?.currency}{" "}
                                                    {Math.round(
                                                        (order?.fixed_charges +
                                                            order?.distance_charge +
                                                            order?.weight_charge) *
                                                            100
                                                    ) / 100}
                                                </div>
                                            ) : (
                                                <div>
                                                    {" "}
                                                    {Math.round(
                                                        (order?.fixed_charges +
                                                            order?.distance_charge +
                                                            order?.weight_charge) *
                                                            100
                                                    ) / 100}{" "}
                                                    {appSettings?.currency}
                                                </div>
                                            )}
                                        </div>

                                        <div className=" mt-6">
                                            <div className="py-2">Extra Charges</div>

                                            <div>
                                                {order?.extra_charges?.extracharges?.map(
                                                    (extra, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex justify-between text-sm"
                                                        >
                                                            <div>
                                                                {extra.title}
                                                            </div>
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
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex text-lg font-bold mt-6 justify-between">
                                            <div>Total price</div>

                                            {appSettings?.currency_position ==
                                            "left" ? (
                                                <div>
                                                    {" "}
                                                    {appSettings?.currency}{" "}
                                                    {order?.total_amount}
                                                </div>
                                            ) : (
                                                <div>
                                                    {" "}
                                                    {order?.total_amount}{" "}
                                                    {appSettings?.currency}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {!active && (
                        <div className="grid gap-4 font-bold bg-white text-black py-4 px-6 rounded-b-lg">
                            <ul class="steps steps-vertical">
                                {history?.map((h, index) => (
                                    <li
                                        data-content="✓"
                                        className="step step-success"
                                        index={index}
                                    >
                                        {" "}
                                        <Content history={h} />{" "}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="grid h-fit gap-6">
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

                    {order?.delivery_man_id && (
                        <div className="">
                            <div className="flex justify-between font-bold bg-green-300 p-4 rounded-t-lg">
                                {user?.user_type == "admin"
                                    ? " About delivery person"
                                    : "delivered by"}
                            </div>
                            <div className="grid gap-4 font-bold bg-white text-black py-4 px-6 rounded-b-lg">
                                <div className="flex gap-4 items-center font-bold">
                                    <div>
                                        <BsPerson className="text-4xl" />
                                    </div>

                                    <div className="">
                                        <div>{order?.delivery_man_name}</div>
                                        <div>{order?.delivery_man_contact}</div>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <div className="flex items-center gap-4">
                                        <div className="text-green-500 text-xl">
                                            <BsEnvelope />
                                        </div>
                                        <div>{order?.delivery_man_email}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SingleOrder;

const DataContent = ({ icon }) => {
    return <div className="text-lg text-white">{icon}</div>;
};

const Content = ({ history }) => {
    return (
        <div className="grid text-start gap-2 font-bold text-black">
            <div>{history?.history_type}</div>

            <div className="flex gap-2 font-light text-sm ">
                {history?.history_message}
                {history?.datetime}
            </div>
        </div>
    );
};

const Invoicepdf = () => {
    return (
        <Document>
            <Page size={"A4"}>
                <View>
                    <Text>
                        <div className="flex justify-between text-black px-4 font-bold ">
                            <div className="text-blue-600 text-xl">Invoice</div>
                            <div>
                                <div>Roberts Private Limited</div>
                                <div>Sarah Street 9, Beijing, Ahmedabad</div>
                                <div>+91 9845345665</div>
                            </div>
                        </div>
                    </Text>
                </View>
            </Page>
        </Document>
    );
};
