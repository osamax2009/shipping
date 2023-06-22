import { Table } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getWithAxios } from "../api/axios";

const Orders = () => {
    const [orders, setOrders] = useState();

    const getOrders = async () => {
        const res = await getWithAxios("/api/order-list");
        console.log(res.data);
        setOrders(res.data);
    };

    useEffect(() => {
        getOrders();
    }, []);
    return (
        <div>
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
                    <Table.Column>Assign</Table.Column>
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
                            <Table.Cell>
                                <Assign order={order} />
                            </Table.Cell>
                            <Table.Cell>{order.date}</Table.Cell>
                            <Table.Cell>{order.date}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                <Table.Pagination
                    shadow
                    noMargin
                    align="center"
                    rowsPerPage={10}
                    onPageChange={(page) => console.log({ page })}
                />
            </Table>
        </div>
    );
};

export default Orders;

const Assign = ({ order }) => {
    return (
        <div>
            {order.status == "draft" && (
                <div className="text-appGreen">Draft</div>
            )}
        </div>
    );
};
