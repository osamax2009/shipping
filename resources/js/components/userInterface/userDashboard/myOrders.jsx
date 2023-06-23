import { Button, Modal, Table } from "@nextui-org/react";
import { useState } from "react";
import { getWithAxios, postWithAxios } from "../../api/axios";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { useEffect } from "react";
import DashboardLayout from "../../dashboardComponents/dashbboardLayout";
import { BsEye, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const { user, setUser } = useContext(UserContext);
    const [orderId, setOrderId] = useState();
    const [deleteModal, setDeleteModal] = useState(false);

    const navigate = useNavigate();

    const getOrders = async () => {
        const id = user?.id;
        const res = await getWithAxios("/api/order-list", { client_id: id });
        setOrders(res.data);
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
                    <Table.Column>Id</Table.Column>
                    <Table.Column>Distance</Table.Column>
                    <Table.Column>Weight</Table.Column>
                    <Table.Column>Price</Table.Column>

                    <Table.Column>PickUp Address</Table.Column>
                    <Table.Column>Delivery Address</Table.Column>
                    <Table.Column>Status</Table.Column>
                    <Table.Column>Actions</Table.Column>
                </Table.Header>
                <Table.Body>
                    {orders.map((order, index) => (
                        <Table.Row key={index}>
                            <Table.Cell> {order.id} </Table.Cell>
                            <Table.Cell> {order.total_distance} </Table.Cell>
                            <Table.Cell> {order.total_weight} </Table.Cell>
                            <Table.Cell> {order.total_amount} </Table.Cell>
                            <Table.Cell>
                                {" "}
                                {order.pickup_point.address}{" "}
                            </Table.Cell>
                            <Table.Cell>
                                {" "}
                                {order.delivery_point.address}{" "}
                            </Table.Cell>
                            <Table.Cell> {order.status} </Table.Cell>

                            <Table.Cell>
                                <OrderLine
                                    order={order}
                                    deleteModal={deleteModal}
                                    setDeleteModal={setDeleteModal}
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
