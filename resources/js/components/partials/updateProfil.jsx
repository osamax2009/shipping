import { Grid, Text, Button, Modal } from "@nextui-org/react";
import { useState, useContext, useEffect } from "react";
import { BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { UserContext } from "../contexts/userContext";
import { postWithAxios } from "../api/axios";

const UpdateProfil = ({ open, setOpen }) => {
    const { user, setUser } = useContext(UserContext);

    const [userInformations, setUserInformations] = useState(user);

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const notifySuccess = (message) =>
        toast(message, {
            hideProgressBar: true,
            type: "success",
        });

    const updateSuccessfull = (user, message) => {
        setOpen(false)
        setUser(user);
        notifySuccess(message);
      //  window.location.reload(true);
    };

    const updateUserInformations = async () => {
        const res = await postWithAxios(
            "/api/update-profile",
            userInformations
        );
      
        if (res.message == "updated successfully") {
            updateSuccessfull(res.data, res.message)
        }

        if (res.message != "updated successfully") {
            setOpen(false)
            toast("Invalid data submitted", {
                hideProgressBar: true,
                type: "error",
            });
        }


    };

    useEffect(() => {
        if(open)
        {
            setUserInformations(user);
        }
    }, [open]);

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            closeButton
            preventClose
           
        >
            <Modal.Header>
                <div className="text-lg">Update profil informations</div>
            </Modal.Header>
            <Modal.Body>
                <div className="w-full ">
                    <div className="mt-6 w-full ">
                        <div>
                            <div className="grid gap-3 w-full ">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
                                    <div className="grid">
                                        <Text
                                            b
                                            className="text-sm ml-4 mb-2 text-gray-500 "
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
                                            className="text-sm ml-4 mb-2 text-gray-500 "
                                        >
                                            {" "}
                                            Username
                                        </Text>
                                        <input
                                        className="form-control"
                                            placeholder={userInformations?.username}
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
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="grid">
                                        <Text
                                            b
                                            className="text-sm ml-4 mb-2 text-gray-500 "
                                        >
                                            Email
                                        </Text>
                                        <input
                                        className="form-control"
                                            placeholder={userInformations?.email}
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
                                    <div className="grid">
                                        <Text
                                            b
                                            className="text-sm ml-4 mb-2 text-gray-500 "
                                        >
                                            Contact
                                        </Text>
                                        <input
                                        className="form-control"
                                            placeholder={userInformations?.contact_number}
                                            value={userInformations?.contact_number}
                                            onChange={(e) =>
                                                setUserInformations({
                                                    ...userInformations,
                                                    contact_number:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="grid w-full">
                                        <Text
                                            b
                                            className="text-sm ml-4 mb-2 text-gray-500 "
                                        >
                                            Address
                                        </Text>
                                        <input
                                        className="form-control"
                                            placeholder={userInformations?.address}
                                            value={userInformations?.address}
                                            onChange={(e) =>
                                                setUserInformations({
                                                    ...userInformations,
                                                    address: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end items-center mt-4 w-full gap-4">
                            <Button
                                auto
                                type={null}
                                color={'success'}
                                onPress={updateUserInformations}
                            >
                                <p className="text-white">Save changes</p>
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateProfil;
