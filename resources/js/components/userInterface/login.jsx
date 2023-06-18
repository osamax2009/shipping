import { useContext, useEffect, useRef, useState } from "react";
import {
    postWithAxios,
    getCsrfToken,
    checkLogStatus,
    getUserFromAPI,
} from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { ToastContainer, toast } from "react-toastify";
import { appName } from "../shared/constancy";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [passType, setPassType] = useState("password");
    const [errors, setErrors] = useState({});
    const passInput = useRef(null);
    const emailInput = useRef(null);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [sidebar, setsidebar] = useState();

    const handleLogin = async (e) => {
        e.preventDefault();
        await getCsrfToken();

        const dataToSend = {
            email: email,
            password: password,
        };
        const data = await postWithAxios("/api/login", dataToSend);

        if (data.message) {
            toast(data.message, {
                type: "error",
                hideProgressBar: true,
            });
            setErrors(data);
        }

        if (data.data.email) {
            localStorage.setItem("api_token", data.data.api_token);

            setUser(data.data);

            if (data.data.user_type == "client") {
                toast("connected successfully", {
                    type: "success",
                    hideProgressBar: true,
                });
                navigate("/");
            }

            if (data.data.user_type == "admin") {
                toast("connected successfully", {
                    type: "success",
                    hideProgressBar: true,
                });
                navigate("/account/admin/dashboard");
            }
        }
    };

    const handlePassHidden = () => {
       passType == "password" ? setPassType("text") : setPassType('password')
    }

    const checkUserStatus = async () => {
        const isConnected = await getUserFromAPI();

        if (isConnected.email) {
            navigate("/");
        }
    };

    useEffect(() => {
        document.title = appName + " - Login";
    }, []);

    useEffect(() => {
        checkUserStatus();
    }, []);

    useEffect(() => {
        if (errors.email) {
            emailInput.current.classList.add("is-invalid");
        } else {
            emailInput.current.classList.remove("is-invalid");
        }
    }, [errors]);

    useEffect(() => {
        if (errors.password) {
            passInput.current.classList.add("is-invalid");
        } else {
            passInput.current.classList.remove("is-invalid");
        }
    }, [errors]);

    return (
        <div className="h-full bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
            <div className="flex flex-col items-center justify-center">
                <div className="flex  items-center gap-3 h-8">
                    <img src="/images/ic_app_logo_color.png" alt="app logo"  className="-h-8"/>
                    <div className="text-white text-2xl ">
                        {appName}
                    </div>
                </div>
                <form onSubmit={handleLogin} className="w-full">
                    <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
                        <p
                            tabIndex={0}
                            role="heading"
                            aria-label="Login to your account"
                            className="text-2xl font-extrabold leading-6 text-gray-800"
                        >
                            Login to your account
                        </p>
                        <p className="text-sm mt-4 font-medium leading-none text-gray-500">
                            Dont have account?{" "}
                            <Link to={"/account/register"}
                                tabIndex={0}
                                role="link"
                                aria-label="Sign up here"
                                className="text-sm ml-2 font-medium leading-none underline text-gray-800 cursor-pointer"
                            >
                                {" "}
                                Sign up here
                            </Link>
                        </p>

                        <div className="w-full flex items-center justify-between py-5">
                            <hr className="w-full bg-gray-400" />
                            <p className="text-center w-full font-medium leading-4 px-2.5 text-gray-400">
                                {appName}
                            </p>
                            <hr className="w-full bg-gray-400  " />
                        </div>
                        <div>
                            <lable className="text-sm font-medium leading-none text-gray-800">
                                Email
                            </lable>
                            <input
                                value={email}
                                ref={emailInput}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                aria-label="enter email adress"
                                role="input"
                                type="email"
                                className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                            />
                        </div>
                        <div className="mt-6  w-full">
                            <lable className="text-sm font-medium leading-none text-gray-800">
                                Password
                            </lable>
                            <div className="relative flex items-center justify-center">
                                <input
                                    value={password}
                                    ref={passInput}
                                    onChange={(e) =>
                                        setpassword(e.target.value)
                                    }
                                    required
                                    aria-label="enter Password"
                                    role="input"
                                    type={passType}
                                    className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                />
                                <div onMouseDown={handlePassHidden} className="absolute right-0 mt-2 mr-3 cursor-pointer">
                                    <svg
                                        width={16}
                                        height={16}
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                                            fill="#71717A"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <button
                                role="button"
                                aria-label="login my account"
                                className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
                            >
                               Login 
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;


