import { useContext, useEffect, useState } from "react";
import { postWithAxios } from "../api/axios";
import { Button, Loading, Table } from "@nextui-org/react";
import { BsDot, BsEye, BsFillCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { formatTitle } from "../shared/constancy";
import { UserContext } from "../contexts/userContext";

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
            <div className="text-aggGreen font-bold py-4">Notifications</div>

            {notifications.length > 0 ? (
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
                                        <div className="dark:text-white flex gap-2 text-start items-center">
                                            {" "}
                                            <div>
                                                {!notification?.read_at ? (
                                                    <BsFillCircleFill className="text-sm text-appGreen dark:text-white" />
                                                ) : (
                                                    <BsFillCircleFill className="text-sm text-transparent dark:text-transparent" />
                                                )}
                                            </div>
                                            <div className="col-span-">
                                                {notification?.data.subject}{" "}
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            {" "}
                                            {formatTitle(
                                                notification?.data.type
                                            )}{" "}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            {" "}
                                            {notification?.data.message}{" "}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            {" "}
                                            {notification?.created_at}{" "}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="dark:text-white">
                                            <NotificationLine
                                                notification={notification}
                                                getNotifications={getNotifications}
                                            />
                                        </div>
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
            ) : (
                <Loading type="point" />
            )}

        </div>
    );
};

export default AllNotifications;

const NotificationLine = ({ notification, getNotifications }) => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

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
