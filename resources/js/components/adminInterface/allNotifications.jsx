import { useEffect, useState } from "react";
import { postWithAxios } from "../api/axios";
import { Button, Table } from "@nextui-org/react";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const AllNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [unread, setUnread] = useState(0);

    const getNotifications = async () => {
        const res = await postWithAxios("/api/notification-list");
        setNotifications(res.notification_data);
        setUnread(res.all_unread_count);
    };

    useEffect(() => {
        getNotifications();
    }, []);
    return (
        <div className="">
            <div className="text-aggGreen font-bold">Notifications</div>
            <div>
                <Table>
                    <Table.Header>
                        <Table.Column> Subject </Table.Column>
                        <Table.Column> Type </Table.Column>
                        <Table.Column> Message </Table.Column>
                        <Table.Column> Created </Table.Column>
                        <Table.Column> Actions </Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {notifications?.map((notification, index) => (
                            <Table.Row key={index}>
                                <Table.Cell>
                                    {" "}
                                    {notification?.data.subject}{" "}
                                </Table.Cell>
                                <Table.Cell>
                                    {" "}
                                    {notification?.data.type}{" "}
                                </Table.Cell>
                                <Table.Cell>
                                    {" "}
                                    {notification?.data.message}{" "}
                                </Table.Cell>
                                <Table.Cell>
                                    {" "}
                                    {notification?.created_at}{" "}
                                </Table.Cell>
                                <Table.Cell>
                                    <NotificationLine
                                        notification={notification}
                                    />
                                </Table.Cell>
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
        </div>
    );
};

export default AllNotifications;

const NotificationLine = ({ notification }) => {
    const navigate = useNavigate();

    const goToOrder = () => {
        const url =
            "/" +
            user?.user_type +
            "/orderdetail/order_Id/" +
            notification?.data.id;
        navigate(url);
    };
    return (
        <Button
            onPress={goToOrder}
            color="secondary"
            auto
            icon={<BsEye />}
        ></Button>
    );
};
