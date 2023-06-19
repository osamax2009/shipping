import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsMenuApp, BsMenuButton, BsPersonCircle } from "react-icons/bs";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { Avatar, Button, Dropdown, Image } from "@nextui-org/react";
import { UserContext } from "../../../contexts/userContext";
import { getWithAxios } from "../../../api/axios";

const Navbar = () => {
    const [color, setColor] = useState(false);
    const [hidden, setHidden] = useState(true);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleColor = () => {
        if (window.scrollY >= 100) {
            setColor(true);
        } else {
            setColor(false);
        }
    };

    const handleMobileMenu = () => {
        hidden ? setHidden(false) : setHidden(true);
    };

    const handleLogin = () => {
        navigate("/account/register");
    };

    const handleLogout = async () => {
    
        try {
            const data = await getWithAxios("/api/logout");
            console.log("logout response", data);
            if (data.message == "Logout successfully") {
                navigate("/");
                setUser(null);
            }
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleColor);
    }, []);

    return (
        <>
            <div className="fixed z-40 w-screen transition ease-in">
                {user?.user_type}
                <div
                    className={
                        !color
                            ? "flex gap-24 items-center bg-[#4caf50] px-8 w-full h-[90px]"
                            : "flex gap-24 items-center bg-white px-8 w-full h-[90px] drop-shadow-lg"
                    }
                >
                    <Link href={"/"}>
                        <div>
                            {!color ? (
                                <Image
                                    src={"/images/ic_app_logo_color.png"}
                                    className="h-8"
                                    alt="Logo"
                                />
                            ) : (
                                <Image
                                    src="/images/ic_app_logo_color.png"
                                    className="h-8  transition ease-in"
                                    alt="Logo"
                                />
                            )}
                        </div>
                    </Link>
                    {/* Desktop menu */}
                    <div className="hidden md:flex justify-end pr-8 items-center w-full gap-8 h-24">
                        <div>
                            {!user?.email && (
                                <Button
                                    css={{ background: "#ff5722" }}
                                    className="text-black"
                                    auto
                                    onPress={handleLogin}
                                >
                                    create account
                                </Button>
                            )}
                        </div>

                        {/* Nav Item - User Information */}

                        <div className="">
                            {user?.email && (
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <div className="flex items-center gap-4">
                                            <span
                                                className={
                                                    !color
                                                        ? "text-white"
                                                        : "text-black"
                                                }
                                            >
                                                {user?.email}
                                            </span>
                                            <Avatar
                                                css={{
                                                    background:
                                                        "rgb(25,25, 25)",
                                                }}
                                                icon={<BsPersonCircle />}
                                                className="text-2xl text-appGreen"
                                                size={"lg"}
                                            />
                                        </div>
                                    </Dropdown.Trigger>
                                    <Dropdown.Menu color="success">
                                        <Dropdown.Item key={"logout"} >
                                            <button
                                                onClick={handleLogout}
                                                className="w-full"
                                                typeof="link"
                                            >
                                                logout
                                            </button>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}
                        </div>

                        <div>
                            {user?.email ? (
                                <Link
                                    css={{ background: "#ffffff" }}
                                    className={
                                        !color ? "text-white" : "text-black"
                                    }
                                    auto
                                    to={"/account/dashboard/place-new-order"}
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    css={{ background: "#ffffff" }}
                                    className={
                                        !color ? "text-white" : "text-black"
                                    }
                                    auto
                                    to={"/account/sign-in"}
                                >
                                    Log in
                                </Link>
                            )}
                        </div>
                    </div>
                    {/* Mobile menu */}
                    <div className="w-full md:hidden">
                        <div className="flex justify-end">
                            <button onClick={handleMobileMenu}>
                                {hidden ? (
                                    <HiBars3CenterLeft
                                        className={
                                            !color
                                                ? "text-4xl text-white"
                                                : "text-4xl text-[#DB8E8E]"
                                        }
                                    />
                                ) : (
                                    <IoClose
                                        className={
                                            !color
                                                ? "text-4xl text-white"
                                                : "text-4xl text-[#DB8E8E]"
                                        }
                                    />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={
                    hidden
                        ? "hidden"
                        : "fixed top-0 left-0 bottom-0 w-[80vw] z-40 animate-slideInLeft shadow-lg bg-white text-black md:hidden"
                }
            >
                <div className="py-12 px-6 grid gap-4">
                    <div>
                        {!user?.email && (
                            <Button
                                css={{ background: "#ff5722" }}
                                className="text-black"
                                auto
                                onPress={handleLogin}
                            >
                                create account
                            </Button>
                        )}
                    </div>

                    {/* Nav Item - User Information */}

                    <div className="">
                        {user?.email && (
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <div className="flex items-center gap-4">
                                        <Avatar
                                            css={{
                                                background: "rgb(25,25, 25)",
                                            }}
                                            icon={<BsPersonCircle />}
                                            className="text-2xl text-appGreen"
                                            size={"lg"}
                                        />

                                        <span
                                            className={
                                                !color
                                                    ? "text-black"
                                                    : "text-black"
                                            }
                                        >
                                            {user?.email}
                                        </span>
                                    </div>
                                </Dropdown.Trigger>
                                <Dropdown.Menu color="success">
                                    <Dropdown.Item key={"logout"}>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full"
                                            
                                        >
                                            logout
                                        </button>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </div>

                    <div>
                        {user?.email ? (
                            <Link
                                css={{ background: "#ffffff" }}
                                className={!color ? "text-black" : "text-black"}
                                auto
                                to={"/account/dashboard/place-new-order"}
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                css={{ background: "#ffffff" }}
                                className={!color ? "text-black" : "text-black"}
                                auto
                                to={"/account/sign-in"}
                            >
                                Log in
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
