import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { appName } from "../../shared/constancy";
import { Link, useLocation } from "react-router-dom";
import { BsBagPlusFill } from "react-icons/bs";
import { FaMapMarkedAlt } from "react-icons/fa";
const Sidebar = () => {
    const { user, setUser } = useContext(UserContext);
    const location = useLocation();

    const userRoutes = [
        {
            title: "Place new Order",
            path: "/account/dashboard/place-new-order",
            icon: <BsBagPlusFill />,
        },

        {
            title: "My orders",
            path: "/account/dashboard/my-orders",
            icon: <BsBagPlusFill />,
        },
    ];

    const adminRoutes = [
        {
            title: "Orders",
            path: "/account/dashboard/orders",
            icon: <BsBagPlusFill />,
        },

        {
            title: "countries and cities",
            path: "/account/dashboard/countries-cities",
            icon: <FaMapMarkedAlt />,
        },
    ];

    return (
        <ul
            className="navbar-nav bg-appGreen sidebar sidebar-dark accordion"
            id="accordionSidebar"
        >
            {/* Sidebar - Brand  */}
            <a
                className="sidebar-brand d-flex align-items-center justify-content-center"
                href="index.html"
            >
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">{appName}</div>
            </a>
            {/* Divider  */}
            <hr className="sidebar-divider" />

            {user?.user_type == "user" ? (
                <>
                    {/* Heading  */}
                    <div className="sidebar-heading">Orders</div>

                    {userRoutes.map((route, index) => (
                        <Link
                            key={index}
                            to={route.path}
                            className="-mb-6 hover:no-underline"
                        >
                            <li
                                className={
                                    location.pathname == route.path
                                        ? " nav-item active"
                                        : "nav-item"
                                }
                            >
                                <div className="nav-link">
                                    <span>{route.icon}</span>
                                    <span>{route.title}</span>
                                </div>
                            </li>
                        </Link>
                    ))}
                </>
            ) : null}

            {user?.user_type == "admin" ? (
                <>
                    {/* Heading  */}
                    <div className="sidebar-heading">Orders</div>

                    {adminRoutes.map((route, index) => (
                        <Link
                            key={index}
                            to={route.path}
                            className="-mb-6 hover:no-underline"
                        >
                            <li
                                className={
                                    location.pathname == route.path
                                        ? " nav-item active"
                                        : "nav-item"
                                }
                            >
                                <div className="nav-link">
                                    <span>{route.icon}</span>
                                    <span>{route.title}</span>
                                </div>
                            </li>
                        </Link>
                    ))}
                </>
            ) : null}

            {/* Nav Item - Pages Collapse Menu  */}

            {/* Divider  */}
            <hr className="sidebar-divider" />
        </ul>
    );
};

export default Sidebar;
