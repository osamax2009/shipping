import { useEffect } from "react";
import { getWithAxios } from "../api/axios";
import { Table } from "@nextui-org/react";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

const EarnHistory = () => {
    const [orders, setOrders] = useState([]);
    const { user, setUser } = useContext(UserContext);

    const getEarnings = async () => {
        const dataToSend = {
            delivery_man_id: user?.id,
            type: "earning",
        };
        const res = await getWithAxios("/api/payment-list", dataToSend);
        console.log(res);
       
    };

    useEffect(() => {
        getEarnings();
    }, [user]);

    return (
        <div>
            <Table>
                <Table.Header>
                    <Table.Column>Order id</Table.Column>
                    <Table.Column>Name</Table.Column>
                    <Table.Column> Amount </Table.Column>
                </Table.Header>
                <Table.Body>
                    {orders?.map((order, index) => (
                        <Table.Row key={index}>
                            <Table.Cell> {order.id} </Table.Cell>
                            <Table.Cell> {order.user_name} </Table.Cell>
                            <Table.Cell> {order.amount} </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};

export default EarnHistory;
