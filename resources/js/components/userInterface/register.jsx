import { useContext, useEffect, useRef, useState } from "react";
import {
    postWithAxios,
    getCsrfToken,
    checkLogStatus,
    getWithAxios,
} from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import PhoneInput from "react-phone-input-2";
import { appName } from "../shared/constancy";
import { forEach } from "lodash";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
    const [countries, setCountries] = useState(null);
    const [cities, setCities] = useState(null);

    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [contact, setContact] = useState("");
    const [errors, setErrors] = useState({});

    const passInput = useRef(null);
    const emailInput = useRef(null);
    const nameInput = useRef(null);
    const userNameInput = useRef(null);
    const addressInput = useRef(null);
    const countryInput = useRef(null);
    const cityInput = useRef(null);
    const contactInput = useRef(null);

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const getCountries = async () => {
        const { data } = await getWithAxios("/api/country-list");

        if (data) {
            setCountries(data);
        }
    };

    const getCities = async () => {
        const { data } = await getWithAxios("/api/city-list");

        if (data) {
            setCities(data);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const token = await getCsrfToken();

        const dataToSend = {
            name: name,
            username: username,
            email: email,
            password: password,
            user_type: "client",
            contact_number: "4564552664",
            country_id: country,
            city: city,
            address: address,
        };

        const data = await postWithAxios("/api/register", dataToSend);

        if (data.all_message) {
            toast("incorrect data submited", {
                type: "error",
                hideProgressBar: true,
            });
            setErrors(data.all_message);
        }

        if (data.data) {
            toast(data.message, {
                type: "success",
                hideProgressBar: true,
            });

            navigate("/");
        }
    };

    useEffect(() => {
        document.title = appName + " - Register";
    }, []);

    useEffect(() => {
        getCountries();
    }, []);

    useEffect(() => {
        getCities();
    }, []);

    useEffect(() => {
        if (errors.email) {
            emailInput.current.classList.add("is-invalid");
        } else {
            emailInput.current.classList.remove("is-invalid");
        }
    }, [errors]);

    return (
        <div className="min-h-screen bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
            <div className="grid h-full lg:grid-cols-2">
                <div className="py-6">
                    <div className="flex  items-center gap-3 h-8">
                        <img
                            src="/images/ic_app_logo_color.png"
                            alt="app logo"
                            className="h-16"
                        />
                        <div className="text-white text-2xl ">{appName}</div>
                    </div>
                </div>
                <div className=" bg-white p-5 h-full">
                    <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">
                            Create an Account!
                        </h1>
                    </div>
                    <form onSubmit={handleRegister} className="grid gap-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className=" form-group">
                                <input
                                    required
                                    ref={nameInput}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    placeholder="name"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    required
                                    ref={userNameInput}
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    type="text"
                                    className="form-control"
                                    placeholder="username"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <input
                                required
                                type="text"
                                value={email}
                                ref={emailInput}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className=" form-group">
                                <PhoneInput
                                    ref={contactInput}
                                    country={"ca"}
                                    inputProps={{
                                        required: true,
                                    }}
                                    value={contact}
                                    onChange={(e) => setContact(e)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    required
                                    type="text"
                                    ref={addressInput}
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="form-control"
                                    id="exampleRepeatPassword"
                                    placeholder="address"
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className=" form-group">
                                <select
                                    required
                                    type="text"
                                    ref={countryInput}
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="form-control"
                                    placeholder="country"
                                >
                                    {countries?.map((country, index) => (
                                        <option key={index} value={country.id}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <select
                                    required
                                    type="text"
                                    ref={cityInput}
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="form-control"
                                    placeholder="city"
                                >
                                    {cities?.map((city, index) => (
                                        <option key={index} value={city.id}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <input
                                required
                                type="password"
                                value={password}
                                ref={passInput}
                                onChange={(e) => setpassword(e.target.value)}
                                className="form-control"
                                placeholder="password"
                            />
                        </div>

                        <button className="btn btn-primary btn-block">
                            Register Account
                        </button>
                        
                    </form>
                    <hr />
                    <div className="text-center">
                        {/* <Link className="small">Forgot Password?</Link> */}
                    </div>
                    <div className="text-center">
                        <Link className="small" to={"/account/sign-in"}>
                            Already have an account? Login!
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
