import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { appName } from "../../shared/constancy";
import { Link, useLocation } from "react-router-dom";
import {
    BsBagPlusFill,
    BsBicycle,
    BsBox,
    BsBox2,
    BsBuilding,
    BsCardChecklist,
    BsFile,
    BsFiles,
    BsFillBoxSeamFill,
    BsFillCreditCardFill,
    BsListCheck,
    BsPinMapFill,
} from "react-icons/bs";
import { FaListAlt, FaMapMarkedAlt } from "react-icons/fa";
import { RiDashboardFill, RiEBikeFill } from "react-icons/ri";
import { BiListCheck } from "react-icons/bi";
import { margin } from "@mui/system";
import { Image } from "@nextui-org/react";
const Sidebar = () => {
    const { user, setUser } = useContext(UserContext);
    const location = useLocation();

    const userRoutes = [
        {
            title: "Place new Order",
            path: "/client/createorder",
            icon: <BsBagPlusFill />,
        },

        {
            title: "My orders",
            path: "/client/order-list",
            icon: <BsCardChecklist />,
        },
    ];

    const adminRoutes = [
        {
            title: "Dashboard",
            path: "#",
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
            path: "#",
            icon: <RiEBikeFill />,
        },

        {
            title: "Extra Charges",
            path: "#",
            icon: <RiDashboardFill />,
        },

        {
            title: "Parcel Type",
            path: "/admin/parcel-types",
            icon: <BsFillBoxSeamFill />,
        },

        {
            title: "Payment gateway",
            path: "#",
            icon: <BsFillCreditCardFill />,
        },

        {
            title: "Create Order",
            path: "/admin/createorder",
            icon: <FaListAlt />,
        },

        {
            title: "All Orders",
            path: "/admin/orders",
            icon: <BsListCheck />,
        },

        {
            title: "Document",
            path: "#",
            icon: <BsFile />,
        },

        {
            title: "Delivery Person Document",
            path: "/",
            icon: <BsFiles />,
        },
    ];

    const deliveryManRoutes = [
        {
            title: "Create Order",
            path: "/delivery_man/createorder",
            icon: <BsBagPlusFill />,
        },

        {
            title: "My orders",
            path: "/client/order-list",
            icon: <BsCardChecklist />,
        },
    ];

    return (
        <aside
            className="main-sidebar elevation-0 sidebar-dark-teal bg-appGreen"
            id="accordionSidebar"
        >
            {/* Sidebar - Brand  */}
            <Link
                to="/"
                className="flex flex-col py-2 justify-center items-center"
            >
                <Image
                    src="/images/ic_app_logo_color.png"
                    width={80}
                    height={40}
                    className="h-24"
                />
                <div className="text-lg text-center pt-2 font-bold no-underline hover:no-underline text-white">
                    {appName}
                </div>
            </Link>
            {/* Divider  */}
            <hr className="bg-white/50 " />

            <div className="sidebar">
                {user?.user_type == "client" ? (
                    <>
                        {/* Heading  */}
                        <div className="py-2 text-center text-white/50">
                            Menu
                        </div>

                        {userRoutes.map((route, index) => (
                            <div key={index}>
                                <div className="text-sm w-full h-full  py-2 mt-2 px-4 hover:no-underline hover:bg-gray-200/25">
                                    <Link
                                        to={route.path}
                                        className={
                                            location.pathname == route.path
                                                ? "flex gap-2 font-bold text-white"
                                                : "flex gap-2 font-light"
                                        }
                                    >
                                        <span className="text-md">
                                            {route.icon}
                                        </span>
                                        {route.title}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </>
                ) : null}

                {user?.user_type == "admin" ? (
                    <>
                        {/* Heading  */}
                        <div className="py-2 text-center text-white/50">
                            Menu
                        </div>

                        {adminRoutes.map((route, index) => (
                            <div key={index}>
                                <div className="text-sm w-full h-full  py-2 mt-2 px-4 hover:no-underline hover:bg-gray-200/25">
                                    <Link
                                        to={route.path}
                                        className={
                                            location.pathname == route.path
                                                ? "flex gap-2 font-bold text-white"
                                                : "flex gap-2 font-light"
                                        }
                                    >
                                        <span className="text-md">
                                            {route.icon}
                                        </span>
                                        {route.title}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </>
                ) : null}

                {/* Nav Item - Pages Collapse Menu  */}

                {/* Divider  */}
            </div>
        </aside>
    );
};

export default Sidebar;
