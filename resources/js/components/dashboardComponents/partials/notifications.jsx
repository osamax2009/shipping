import { BsBell } from "react-icons/bs";
import { postWithAxios } from "../../api/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { useContext } from "react";
import { Avatar } from "@nextui-org/react";
import { FaRegComments } from "react-icons/fa";

const Notifications = () => {
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
                        <button className="text-appGreen">Mark all us read</button>
                    </div>

                </span>
                <div className="dropdown-divider"></div>
                {notifications?.slice(0,4).map((notification, index) => (
                    <Notification notification={notification} key={index} />
                ))}

                <div className="dropdown-divider"></div>
                <Link to={"/admin/notifications"} className="dropdown-item dropdown-footer">
                    See All Notifications
                </Link>
            </div>
        </li>
    );
};

export default Notifications;

const Notification = ({ notification }) => {
    const {user, setUser} = useContext(UserContext)
    return (
        <Link className="dropdown-item" to={ "/" + user?.user_type + "/orderdetail/order_Id/" + notification?.data.id}>
            <div className="flex gap-4 px-3 items-center focus:no-underline">
            <Avatar size={'lg'} icon={<FaRegComments className="text-appGreen" />} /> <div className="grid gap-2">
                <div className="font-bold"> {notification?.data.subject} </div>
                <div> {notification?.data.message} </div>
               </div>
                <span className="float-right text-muted text-sm">  {notification?.created_at} </span>
           
            </div>
        </Link>
    );
};
