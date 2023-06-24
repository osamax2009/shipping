import { Button, Loading, Modal, Table } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getWithAxios, postWithAxios } from "../api/axios";
import { BsPencilFill, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { OrderStatus } from "../shared/constancy";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-toastify";
import dayjs, { Dayjs } from "dayjs";

const Orders = () => {
    const [orders, setOrders] = useState();
    const [orderId, setOrderId] = useState();
    const [selectedOrder, setSelectedOrder] = useState();
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [filter, setFilter] = useState({
        client_id: null,
        city_id: null,
        status: "",
        delivery_man_id: null,
        from_date: null,
        to_date: null,
    });
    const navigate = useNavigate();

    const goOnorderPage = (e) => {
        e.preventDefault();
        if (orderId) {
            const url = "/admin/orderdetail/order_Id/" + orderId;
            navigate(url);
        }

        if (!orderId) {
            toast("Type an Order Id", {
                type: "error",
                hideProgressBar: true,
            });
        }
    };

    const getOrders = async () => {
        const params = {
            client_id: filter.client_id,
            city_id: filter.city_id,
            status: filter.status,
            delivery_man_id: filter.delivery_man_id,
            from_date: filter.from_date
                ? dayjs(filter.from_date).format("YYYY-MM-DD")
                : null,
            to_date: filter.to_date
                ? dayjs(filter.to_date).format("YYYY-MM-DD")
                : null,
        };

        const res = await getWithAxios("/api/order-list", params);

        setOrders(res.data);
    };

    useEffect(() => {
        if (!openUpdate && !openDelete) {
            getOrders();
        }
    }, [filter, openUpdate, openDelete]);
    return (
        <div>
            <div className="flex justify-between">
                <div className="text-xl font-bold text-appGreen">Orders</div>
                <div>
                    <form onSubmit={goOnorderPage}>
                        <div className="flex gap-2 px-2">
                            <label htmlFor=""> Order Id</label>
                            <input
                                type="text"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                className="form-control"
                            />
                            <Button auto color={"success"} type="submit">
                                go
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <Filter filter={filter} setFilter={setFilter} />
            <Table
                aria-label="New orders table"
                css={{
                    height: "auto",
                    minWidth: "100%",
                }}
                className="text-sm"
            >
                <Table.Header>
                    <Table.Column>Order Id</Table.Column>
                    <Table.Column>Customer Name</Table.Column>
                    <Table.Column>Delivery Person</Table.Column>
                    <Table.Column>PickUp Date</Table.Column>
                    <Table.Column>PickUp Address</Table.Column>
                    <Table.Column>Delivery Address</Table.Column>
                    <Table.Column>Create Date</Table.Column>
                    <Table.Column>Status</Table.Column>
                    <Table.Column>Assign</Table.Column>
                    <Table.Column>Actions</Table.Column>
                </Table.Header>
                <Table.Body>
                    {orders?.map((order, index) => (
                        <Table.Row key={index}>
                            <Table.Cell>{order?.id}</Table.Cell>
                            <Table.Cell>{order?.client_name}</Table.Cell>
                            <Table.Cell>{order?.delivery_man_name}</Table.Cell>
                            <Table.Cell>
                                {order?.pickup_point.start_time}
                            </Table.Cell>
                            <Table.Cell>
                                {order?.pickup_point.address}
                            </Table.Cell>
                            <Table.Cell>
                                {order?.delivery_point.address}
                            </Table.Cell>
                            <Table.Cell>{order?.date}</Table.Cell>
                            <Table.Cell>
                                <Status order={order} />
                            </Table.Cell>
                            <Table.Cell>
                                <Assign
                                    order={order}
                                    setOpenUpdate={setOpenUpdate}
                                    openUpdate={openUpdate}
                                />
                            </Table.Cell>

                            <Table.Cell>
                                <OrderLine
                                    order={order}
                                    setSelectedOrder={setSelectedOrder}
                                    setOpenDelete={setOpenDelete}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                <Table.Pagination
                    shadow
                    noMargin
                    align="center"
                    rowsPerPage={7}
                    onPageChange={(page) => console.log({ page })}
                />
            </Table>

            <UpdateModal
                order={selectedOrder}
                open={openUpdate}
                setOpen={setOpenUpdate}
            />

            <DeleteModal
                order={selectedOrder}
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
            />
        </div>
    );
};

export default Orders;

const OrderLine = ({ order, setOpenDelete, setSelectedOrder }) => {
    const handleOpenDelete = () => {
        setSelectedOrder(order);
        setOpenDelete(true);
    };

    return (
        <Button
            auto
            onPress={handleOpenDelete}
            color={"error"}
            icon={<BsTrash />}
        ></Button>
    );
};

const Status = ({ order }) => {
    return (
        <div className="text-center  font-bold text-sm ">
            {order?.status == "draft" && (
                <div className="text-gray-600 px-3 py-2 rounded-lg bg-gray-300">
                    Draft
                </div>
            )}

            {order?.status == "create" && (
                <div className="text-green-600 px-3 py-2 rounded-lg bg-green-300">
                    Created
                </div>
            )}

            {order?.status == "accepted" && (
                <div className="text-green-600 px-3 py-2 rounded-lg bg-green-300">
                    Accepted*
                </div>
            )}

            {order?.status == "cancelled" && (
                <div className="text-red-600 px-3 py-2 rounded-lg bg-red-300">
                    Cancelled
                </div>
            )}
        </div>
    );
};

const Filter = ({ filter, setFilter }) => {
    return (
        <div className="flex justify-between py-4">
            <div>
                <div className="flex items-center gap-3">
                    <div className="font-bold">Status</div>
                    <div>
                        <select
                            name=""
                            id=""
                            value={filter.status}
                            onChange={(e) =>
                                setFilter({ ...filter, status: e.target.value })
                            }
                        >
                            {OrderStatus.map((status, index) => (
                                <option key={index} value={status.value}>
                                    {" "}
                                    {status.label}{" "}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="font-bold">Date </div>
                <div className="flex items-center gap-6">
                    <DatePicker
                        label={"from"}
                        value={filter.from_date}
                        onChange={(e) => setFilter({ ...filter, from_date: e })}
                    />
                    <DatePicker
                        label={"to"}
                        value={filter.to_date}
                        onChange={(e) => setFilter({ ...filter, to_date: e })}
                    />
                </div>
                <Button auto color={"success"}>
                    Apply
                </Button>
            </div>
        </div>
    );
};

const Assign = ({ order, openUpdate, setOpenUpdate }) => {
    const handleStatus = async () => {
        setOpenUpdate(true);
        if (order?.status == "create") {
            const dataToSend = {
                id: order?.id,
                cancelled_delivery_man_ids: order?.cancelled_delivery_man_ids,
            };
            const res = await postWithAxios(
                "/api/order-auto-assign",
                dataToSend
            );
            console.log(res);

            if (res.message) {
                setOpenUpdate(false);
                toast(res.message, {
                    type: "default",
                    hideProgressBar: true,
                });
            }
        }
    };

    const handleOpenUpdate = () => {
        setOpenUpdate(true);
    };

    return (
        <div>
            {order?.status != "draft" && order?.status != "cancelled" ? (
                <Button
                    auto
                    onPress={handleStatus}
                    color={"success"}
                    className="mx-6"
                >
                    {OrderStatus.map((orderStatus) => {
                        if (orderStatus.value == order?.status) {
                            return orderStatus.value == "create"
                                ? "Assign"
                                : "Transfer";
                        }
                    })}
                </Button>
            ) : (
                <div className="text-green-500">
                    {OrderStatus.map((orderStatus) => {
                        if (orderStatus.value == order?.status) {
                            return orderStatus.value;
                        }
                    })}
                </div>
            )}

            <div></div>
        </div>
    );
};

const UpdateModal = ({ order, open, setOpen }) => {
    const [orderValue, setorderValue] = useState(order?.value);
    const [orderLabel, setorderLabel] = useState(order?.label);

    const handleCreate = async () => {
        const dataToSend = {
            id: order?.id,
            type: "order_type",
            label: orderLabel,
            value: orderValue,
        };

        const res = await postWithAxios("/api/staticdata-save", dataToSend);

        if (res.message == "Static Data has been save successfully") {
            setOpen(false);
            window.location.reload();
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }

        if (res.message !== "Static Data has been save successfully") {
            toast(res.message, {
                type: "error",
                hideProgressBar: true,
            });
        }
    };
    useEffect(() => {
        setorderValue(order?.value);
        setorderLabel(order?.label);
    }, [order]);
    return (
        <Modal
            open={open}
            closeButton
            preventClose
            onClose={() => setOpen(false)}
        >
            <Modal.Header>
                <div className="text-lg font-bold text-appGreen">
                    Assign order
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="">
                    {order?.status == "create" && (
                        <div className="flex gap-3">
                            Assigning order to a delivery man{" "}
                            <Loading type="points" />
                        </div>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
};

const DeleteModal = ({ order, openDelete, setOpenDelete }) => {
    const [selected, setSelected] = useState(order);

    const deleteOrder = async () => {
        setOpenDelete(false);
        const url = "/api/order-delete/" + selected.id;
        const res = await postWithAxios(url);

        if (res.message) {
            toast(res.message, {
                type: "success",
                hideProgressBar: true,
            });
        }
    };

    useEffect(() => {
        setSelected(order);
    }, [order]);

    return (
        <Modal
            open={openDelete}
            closeButton
            onClose={() => setOpenDelete(false)}
        >
            <Modal.Header>
                {" "}
                <div className="text-lg font-bold text-red-800">
                    Delete order modal
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="font-bold text-black">
                    Confirm, you want to delete order{" "}
                    <span className="text-red-800">#{selected?.id} ?</span>
                    <div className="flex flex-wrap mt-4 w-full gap-6 justify-between sm:justify-end">
                        <Button
                            auto
                            css={{ backgroundColor: "Grey" }}
                            className="text-black"
                            onPress={() => setOpenDelete(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            auto
                            color={"error"}
                            onPress={deleteOrder}
                            className="text-black"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};
