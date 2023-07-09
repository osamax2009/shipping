import { Grid, Text, Button, Modal } from "@nextui-org/react";
import { useState, useContext, useEffect } from "react";
import { BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../contexts/userContext";
import { getWithAxios, postWithAxios } from "../api/axios";
import LocationSetter from "./locationSetter";
import PhoneInput from "react-phone-input-2";

const UpdateProfil = ({ open, setOpen }) => {
    const { user, setUser } = useContext(UserContext);

    const [userInformations, setUserInformations] = useState(user);
    const [city, setCity] = useState(user?.city_id);
    const [country, setCountry] = useState(user?.country_id);
    const [location, setLocation] = useState(user?.address);

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const notifySuccess = (message) =>
        toast(message, {
            hideProgressBar: true,
            type: "success",
        });

    const updateSuccessfull = (user, message) => {
        setOpen(false);
        setUser(user);
        notifySuccess(message);
        //  window.location.reload(true);
    };

    const updateUserInformations = async () => {
        let data = userInformations
        delete data['login_type']
        delete data['profile_image']

        const res = await postWithAxios(
            "/api/update-profile",
            data
        );

        if (res.message == "updated successfully") {
            updateSuccessfull(res.data, res.message);
        }

        if (res.message != "updated successfully") {
            setOpen(false);
            toast(res.message, {
                hideProgressBar: true,
                type: "error",
            });
        }
    };

    useEffect(() => {
        if (open) {
            setUserInformations(user);
            setCity(user?.city_id);
            setCountry(user?.country_id);
            setLocation(user?.address)
        }
    }, [open]);

    useEffect(() => {
        setUserInformations({
            ...userInformations,
            city_id: city,
            country_id: country,
            address: location,
        });
    }, [country, city, location]);

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            closeButton
            preventClose
        >
            <Modal.Header>
                <div className="text-lg">Update profil</div>
            </Modal.Header>
            <Modal.Body>
                <div className="w-full h-[70vh] ">
                    <div className="mt-6 w-full ">
                        <div>
                            <div className="grid gap-3 w-full ">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="grid">
                                        <Text
                                            b
                                            className="font-bold  mb-1 text-gray-500 "
                                        >
                                            {" "}
                                            Name
                                        </Text>
                                        <input
                                            className="form-control"
                                            value={userInformations?.name}
                                            onChange={(e) =>
                                                setUserInformations({
                                                    ...userInformations,
                                                    name: e.target.value,
                                                })
                                            }
                                            aria-label={"Name"}
                                            color={"primary"}
                                        />
                                    </div>
                                    <div className="grid">
                                        <Text
                                            b
                                            className="font-bold  mb-1 text-gray-500 "
                                        >
                                            {" "}
                                            Username
                                        </Text>
                                        <input
                                            className="form-control"
                                            placeholder={
                                                userInformations?.username
                                            }
                                            aria-label={"prenoms"}
                                            value={userInformations?.username}
                                            onChange={(e) =>
                                                setUserInformations({
                                                    ...userInformations,
                                                    username: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <CountryAndCity
                                    city={city}
                                    setCity={setCity}
                                    country={country}
                                    setCountry={setCountry}
                                />
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="grid">
                                        <Text
                                            b
                                            className="font-bold  mb-1 text-gray-500 "
                                        >
                                            Email
                                        </Text>
                                        <input
                                            className="form-control"
                                            placeholder={
                                                userInformations?.email
                                            }
                                            aria-label={"email"}
                                            color={"primary"}
                                            value={userInformations?.email}
                                            onChange={(e) =>
                                                setUserInformations({
                                                    ...userInformations,
                                                    email: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="grid relative">
                                        <Text
                                            b
                                            className="font-bold  mb-1 text-gray-500 "
                                        >
                                            Contact
                                        </Text>
                                        <PhoneInput
                                            className="appearance-none"
                                            forceCallingCode
                                            defaultCountry="ca"
                                            placeholder={
                                                userInformations?.contact_number
                                            }
                                            value={
                                                userInformations?.contact_number
                                            }
                                            onChange={(e) =>
                                                setUserInformations({
                                                    ...userInformations,
                                                    contact_number: e,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="grid w-full mt-2">
                                        <Text
                                            b
                                            className="font-bold  mb-1 text-gray-500 "
                                        >
                                            Address
                                        </Text>

                                        <LocationSetter
                                            cityName={location}
                                            setCityName={setLocation}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex justify-end items-center mt-4 w-full gap-4">
                    <Button
                        auto
                        type={null}
                        color={"success"}
                        onPress={updateUserInformations}
                    >
                        <p className="text-white">Save changes</p>
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateProfil;

const CountryAndCity = ({ country, setCountry, city, setCity }) => {
    const [cities, setCities] = useState(null);
    const [countries, setCountries] = useState(null);

    const getCountries = async () => {
        const res = await getWithAxios("/api/country-list");
        setCountries(res.data);
    };

    const getCities = async () => {
        if (country) {
            const res = await getWithAxios("/api/city-list", {
                country_id: country,
            });
            setCities(res.data);
        } else {
            const res = await getWithAxios("/api/city-list");
            setCities(res.data);
        }
    };

    useEffect(() => {
        getCountries();
        getCities();
    }, []);

    useEffect(() => {}, []);

    return (
        <div className="grid gap-4 font-bold md:grid-cols-2">
            <div className="grid">
                <div>Country </div>
                <div>
                    <select
                        className="form-control w-full"
                        value={country}
                        label="Age"
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        {countries?.map((country, index) => (
                            <option key={index} value={country.id}>
                                {" "}
                                {country.name}{" "}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid">
                <div>City </div>
                <div>
                    <select
                        className="form-control w-full"
                        value={city}
                        label="Age"
                        onChange={(e) => setCity(e.target.value)}
                    >
                        {cities?.map((city, index) => (
                            <option key={index} value={city.id}>
                                {" "}
                                {city.name}{" "}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};
