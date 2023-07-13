import { Button, Image, Modal, Table } from "@nextui-org/react";
import { useState } from "react";
import { getWithAxios, postWithAxios } from "../../api/axios";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { useEffect } from "react";
import { BsCheck, BsEye, BsTrash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppSettingsContext } from "../../contexts/appSettings";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const { user, setUser } = useContext(UserContext);
    const [orderId, setOrderId] = useState();
    const [deleteModal, setDeleteModal] = useState(false);
    const { appSettings, setAppSettings } = useContext(AppSettingsContext);
    const [gateways, setGateways] = useState([]);

    const navigate = useNavigate();

    const getOrders = async () => {
        const id = user?.id;
        const res = await getWithAxios("/api/order-list", { client_id: id });
        setOrders(res.data);
    };

    const getPaymentGateways = async () => {
        const res = await getWithAxios("/api/paymentgateway-list");
        setGateways(res.data);
    };
    const goOnorderPage = (e) => {
        e.preventDefault();
        if (orderId) {
            const url = "/client/orderdetail/order_Id/" + orderId;
            navigate(url);
        }

        if (!orderId) {
            toast("Type an Order Id", {
                type: "error",
                hideProgressBar: true,
            });
        }
    };

    useEffect(() => {
        if (!deleteModal) {
            getOrders();
        }
    }, [user, deleteModal]);

    useEffect(() => {
        getPaymentGateways();
    }, []);

    return (
        <div>
            <div className="flex pl-6 w-full justify-end">
                <form className="" onSubmit={goOnorderPage}>
                    <div className="flex flex-wrap justify-end items-center gap-2 px-2">
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            className="form-control"
                            placeholder="order Id"
                        />
                        <Button auto color={"primary"} type="submit">
                            see order details
                        </Button>
                    </div>
                </form>
            </div>
            <div className="font-bold text-lg pb-2 text-appGreen">
                List of your orders
            </div>

            <Table>
                <Table.Header>
                    <Table.Column align="center" width={"auto"}>
                        Id
                    </Table.Column>
                    <Table.Column align="center" width={"auto"}>
                        Distance ({appSettings?.distance_unit}){" "}
                    </Table.Column>
                    <Table.Column align="center" width={"auto"}>
                        Weight ({appSettings?.weight} )
                    </Table.Column>
                    <Table.Column align="center" width={"auto"}>
                        Price
                    </Table.Column>

                    <Table.Column align="center" width={"auto"}>
                        PickUp Address
                    </Table.Column>
                    <Table.Column align="center" width={"auto"}>
                        Delivery Address
                    </Table.Column>
                    <Table.Column align="center" width={"auto"}>
                        Status
                    </Table.Column>
                    <Table.Column align="center" width={"auto"}>
                        Actions
                    </Table.Column>
                    <Table.Column align="center" width={"auto"}></Table.Column>
                </Table.Header>
                <Table.Body>
                    {orders.map((order, index) => (
                        <Table.Row key={index}>
                            <Table.Cell>
                                {" "}
                                <Link
                                    className="underline"
                                    to={
                                        "/" +
                                        user?.user_type +
                                        "/orderdetail/order_Id/" +
                                        order?.id
                                    }
                                >
                                    #{order?.id}
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                {" "}
                                {order.total_distance}
                                {appSettings?.distance_unit}{" "}
                            </Table.Cell>
                            <Table.Cell>
                                {" "}
                                {order.total_weight}
                                {appSettings?.weight}
                            </Table.Cell>
                            <Table.Cell>
                                {" "}
                                {order.total_amount}
                                {appSettings?.currency}{" "}
                            </Table.Cell>
                            <Table.Cell>
                                {" "}
                                <div className="truncate w-[100px]">
                                    {order?.pickup_point.address}
                                </div>{" "}
                            </Table.Cell>
                            <Table.Cell>
                                {" "}
                                <div className="truncate w-[100px]">
                                    {order?.delivery_point.address}
                                </div>{" "}
                            </Table.Cell>
                            <Table.Cell>
                                {" "}
                                <OrderStatus order={order} />{" "}
                            </Table.Cell>

                            <Table.Cell>
                                <OrderLine
                                    order={order}
                                    deleteModal={deleteModal}
                                    setDeleteModal={setDeleteModal}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <PaymentLine
                                    order={order}
                                    gateways={gateways}
                                    getOrders={getOrders}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                <Table.Pagination
                    shadow
                    noMargin
                    align="center"
                    rowsPerPage={6}
                    onPageChange={(page) => console.log({ page })}
                />
            </Table>
        </div>
    );
};

export default MyOrders;

const OrderLine = ({ order, deleteModal, setDeleteModal }) => {
    const navigate = useNavigate();

    const goToOrderDetail = () => {
        const url = "/client/orderdetail/order_Id/" + order.id;
        navigate(url);
    };

    const handleDelete = async () => {
        setDeleteModal(false);
        const url = "/api/order-delete/" + order.id;
        const res = await postWithAxios(url);

        if (res.message) {
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }
    };

    return (
        <div className="flex gap-4">
            <Button auto icon={<BsEye />} onPress={goToOrderDetail}></Button>

            <Button
                auto
                icon={<BsTrash />}
                onPress={() => setDeleteModal(true)}
                color={"error"}
            ></Button>

            <Modal
                open={deleteModal}
                onClose={() => setDeleteModal(false)}
                closeButton
            >
                <Modal.Header>
                    <div className="text-lg font-bold text-red-400">
                        Delete order
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <span className="text-red-700">Confirm</span> you want
                        to delete the order{" "}
                        <span className="text-red-700">#{order.id}</span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-end pr-3">
                        <Button color={"error"} onPress={handleDelete}>
                            confirm
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const OrderStatus = ({ order }) => {
    return (
        <div className="flex font-bold">
            {order?.status == "draft" && (
                <div className="text-gray-500">Draft</div>
            )}

            {order?.status == "create" && (
                <div className="text-green-500">Created</div>
            )}

            {order?.status == "courier_assigned" && (
                <div className="text-green-500">Assigned</div>
            )}

            {order?.status == "courier_departed" && (
                <div className="text-purple-500">Departed</div>
            )}
        </div>
    );
};

const PaymentLine = ({ order, gateways, getOrders }) => {
    const [open, setOpen] = useState(false);
    const { appSettings, setAppSettings } = useContext(AppSettingsContext);
    const { user, setUser } = useContext(UserContext);

    const openModal = () => {
        setOpen(true);
    };
    const handlePayment = async () => {
        const dataToSend = {
            order_id: order?.id,
            client_id: user?.id,
            total_amount: order?.total_amount,
            payment_type: "wallet",
            txn_id: Date.now(),
            payment_status: "paid",
            transaction_detail: {},
        };

        const res = await postWithAxios("/api/payment-save", dataToSend);

        if (res.message) {
            setOpen(false);
            getOrders();
            toast(res.message, {
                type: "info",
                hideProgressBar: true,
            });
        }
    };

    return (
        <div>
            <div className="flex w-full justify-center">
                {!order?.payment_id && (
                    <Button color={"success"} auto onPress={openModal}>
                        Pay
                    </Button>
                )}

                {order?.payment_id && order?.payment_status == "paid" && (
                    <div className="py-2 px-4 text-center font-bold text-appGreen flex justify-center border border-appGreen rounded-lg items-center gap-2">
                        <span>Paid</span>
                        <BsCheck className="text-lg" />
                    </div>
                )}
            </div>
            <Modal open={open} closeButton onClose={() => setOpen(false)}>
                <Modal.Header>
                    <div className="text-center font-bold text-lg text-appGreen">
                        Wallet Payment
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="flex justify-center gap-4 pb-6 pt-2">
                        <div className="w-full">
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
                                            {order?.distance_charge}{" "}
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
                                        {order?.extra_charges.map(
                                            (extra, index) => (
                                                <div
                                                    key={index}
                                                    className="flex justify-between text-sm"
                                                >
                                                    <div>{extra.title}</div>
                                                    <div>
                                                        {appSettings?.currency_position ==
                                                        "left"
                                                            ? appSettings?.currency
                                                            : null}{" "}
                                                        {extra.value}{" "}
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
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex gap-4 justify-end">
                        <Button auto color={"success"} onPress={handlePayment}>
                            Pay
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
