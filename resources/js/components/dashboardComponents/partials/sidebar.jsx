import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { appName } from "../../shared/constancy";
import { Link, useLocation } from "react-router-dom";
import {
    BsBagPlusFill,
    BsBellFill,
    BsBicycle,
    BsBox,
    BsBox2,
    BsBuilding,
    BsCardChecklist,
    BsEnvelopeOpen,
    BsFile,
    BsFileEarmarkTextFill,
    BsFiles,
    BsFillBoxSeamFill,
    BsFillCreditCardFill,
    BsFillFileEarmarkPersonFill,
    BsFillWalletFill,
    BsListCheck,
    BsPersonCheckFill,
    BsPinMapFill,
    BsWalletFill,
} from "react-icons/bs";
import {
    FaListAlt,
    FaMapMarkedAlt,
    FaMoneyCheckAlt,
    FaUsers,
} from "react-icons/fa";
import { RiDashboardFill, RiEBikeFill } from "react-icons/ri";
import { BiListCheck } from "react-icons/bi";
import { margin } from "@mui/system";
import { Image } from "@nextui-org/react";
import { HiWallet } from "react-icons/hi2";
import { useEffect } from "react";
import { useState } from "react";
const Sidebar = () => {
    const { user, setUser } = useContext(UserContext);

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

        {
            title: "Wallet",
            path: "/client/wallet",
            icon: <BsWalletFill />,
        },
    ];

    const adminRoutes = [
        {
            title: "Dashboard",
            path: "/admin/dashboard",
            icon: <RiDashboardFill />,
        },

        {
            title: "Country",
            path: "/admin/country",
            icon: <BsPinMapFill />,
        },

        {
            title: "City",
            path: "/admin/city",
            icon: <BsBuilding />,
        },

        {
            title: "Vehicles",
            path: "/admin/vehicle",
            icon: <RiEBikeFill />,
        },

        {
            title: "Extra Charges",
            path: "/admin/extracharges",
            icon: <RiDashboardFill />,
        },

        {
            title: "Parcel Type",
            path: "/admin/parcel-types",
            icon: <BsFillBoxSeamFill />,
        },

        {
            title: "Wallet",
            path: "/admin/wallet",
            icon: <BsWalletFill />,
        },

        {
            title: "Payment gateway",
            path: "/admin/paymentgateway",
            icon: <BsFillCreditCardFill />,
        },

        {
            title: "Create Order",
            path: "/admin/createorder",
            icon: <FaListAlt />,
        },

        {
            title: "Orders",
            path: "/admin/orders",
            icon: <BsListCheck />,
        },

        {
            title: "Document",
            path: "/admin/documents",
            icon: <BsFileEarmarkTextFill />,
        },

        {
            title: "Delivery Person Document",
            path: "/admin/deliverypersondocuments",
            icon: <BsFillFileEarmarkPersonFill />,
        },

        {
            title: "Users",
            path: "/admin/users",
            icon: <FaUsers />,
        },

        {
            title: "Delivery Person",
            path: "/admin/deliverypersons",
            icon: <BsPersonCheckFill />,
        },

        {
            title: "Withdraw Request",
            path: "/admin/withdraw",
            icon: <FaMoneyCheckAlt />,
        },

        {
            title: "App Settings",
            path: "/admin/appsetting",
            icon: <BsBellFill />,
        },
    ];

    const deliveryManRoutes = [
        {
            title: "My orders",
            path: "/delivery_man/order-list",
            icon: <BsCardChecklist />,
        },
        {
            title: "Create Order",
            path: "/delivery_man/createorder",
            icon: <BsBagPlusFill />,
        },

        {
            title: "Drafts",
            path: "/delivery_man/drafts",
            icon: <BsEnvelopeOpen />,
        },

        {
            title: "Wallet",
            path: "/delivery_man/wallet",
            icon: <BsWalletFill />,
        },

        {
            title: "Earning history",
            path: "/delivery_man/earning-history",
            icon: <HiWallet />,
        },

        {
            title: "Verify Document",
            path: "/delivery_man/verify-document",
            icon: <BsFiles />,
        },

        /*  {
            title: "My orders",
            path: "/delivery_man/order-list",
            icon: <BsCardChecklist />,
        }, */
    ];

    return (
        <aside
            className="main-sidebar elevation-0 sidebar-dark-teal bg-appGreen pb-6 dark:bg-slate-900"
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
                            <NavigateButton key={index} route={route} />
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
                            <NavigateButton key={index} route={route} />
                        ))}
                    </>
                ) : null}

                {user?.user_type == "delivery_man" ? (
                    <>
                        {/* Heading  */}
                        <div className="py-2 text-center text-white/50">
                            Menu
                        </div>

                        {deliveryManRoutes.map((route, index) => (
                            <NavigateButton key={index} route={route} />
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

const NavigateButton = ({ route }) => {

    const [isCurrent, setIsCurrent] = useState(false)
    const location = useLocation();

    const setLocationToLocalStorage = () => {
        localStorage.setItem("currentRoute", route.path)
    }

    useEffect(() => {      
        route.path == localStorage.getItem("currentRoute") ? setIsCurrent(true) : setIsCurrent(false)
    },[location])

    return ( <div >
        <div onMouseDown={setLocationToLocalStorage} className="text-sm w-full h-full  py-2 mt-2 px-4 hover:no-underline hover:bg-gray-200/25">
            <Link
                to={route.path}
                className={
                   isCurrent
                        ? "flex gap-2 font-bold text-white"
                        : "flex gap-2 font-light"
                }
            >
                <span className="text-md">{route.icon}</span>
                {route.title}
            </Link>
        </div>
    </div>)
};
