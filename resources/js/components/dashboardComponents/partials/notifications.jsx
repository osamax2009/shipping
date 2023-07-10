import { BsBell } from "react-icons/bs";
import { postWithAxios } from "../../api/axios";
import { useEffect, useState } from "react";

const Notifications = () => {

    const [notifications, setNotifications] = useState([])
    const [unread, setUnread] = useState(0)

    const getNotifications = async() => {
        const res = await postWithAxios("/api/notification-list")
        setNotifications(res.data.notification_data)
        setUnread(res.data.all_unread_count)
    }

    useEffect(() => {
        getNotifications()
    }, [])


    return (
        <li className="nav-item dropdown">
            <a
                className="nav-link"
                data-toggle="dropdown"
                href="#"
                aria-expanded="false"
            >
                <BsBell className="text-lg" />
                <span className="badge badge-warning navbar-badge"> {unread} </span>
            </a>
            <div
                className="dropdown-menu dropdown-menu-lg dropdown-menu-right"
                style={{ left: "inherit", right: "0px;" }}
            >
                <span className="dropdown-item dropdown-header">
                    {unread} Notifications
                </span>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                    <i className="fas fa-envelope mr-2"></i> 4 new messages
                    <span className="float-right text-muted text-sm">
                        3 mins
                    </span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                    <i className="fas fa-users mr-2"></i> 8 friend requests
                    <span className="float-right text-muted text-sm">
                        12 hours
                    </span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                    <i className="fas fa-file mr-2"></i> 3 new reports
                    <span className="float-right text-muted text-sm">
                        2 days
                    </span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item dropdown-footer">
                    See All Notifications
                </a>
            </div>
        </li>
    );
};

export default Notifications;
