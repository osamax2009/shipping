import { Button, Modal, Table } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getWithAxios } from "../api/axios";
import { BsPencilFill, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { OrderStatus } from "../shared/constancy";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-toastify";

const Orders = () => {
    const [orders, setOrders] = useState();
    const [orderId, setOrderId] = useState();
    const navigate = useNavigate();

    const goOnorderPage = (e) => {
        e.preventDefault()
       if(orderId)
       {
        const url = "/admin/orderdetail/order_Id/" + orderId
        navigate(url)
       }

       if(!orderId)
       {
            toast("Type an Order Id",{
                type : 'error',
                hideProgressBar : true
            })
       }
    };

    const getOrders = async () => {
        const res = await getWithAxios("/api/order-list");
        setOrders(res.data);
    };

    useEffect(() => {
        getOrders();
    }, []);
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
            <Filter />
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
                    <Table.Column>Actions</Table.Column>
                </Table.Header>
                <Table.Body>
                    {orders?.map((order, index) => (
                        <Table.Row key={index}>
                            <Table.Cell>{order.id}</Table.Cell>
                            <Table.Cell>{order.client_name}</Table.Cell>
                            <Table.Cell>{order.delivery_man_name}</Table.Cell>
                            <Table.Cell>
                                {order.pickup_point.start_time}
                            </Table.Cell>
                            <Table.Cell>
                                {order.pickup_point.address}
                            </Table.Cell>
                            <Table.Cell>
                                {order.delivery_point.address}
                            </Table.Cell>
                            <Table.Cell>{order.date}</Table.Cell>
                            <Table.Cell>
                                <Status order={order} />
                            </Table.Cell>

                            <Table.Cell>
                                <OrderLine order={order} />
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
    );
};

export default Orders;

const OrderLine = ({ order }) => {
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleOpenUpdate = () => {
        setOpenUpdate(true);
    };

    const handleOpenDelete = () => {
        setOpenDelete(true);
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2">
                <Button
                    auto
                    onPress={handleOpenUpdate}
                    color={"success"}
                    icon={<BsPencilFill />}
                ></Button>
                <Button
                    auto
                    onPress={handleOpenDelete}
                    color={"error"}
                    icon={<BsTrash />}
                ></Button>
            </div>
            <div>
                <UpdateModal
                    order={order}
                    open={openUpdate}
                    setOpen={setOpenUpdate}
                />
                <DeleteModal
                    order={order}
                    open={openDelete}
                    setOpen={setOpenDelete}
                />
            </div>
        </div>
    );
};

const Status = ({ order }) => {
    return (
        <div className="text-center  font-bold text-sm ">
            {order.status == "draft" && (
                <div className="text-gray-600 px-4 py-2 rounded-lg bg-gray-300">
                    Draft
                </div>
            )}

            {order.status == "created" && (
                <div className="text-green-600 px-4 py-2 rounded-lg bg-green-300">
                    Created
                </div>
            )}

            {order.status == "accepted" && (
                <div className="text-green-600 px-4 py-2 rounded-lg bg-green-300">
                    Accepted*
                </div>
            )}

            {order.status == "cancelled" && (
                <div className="text-red-600 px-4 py-2 rounded-lg bg-red-300">
                    Cancelled
                </div>
            )}
        </div>
    );
};

const Filter = () => {
    return (
        <div className="flex justify-between py-4">
            <div>
                <div className="flex items-center gap-3">
                    <div className="font-bold">Status</div>
                    <div>
                        <select name="" id="">
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
                    <div className="font-bold">Date</div>
                    <div className="flex items-center gap-6">
                        <DatePicker label={"from"} />
                        <DatePicker  label={"to"} />
                    </div>
                    <Button auto color={'success'}>
                        Apply
                    </Button>
                </div>
        </div>
    );
};

const CreateModal = ({ open, setOpen }) => {
    const [orderValue, setorderValue] = useState("");
    const [orderLabel, setorderLabel] = useState("");

    const handleCreate = async () => {
        const dataToSend = {
            id: "",
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
    return (
        <Modal
            open={open}
            closeButton
            preventClose
            onClose={() => setOpen(false)}
        >
            <Modal.Header>
                <div className="text-lg font-bold text-appGreen">
                    Create new order type{" "}
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="grid w-full h-72">
                    <div className="form-group w-full ">
                        <label htmlFor="order name">order Label</label>
                        <input
                            type="text"
                            className="form-control w-full"
                            value={orderLabel}
                            onChange={(e) => setorderLabel(e.target.value)}
                        />
                    </div>
                    <div className="form-group w-full">
                        <label htmlFor=""> Value</label>
                        <input
                            type="text"
                            className="form-control w-full"
                            value={orderValue}
                            onChange={(e) => setorderValue(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap  w-full gap-6 justify-between sm:justify-end">
                        <Button
                            auto
                            css={{ backgroundColor: "Grey" }}
                            className="text-black"
                            onPress={() => setOpen(false)}
                        >
                            cancel
                        </Button>

                        <Button
                            auto
                            color={"success"}
                            onPress={handleCreate}
                            className="text-black"
                        >
                            Create
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const UpdateModal = ({ order, open, setOpen }) => {
    const [orderValue, setorderValue] = useState(order.value);
    const [orderLabel, setorderLabel] = useState(order.label);

    const handleCreate = async () => {
        const dataToSend = {
            id: order.id,
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
    return (
        <Modal
            open={open}
            closeButton
            preventClose
            onClose={() => setOpen(false)}
        >
            <Modal.Header>
                <div className="text-lg font-bold text-appGreen">
                    Update order type{" "}
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="grid w-full h-72">
                    <div className="form-group w-full ">
                        <label htmlFor="order name">order Label</label>
                        <input
                            type="text"
                            className="form-control w-full"
                            value={orderLabel}
                            onChange={(e) => setorderLabel(e.target.value)}
                        />
                    </div>
                    <div className="form-group w-full">
                        <label htmlFor=""> Value</label>
                        <input
                            type="text"
                            className="form-control w-full"
                            value={orderValue}
                            onChange={(e) => setorderValue(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap w-full gap-6 justify-end">
                        <Button
                            auto
                            css={{ backgroundColor: "Grey" }}
                            className="text-black"
                            onPress={() => setOpen(false)}
                        >
                            cancel
                        </Button>

                        <Button
                            auto
                            color={"success"}
                            onPress={handleCreate}
                            className="text-black"
                        >
                            Update
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const DeleteModal = ({ order, open, setOpen }) => {
    return (
        <Modal open={open} closeButton onClose={() => setOpen(false)}>
            <Modal.Header>
                {" "}
                <div className="text-lg font-bold text-appGreen">
                    Delete order modal
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="font-bold text-black">
                    Confirm, you want to delete order{" "}
                    <span className="text-red-300">
                        {order.name} from list of orderTypes .
                    </span>
                    <div className="flex flex-wrap  w-full gap-6 justify-between sm:justify-end">
                        <Button
                            auto
                            css={{ backgroundColor: "Grey" }}
                            className="text-black"
                            onPress={() => setOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button auto color={"warning"} className="text-black">
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};
