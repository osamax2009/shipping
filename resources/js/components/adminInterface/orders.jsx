import { Avatar, Button, Loading, Modal, Table } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getWithAxios, postWithAxios } from "../api/axios";
import { BsEye, BsPencilFill, BsTrash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { OrderStatus } from "../shared/constancy";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-toastify";
import dayjs, { Dayjs } from "dayjs";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { FormControl, MenuItem, Select } from "@mui/material";

const Orders = () => {
    const [orders, setOrders] = useState();
    const [orderId, setOrderId] = useState();
    const [selectedOrder, setSelectedOrder] = useState();
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const { user, setUser } = useContext(UserContext);
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
        <div className="">
            <div className="text-xl font-bold text-appGreen">Orders</div>
            <div className="flex w-full items-center justify-end">
                <div>Order Id</div>
                <div className="">
                    <form onSubmit={goOnorderPage} className="w-full">
                        <div className="flex w-full justify-end gap-2 px-2">
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
            <div className="text-sm w-full">
                <Table
                    aria-label="New orders table"
                    css={{
                        height: "auto",
                        minWidth: "100%",
                    }}
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
                                <Table.Cell>
                                    <Link
                                        className="underline"
                                        to={
                                            "/admin/orderdetail/order_Id/" +
                                            order?.id
                                        }
                                    >
                                        #{order?.id}
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>{order?.client_name}</Table.Cell>
                                <Table.Cell>
                                    {order?.delivery_man_name}
                                </Table.Cell>
                                <Table.Cell>
                                    {dayjs(order?.pickup_point.date).format(
                                        "DD-MM-YYYY; HH:mm:ss"
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="truncate w-[80px]">
                                        {order?.pickup_point.address}
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="truncate w-[80px]">
                                        {order?.delivery_point.address}
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    {dayjs(order?.date).format(
                                        "DD-MM-YYYY; HH:mm:ss"
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    <Status order={order} />
                                </Table.Cell>
                                <Table.Cell>
                                    <Assign
                                        order={order}
                                        setOpenUpdate={setOpenUpdate}
                                        setSelectedOrder={setSelectedOrder}
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
            </div>
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
    const navigate = useNavigate();
    const handleOpenDelete = () => {
        setSelectedOrder(order);
        setOpenDelete(true);
    };

    const handleOpenDetails = () => {
        const url = "/admin/orderdetail/order_Id/" + order?.id;
        navigate(url);
    };

    return (
        <div className="flex flex-wrap gap-4">
            <Button
                auto
                onPress={handleOpenDetails}
                color={"success"}
                icon={<BsEye />}
            ></Button>

            <Button
                auto
                onPress={handleOpenDelete}
                color={"error"}
                icon={<BsTrash />}
            ></Button>
        </div>
    );
};

const Status = ({ order }) => {
    return (
        <div className="text-center  font-bold text-sm ">
            {order?.status == "draft" && (
                <div className="text-gray-600 px-2 py-2 rounded-lg bg-gray-300">
                    Draft
                </div>
            )}

            {order?.status == "create" && (
                <div className="text-green-600 px-2 py-2 rounded-lg bg-green-300">
                    Created
                </div>
            )}

            {order?.status == "courier_assigned" && (
                <div className="text-green-600 px-2 py-2 rounded-lg bg-green-300">
                    Assigned
                </div>
            )}

            {order?.status == "active" && (
                <div className="text-green-600 px-3 py-2 rounded-lg bg-green-300">
                    Active
                </div>
            )}

            {order?.status == "cancelled" && (
                <div className="text-red-600 px-3 py-2 rounded-lg bg-red-400">
                    Cancelled*
                </div>
            )}

            {order?.status == "departed" && (
                <div className="text-red-600 px-3 py-2 rounded-lg bg-red-400">
                    Departed*
                </div>
            )}

            {order?.status == "departed" && (
                <div className="text-red-600 px-3 py-2 rounded-lg bg-red-400">
                    Departed*
                </div>
            )}
        </div>
    );
};

const Filter = ({ filter, setFilter }) => {
    return (
        <div className="flex flex-wrap gap-4 justify-between py-4">
            <div>
                <div className="flex items-center gap-3">
                    <div className="font-bold">Status </div>
                    <div className="py-4 font-bold">
                        <div className="w-full">
                            <FormControl sx={{ m: 1 }} className="w-full">
                                <Select
                                    inputProps={{
                                        "aria-label": "Without label",
                                    }}
                                    value={filter.status}
                                    displayEmpty
                                    onChange={(e) =>
                                        setFilter({
                                            ...filter,
                                            status: e.target.value,
                                        })
                                    }
                                >
                                    {/*  <MenuItem
                                               
                                                defaultChecked
                                                value={""}
                                            >
                                                All
                                            </MenuItem> */}
                                    {OrderStatus?.map((status, index) => (
                                        <MenuItem
                                            key={index}
                                            value={status.value}
                                        >
                                            {status.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
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

const Assign = ({ order, setSelectedOrder, setOpenUpdate }) => {
    const { user, setUser } = useContext(UserContext);

    const handleStatus = async () => {
        setOpenUpdate(true);
        setSelectedOrder(order);
    };

    const handleAutoAssign = async () => {
        const dataToSeend = {
            id: order?.id,
            cancelled_delivery_man_ids: [],
        };

        const res = await postWithAxios("/api/order-auto-assign", dataToSeend);

        if (res.message == "Order has been assigned successfully.") {
            toast(res.message, {
                type: "info",
                hideProgressBar: true,
            });
        }
    };

    const cancelOrder = async () => {
        const dataToSeend = {
            id: order?.id,
            cancelled_delivery_man_ids: [],
        };

        const res = await postWithAxios("/api/order-auto-assign", dataToSeend);

        if (res.message == "Order has been assigned successfully.") {
            toast(res.message, {
                type: "info",
                hideProgressBar: true,
            });
        }
    };

    return (
        <div>
            {user?.user_type == "admin" ? (
                order?.status == "draft" ? (
                    <Button
                        auto
                        onPress={handleStatus}
                        color={"success"}
                        className="mx-6"
                    >
                        create
                    </Button>
                ) : order?.status == "create" ? (
                    <Button
                        auto
                        onPress={handleStatus}
                        color={"success"}
                        className="mx-6"
                    >
                        {" "}
                        Assign
                    </Button>
                ) : order?.status == "cancelled" ? (
                    <div className="font-bold text-red-600 ">
                        Order cancelled
                    </div>
                ) : (
                    <Button
                        auto
                        onPress={handleStatus}
                        color={"secondary"}
                        className="mx-6"
                    >
                        {" "}
                        Transfer
                    </Button>
                )
            ) : null}

            {user?.user_type == "delivery_man" ? (
                order?.status == "draft" ? (
                    <div className="font-bold text-orange-600 ">Created</div>
                ) : order?.status == "create" ? (
                    <Button
                        auto
                        onPress={handleAutoAssign}
                        color={"secondary"}
                        className="mx-6"
                    >
                        {" "}
                        Assign
                    </Button>
                ) : order?.status == "courier_assigned" ? (
                    <div className="grid gap-3">
                        <Button
                            auto
                            onPress={handleStatus}
                            color={"success"}
                            className="mx-6"
                        >
                            {" "}
                            Accept
                        </Button>

                        <Button
                            auto
                            disabled
                            onPress={cancelOrder}
                            color={"error"}
                            className="mx-6"
                        >
                            {" "}
                            Cancel
                        </Button>
                    </div>
                ) : order?.status == "accepted" ? (
                    <div className="font-bold text-green-600 ">Pick Up*</div>
                ) : order?.status == "departed" ? (
                    <Button
                        auto
                        onPress={handleStatus}
                        color={"success"}
                        className="mx-6"
                    >
                        {" "}
                        Arrived
                    </Button>
                ) : order?.status == "active" ? (
                    <Button
                        auto
                        onPress={handleStatus}
                        color={"success"}
                        className="mx-6"
                    >
                        {" "}
                        Departed
                    </Button>
                ) : order?.status == "arrived" ? (
                    <Button
                        auto
                        onPress={handleStatus}
                        color={"success"}
                        className="mx-6"
                    >
                        {" "}
                        Delivered
                    </Button>
                ) : order?.status == "delivered" ? (
                    <div className="font-bold text-gray-600 ">Delivered*</div>
                ) : (
                    <div className="text-green-500">{order?.status}</div>
                )
            ) : null}

            <div></div>
        </div>
    );
};

const AssignButton = ({order, deliverManId, setOpen}) => {

    const handleAssignOrder = async () => {

        if (order?.status == "create") {
            const dataToSend = {
                id: order?.id,
                type: "courier_assigned",
                delivery_man_id: deliverManId,
                status: "courier_assigned",
            };

            const res = await postWithAxios("/api/order-action", dataToSend);
            console.log("create   ", res)


            if (res.message == "Order has been assigned successfully.") {
                setOpen(false);
                toast(res.message, {
                    type: "info",
                    hideProgressBar: true,
                });
                
            }
        } else {
            const dataToSend = {
                id: order?.id,
                type: "courier_assigned",
                delivery_man_id : deliverManId,
                status: "courier_assigned",
            };

            const res = await postWithAxios("/api/order-action", dataToSend);
            console.log("transfer", res)

            if (res.message) {
                setOpen(false);
                toast(res.message, {
                    type: "info",
                    hideProgressBar: true,
                });
              
            }
        }
    };
    return (
       <div>
         <Button
            auto
            color={"success"}
            onPress={() => {
                handleAssignOrder;
            }}
        >
            {order?.id} {deliverManId}
            {order?.status == "create" ? "Assign Order" : "Transfer Order"}
        </Button>
       </div>
    );
};

const UpdateModal = ({ order, open, setOpen }) => {
    const [delivers, setDelivers] = useState();
    const [deliverId, setDeliverId] = useState();

    const getDelivers = async () => {
        const dataToSend = {
            user_type: "delivery_man",
        };

        const res = await getWithAxios("/api/user-list", dataToSend);

        setDelivers(res.data);
        //  console.log(res.data);
    };

    


    useEffect(() => {
        getDelivers();
    }, []);


    return (
        <Modal
            open={open}
            closeButton
            preventClose
            onClose={() => setOpen(false)}
        >
            <Modal.Header>
                <div className="text-lg font-bold text-appGreen">
                    {order?.status == "create"
                        ? "Assign order"
                        : "Transfer order"}
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="h-[80vh]">
                    <Table>
                        <Table.Header>
                            <Table.Column> </Table.Column>
                            <Table.Column> </Table.Column>
                            <Table.Column> </Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {delivers?.map((deliver, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>
                                        <Avatar
                                            src={deliver.profile_image}
                                            size={"md"}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex flex-col gap-2 text-sm font-bold">
                                            <div>{deliver.name}</div>
                                            <div className="font-light">
                                                {deliver.contact_number}
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <AssignButton
                                            deliverManId={deliver.id}
                                            order={order}
                                            setOpen={setOpen}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
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
