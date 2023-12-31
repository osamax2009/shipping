import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { getWithAxios, postWithAxios } from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import {
    BsCaretDown,
    BsCaretDownFill,
    BsPersonCircle,
    BsPersonFill,
    BsSearch,
} from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { Avatar } from "@nextui-org/react";
import UpdatePassword from "../../partials/changePassword";
import { useState } from "react";
import UpdateLocation from "../../partials/changeLocation";
import DeleteAccount from "../../partials/deleteAccount";
import ThemeSwitcher from "./themeSwitcher";
import Notifications from "./notifications";

const Topbar = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const data = await getWithAxios("/api/logout");

            if (data.message == "Logout successfully") {
                localStorage.removeItem("api_token");
                navigate("/");
                setUser(null);
            }
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <nav className="bg-white w-full dark:bg-slate-800">
            <div className="flex  w-full  pr-4 py-2 justify-between items-center">
                {/* Sidebar Toggle (Topbar) */}
                <ul className="">
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            data-widget="pushmenu"
                            href="#"
                            role="button"
                        >
                            <i className="fas fa-bars text-appGreen"></i>
                        </a>
                    </li>
                </ul>

                {/* Topbar Search */}
                {/* <form className="form-inline">
                <div className="input-group input-group-sm">
                    <input
                        className="form-control form-control-navbar"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <div className="input-group-append">
                        <button className="btn btn-navbar" type="submit">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </form> */}

                {/* right side controls*/}
                <div className="flex gap-8 items-center h-full">
                    {/*  {user?.user_type == "admin" && (
                        <div>
                            <Notifications />
                        </div>
                    )} */}

                    <div>
                        <Notifications />
                    </div>
                    <div>
                        <ThemeSwitcher />
                    </div>
                    <ul className="flex items-center">
                        <div className="topbar-divider d-none d-sm-block"></div>

                        {/* Nav Item - User Information */}
                        <li className="flex items-center cursor-pointer">
                            <a
                                className="flex items-center "
                                data-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <div className="flex items-center gap-2 ">
                                    <Avatar
                                        icon={
                                            <BsPersonFill className="text-appGreen " />
                                        }
                                    />
                                    <span className="text-sm font-bold no-underline hover:no-underline">
                                        {user?.name}{" "}
                                    </span>
                                    <BsCaretDownFill className="text-appGreen" />
                                </div>
                            </a>
                            {/* Dropdown - User Information */}

                            {user?.user_type == "client" && (
                                <UserMenu handleLogout={handleLogout} />
                            )}

                            {user?.user_type == "admin" && (
                                <AdminMenu handleLogout={handleLogout} />
                            )}

                            {user?.user_type == "delivery_man" && (
                                <DeliveryMan handleLogout={handleLogout} />
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Topbar;

const UserMenu = ({ handleLogout }) => {
    const [passModalOpen, setPassModalOpen] = useState(false);
    const [openLocationModal, setOpenLocationModal] = useState(false);
    const [openDeleteAccount, setDeleteAccount] = useState(false);

    const handlePassModal = () => {
        passModalOpen ? setPassModalOpen(false) : setPassModalOpen(true);
    };
    return (
        <div
            className="dropdown-menu gap-4 dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown"
        >
            <Link className="dropdown-item" to={"/client/profile"}>
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Profile
            </Link>

            <Link className="dropdown-item" to={"/client/bank-informations"}>
                <i className="fas fa-credit-card fa-sm fa-fw mr-2 text-gray-400"></i>
                Bank Details
            </Link>

            <button className="dropdown-item" onClick={handlePassModal}>
                <i className="fas fa-lock fa-sm fa-fw mr-2 text-gray-400"></i>
                Change Password
            </button>

            <button
                className="dropdown-item"
                onClick={() => setOpenLocationModal(true)}
            >
                <i className="fas fa-map-marker-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Change Location
            </button>

            {/* <Link className="dropdown-item" to={"#"}>
                <i className="fas fa-globe fa-sm fa-fw mr-2 text-gray-400"></i>
                Language
            </Link>

            <Link className="dropdown-item" to={"#"}>
                <i className="fas fa-sun fa-sm fa-fw mr-2 text-gray-400"></i>
                Theme
            </Link> */}

            <Link className="dropdown-item" to={"/privacypolicy"}>
                <i className="fas fa-file-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Privacy Policy
            </Link>

            <Link className="dropdown-item" to={"/contactus"}>
                <i className="fa fa-question fa-sm fa-fw mr-2 text-gray-400"></i>
                Help & Support
            </Link>

            <Link className="dropdown-item" to={"/term&condition"}>
                <i className="fas fa-file-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Term & Condition
            </Link>

            <Link className="dropdown-item" to={"/aboutus"}>
                <i className="fa fa-info-circle fa-sm fa-fw mr-2 text-gray-400"></i>
                About Us
            </Link>

            <button
                className="dropdown-item"
                onClick={() => setDeleteAccount(true)}
            >
                <i className="fas fa-trash fa-sm fa-fw mr-2 text-gray-400"></i>
                Delete Account
            </button>

            <div className="dropdown-divider"></div>
            <button
                className="dropdown-item "
                onClick={handleLogout}
                data-toggle="modal"
                data-target="#logoutModal"
            >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
            </button>
            <UpdatePassword open={passModalOpen} setOpen={setPassModalOpen} />
            <UpdateLocation
                open={openLocationModal}
                setOpen={setOpenLocationModal}
            />
            <DeleteAccount
                open={openDeleteAccount}
                setOpen={setDeleteAccount}
            />
        </div>
    );
};

const AdminMenu = ({ handleLogout }) => {
    const [passModalOpen, setPassModalOpen] = useState(false);
    const [openLocationModal, setOpenLocationModal] = useState(false);
    const [openDeleteAccount, setDeleteAccount] = useState(false);

    const handlePassModal = () => {
        passModalOpen ? setPassModalOpen(false) : setPassModalOpen(true);
    };
    return (
        <div
            className="dropdown-menu gap-4 dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown"
        >
            <Link className="dropdown-item" to={"/admin/profile"}>
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Profile
            </Link>

            <button className="dropdown-item" onClick={handlePassModal}>
                <i className="fas fa-lock fa-sm fa-fw mr-2 text-gray-400"></i>
                Change Password
            </button>

            {/* <Link className="dropdown-item" to={"#"}>
                <i className="fas fa-globe fa-sm fa-fw mr-2 text-gray-400"></i>
                Language
            </Link>

            <Link className="dropdown-item" to={"#"}>
                <i className="fas fa-sun fa-sm fa-fw mr-2 text-gray-400"></i>
                Theme
            </Link> */}

            <Link className="dropdown-item" to={"/privacypolicy"}>
                <i className="fas fa-file-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Privacy Policy
            </Link>

            <Link className="dropdown-item" to={"/contactus"}>
                <i className="fa fa-question fa-sm fa-fw mr-2 text-gray-400"></i>
                Help & Support
            </Link>

            <Link className="dropdown-item" to={"/term&condition"}>
                <i className="fas fa-file-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Term & Condition
            </Link>

            <Link className="dropdown-item" to={"/aboutus"}>
                <i className="fa fa-info-circle fa-sm fa-fw mr-2 text-gray-400"></i>
                About Us
            </Link>

            <button
                className="dropdown-item"
                onClick={() => setDeleteAccount(true)}
            >
                <i className="fas fa-trash fa-sm fa-fw mr-2 text-gray-400"></i>
                Delete Account
            </button>

            <div className="dropdown-divider"></div>
            <button
                className="dropdown-item "
                onClick={handleLogout}
                data-toggle="modal"
                data-target="#logoutModal"
            >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
            </button>
            <UpdatePassword open={passModalOpen} setOpen={setPassModalOpen} />
            <UpdateLocation
                open={openLocationModal}
                setOpen={setOpenLocationModal}
            />
            <DeleteAccount
                open={openDeleteAccount}
                setOpen={setDeleteAccount}
            />
        </div>
    );
};

const DeliveryMan = ({ handleLogout }) => {
    const [passModalOpen, setPassModalOpen] = useState(false);
    const [openLocationModal, setOpenLocationModal] = useState(false);
    const [openDeleteAccount, setDeleteAccount] = useState(false);

    const handlePassModal = () => {
        passModalOpen ? setPassModalOpen(false) : setPassModalOpen(true);
    };
    return (
        <div
            className="dropdown-menu gap-4 dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown"
        >
            <Link className="dropdown-item" to={"/delivery_man/profile"}>
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Profile
            </Link>

            <button className="dropdown-item" onClick={handlePassModal}>
                <i className="fas fa-lock fa-sm fa-fw mr-2 text-gray-400"></i>
                Change Password
            </button>

            {/* <Link className="dropdown-item" to={"#"}>
                <i className="fas fa-globe fa-sm fa-fw mr-2 text-gray-400"></i>
                Language
            </Link>

            <Link className="dropdown-item" to={"#"}>
                <i className="fas fa-sun fa-sm fa-fw mr-2 text-gray-400"></i>
                Theme
            </Link> */}

            <Link className="dropdown-item" to={"/privacypolicy"}>
                <i className="fas fa-file-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Privacy Policy
            </Link>

            <Link className="dropdown-item" to={"/contactus"}>
                <i className="fa fa-question fa-sm fa-fw mr-2 text-gray-400"></i>
                Help & Support
            </Link>

            <Link className="dropdown-item" to={"/term&condition"}>
                <i className="fas fa-file-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Term & Condition
            </Link>

            <Link className="dropdown-item" to={"/aboutus"}>
                <i className="fa fa-info-circle fa-sm fa-fw mr-2 text-gray-400"></i>
                About Us
            </Link>

            <button
                className="dropdown-item"
                onClick={() => setDeleteAccount(true)}
            >
                <i className="fas fa-trash fa-sm fa-fw mr-2 text-gray-400"></i>
                Delete Account
            </button>

            <div className="dropdown-divider"></div>
            <button
                className="dropdown-item "
                onClick={handleLogout}
                data-toggle="modal"
                data-target="#logoutModal"
            >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
            </button>
            <UpdatePassword open={passModalOpen} setOpen={setPassModalOpen} />
            <UpdateLocation
                open={openLocationModal}
                setOpen={setOpenLocationModal}
            />
            <DeleteAccount
                open={openDeleteAccount}
                setOpen={setDeleteAccount}
            />
        </div>
    );
};
