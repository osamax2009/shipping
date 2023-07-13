import { BsBell } from "react-icons/bs";
import { postWithAxios } from "../../api/axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { useContext } from "react";
import { Avatar } from "@nextui-org/react";
import { FaRegComments } from "react-icons/fa";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [unread, setUnread] = useState(0);
    const { user, setUser } = useContext(UserContext);
    const location = useLocation()
    const path = location.pathName


    const getNotifications = async () => {
        const res = await postWithAxios("/api/notification-list");

        setNotifications(res.notification_data);
        setUnread(res.all_unread_count);
    };

    const markAllAsRead = async () => {
        const res = await postWithAxios("/api/notification-list", {
            type: "markas_read",
        });

        if (res) {
            getNotifications();
        }
    };

    useEffect(() => {
        getNotifications();
    }, [path]);

    return (
        <li className="nav-item dropdown">
            <a
                className="nav-link"
                data-toggle="dropdown"
                href="#"
                aria-expanded="false"
            >
                <BsBell className="text-lg" />
                <span className="badge badge-warning navbar-badge">
                    {" "}
                    {unread}{" "}
                </span>
            </a>
            <div
                className="dropdown-menu gap-4 dropdown-menu-right shadow animated--grow-in"
                style={{ left: "inherit", right: "0px;" }}
            >
                <span className="dropdown-item dropdown-header">
                    <div className="flex justify-between">
                        <span>{unread} Notifications</span>
                        <button
                            className="text-appGreen"
                            onClick={markAllAsRead}
                        >
                            Mark all us read
                        </button>
                    </div>
                </span>
                <div className="dropdown-divider"></div>
                {notifications?.slice(0, 4).map((notification, index) => (
                    <Notification
                        notification={notification}
                        getNotifications={getNotifications}
                        key={index}
                    />
                ))}

                <div className="dropdown-divider"></div>
                <Link
                    to={"/" + user?.user_type + "/notifications"}
                    className="dropdown-item dropdown-footer"
                >
                    See All Notifications
                </Link>
            </div>
        </li>
    );
};

export default Notifications;

const Notification = ({ notification, getNotifications }) => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleNotification = async () => {
        const url =
            "/" +
            user?.user_type +
            "/orderdetail/order_Id/" +
            notification?.data.id;
        navigate(url);
        getNotifications();
        
    };


    return (
        <button
            onClick={handleNotification}
            className="dropdown-item"
           
        >
            <div className="flex gap-4 px-3 items-center focus:no-underline">
                <Avatar
                    size={"lg"}
                    icon={<FaRegComments className="text-appGreen" />}
                />{" "}
                <div className="grid gap-2">
                    <div className="font-bold">
                        {" "}
                        {notification?.data.subject}{" "}
                    </div>
                    <div> {notification?.data.message} </div>
                </div>
                <span className="float-right text-muted text-sm">
                    {" "}
                    {notification?.created_at}{" "}
                </span>
            </div>
        </button>
    );
};
