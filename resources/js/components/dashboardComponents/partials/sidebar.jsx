import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { appName } from "../../shared/constancy";
import { Link, useLocation } from "react-router-dom";
import { BsBagPlusFill, BsBicycle, BsBox, BsBox2, BsBuilding, BsFile, BsFiles, BsFillBoxSeamFill, BsFillCreditCardFill, BsList, BsListCheck, BsPinMapFill } from "react-icons/bs";
import { FaListAlt, FaMapMarkedAlt } from "react-icons/fa";
import { RiDashboardFill, RiEBikeFill } from "react-icons/ri";
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
            title: "Dashboard",
            path: "/admin/new-orders",
            icon: <RiDashboardFill />,
        },

        {
            title: "Country",
            path: "/admin/country",
            icon: <BsPinMapFill />,
        },

        {
            title: "city",
            path: "/admin/city",
            icon: <BsBuilding />,
        },

        {
            title: "vehicle",
            path: "/admin/new-orders",
            icon: <RiEBikeFill />,
        },

        {
            title: "Extra Charges",
            path: "/admin/new-orders",
            icon: <RiDashboardFill />,
        },

        {
            title: "Parcel Type",
            path: "/admin/parcel-types",
            icon: <BsFillBoxSeamFill />
        },

        {
            title: "Payment gateway",
            path: "/admin/new-orders",
            icon: <BsFillCreditCardFill />,
        },

        {
            title: "Create Order",
            path: "/admin/new-orders",
            icon: <FaListAlt />,
        },

        {
            title: "All Orders",
            path: "/admin/orders",
            icon: <BsListCheck />,
        },

        {
            title: "Document",
            path: "/admin/new-orders",
            icon: <BsFile />,
        },

        {
            title: "Delivery Person Document",
            path: "/account/dashboard/countries-cities",
            icon: <BsFiles />,
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

            {user?.user_type == "client" ? (
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
                                    <div className="!text-2xl">
                                        {route.icon}
                                    </div>

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
                                        : "nav-item "
                                }
                            >
                                <div className="nav-link ">
                                    <div className=" flex gap-2">
                                        <span className="text-xl items-center">
                                        {route.icon}
                                        </span>
                                        <div className="text-sm">{route.title}</div>
                                    </div>
                                   
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
