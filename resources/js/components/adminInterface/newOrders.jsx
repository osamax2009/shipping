import { Table } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getWithAxios } from "../api/axios";

const NewOrders = () => {
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
            >
                <Table.Header>
                    <Table.Column>Date</Table.Column>
                    <Table.Column>Order id</Table.Column>
                    <Table.Column>PickUp point</Table.Column>
                    <Table.Column>Delivery point</Table.Column>
                    <Table.Column>Parcel Type</Table.Column>
                </Table.Header>
                <Table.Body>
                    {orders?.map((order, index) => (
                        <Table.Row key={index}>
                            <Table.Cell>{order.date}</Table.Cell>
                            <Table.Cell>{order.date}</Table.Cell>
                            <Table.Cell>{order.date}</Table.Cell>
                            <Table.Cell>{order.date}</Table.Cell>
                            <Table.Cell>{order.date}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                <Table.Pagination
                    shadow
                    noMargin
                    align="center"
                    rowsPerPage={3}
                    onPageChange={(page) => console.log({ page })}
                />
            </Table>
        </div>
    );
};

export default NewOrders;
