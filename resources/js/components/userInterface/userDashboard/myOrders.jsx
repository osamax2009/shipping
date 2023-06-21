import { Table } from "@nextui-org/react";
import { useState } from "react";
import { getWithAxios } from "../../api/axios";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { useEffect } from "react";
import DashboardLayout from "../../dashboardComponents/dashbboardLayout";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const { user, setUser } = useContext(UserContext);

    const getOrders = async () => {
        const id = user?.id;
        const res = await getWithAxios("/api/order-list", { client_id: id });
        setOrders(res.data);
    };

    useEffect(() => {
        getOrders();
    }, [user]);
    return (
        <DashboardLayout>
            <div>
                <div className="font-bold text-lg">List of your orders</div>
                <Table>
                    <Table.Header>
                        <Table.Column>Id</Table.Column>
                        <Table.Column>Distance</Table.Column>
                        <Table.Column>Weight</Table.Column>
                        <Table.Column>Price</Table.Column>
                        <Table.Column>Status</Table.Column>
                        <Table.Column>PickUp Address</Table.Column>
                        <Table.Column>Delivery Address</Table.Column>
                        <Table.Column>Actions</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {orders.map((order, index) => (
                            <Table.Row key={index}>
                                <Table.Cell> {order.id} </Table.Cell>
                                <Table.Cell>
                                    {" "}
                                    {order.total_distance}{" "}
                                </Table.Cell>
                                <Table.Cell> {order.total_weight} </Table.Cell>
                                <Table.Cell> {order.total_amount} </Table.Cell>
                                <Table.Cell> {order.status} </Table.Cell>
                                <Table.Cell>
                                    {" "}
                                    {order.pickup_point.address}{" "}
                                </Table.Cell>
                                <Table.Cell>
                                    {" "}
                                    {order.delivery_point.address}{" "}
                                </Table.Cell>
                                <Table.Cell>
                                    {" "}
                                    {order.total_distance}{" "}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </DashboardLayout>
    );
};

export default MyOrders;
