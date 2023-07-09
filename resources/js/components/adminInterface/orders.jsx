import { Avatar, Button, Loading, Modal, Table } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getWithAxios, postWithAxios } from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs, { Dayjs } from "dayjs";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import Filter from "./ordersPart/filter";
import Status from "./ordersPart/status";
import Assign from "./ordersPart/assign";
import OrderLine from "./ordersPart/orderLine";
import UpdateModal from "./ordersPart/updateModal";
import DeleteModal from "./ordersPart/deleteModal";
import CancelModal from "./ordersPart/cancelModal";

const Orders = () => {
    const [orders, setOrders] = useState();
    const [orderId, setOrderId] = useState();
    const [selectedOrder, setSelectedOrder] = useState();
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openCancel, setOpenCancel] = useState(false);
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
        if (!openUpdate && !openDelete && !openCancel) {
            getOrders();
        }
    }, [filter, openUpdate, openDelete, openCancel]);

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
                {orders ? (
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
                                                "/" +  user?.user_type + "/orderdetail/order_Id/" +
                                                order?.id
                                            }
                                        >
                                            #{order?.id}
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="truncate w-[80px]">
                                            {order?.client_name}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="truncate w-[80px]">
                                            {order?.delivery_man_name}
                                        </div>
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
                                            setOpenCancel={setOpenCancel}
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
                ) : (
                    <Loading type="points" />
                )}
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

            <CancelModal
                order={selectedOrder}
                openCancel={openCancel}
                setOpenCancel={setOpenCancel}
            />
        </div>
    );
};

export default Orders;
