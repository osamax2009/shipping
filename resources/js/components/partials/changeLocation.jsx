import { Grid, Text, Button, Modal } from "@nextui-org/react";
import { useState, useContext, useEffect } from "react";
import { BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { UserContext } from "../contexts/userContext";
import { postWithAxios } from "../api/axios";
import LocationSetter from "./locationSetter";

const UpdateLocation = ({ open, setOpen }) => {
    const { user, setUser } = useContext(UserContext);
    const [userInformations, setUserInformations] = useState(user);
    const [cityName, setCityName] = useState();

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
        setCityName(null)
    };

    const updateUserInformations = async () => {
        const dataToSend = {
            id : user?.id,
            address : cityName
        }
        const res = await postWithAxios(
            "/api/update-profile",
            dataToSend
        );

        if (res.message == "updated successfully") {
            updateSuccessfull(res.data, res.message);
        }

        if (res.message != "updated successfully") {
            setOpen(false);
            toast("Invalid data submitted", {
                hideProgressBar: true,
                type: "error",
            });
        }
    };

  

   

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            closeButton
            preventClose
        >
            <Modal.Header>
                <div className="text-lg">Change Location</div>
            </Modal.Header>
            <Modal.Body>
                <div className="w-full h-[66vh] ">
                    <div className="mt-6 w-full ">
                        <div>
                            <div className="grid gap-3 w-full ">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="grid">
                                        <Text
                                            b
                                            className="text-sm ml-4 mb-2 text-gray-500 "
                                        >
                                            Current Location
                                        </Text>
                                        <input
                                            className="form-control"
                                            aria-label={"email"}
                                            color={"primary"}
                                            value={user?.address}
                                            disabled
                                            
                                        />
                                    </div>

                                    <div className="grid w-full">
                                        <Text
                                            b
                                            className="text-sm ml-4 mb-2 text-gray-500 "
                                        >
                                            New Location
                                        </Text>
                                        <LocationSetter
                                            cityName={cityName}
                                            setCityName={setCityName}
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

export default UpdateLocation;
