import { Grid, Text, Button, Modal } from "@nextui-org/react";
import { useState, useContext, useEffect } from "react";
import { BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { UserContext } from "../contexts/userContext";
import { getWithAxios, postWithAxios } from "../api/axios";
import { truncate } from "lodash";

const BankProfil = () => {
    const [userInformations, setUserInformations] = useState();
    const [openModal, setOpenModal] = useState();
    const { user, setUser } = useContext(UserContext);

    const getUserDetail = async () => {
        const res = await getWithAxios("/api/user-detail", { id: user?.id });

        setUserInformations(res.data.user_bank_account);
    };

    useEffect(() => {
        if(!openModal)
        {
            getUserDetail();
        }
    }, [openModal]);

    return (
        <div>
            <div className="flex justify-center w-full ">
                <div className="my-4 mx-2 md:w-1/2 lg:w-2/3">
                    <div className="">
                        <div className="grid gap-3 w-full ">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="grid">
                                    <Text
                                        b
                                        className="text-sm ml-4 mb-2 text-gray-500 "
                                    >
                                        {" "}
                                        Bank Name
                                    </Text>
                                    <input
                                        className="form-control"
                                        placeholder={
                                            userInformations?.bank_name
                                        }
                                        disabled
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
                                        Bank Code
                                    </Text>
                                    <input
                                        className="form-control"
                                        aria-label={"prenoms"}
                                        value={userInformations?.bank_code}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="grid">
                                    <Text
                                        b
                                        className="text-sm ml-4 mb-2 text-gray-500 "
                                    >
                                        Account Holder Name
                                    </Text>
                                    <input
                                        className="form-control"
                                        aria-label={"email"}
                                        color={"primary"}
                                        value={
                                            userInformations?.account_holder_name
                                        }
                                        disabled
                                    />
                                </div>
                                <div className="grid">
                                    <Text
                                        b
                                        className="text-sm ml-4 mb-2 text-gray-500 "
                                    >
                                        Account Number
                                    </Text>
                                    <input
                                        className="form-control"
                                        value={userInformations?.account_number}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end items-center mt-4 w-full gap-4">
                        <Button
                            auto
                            type={null}
                            color={"success"}
                            onPress={() => setOpenModal(true)}
                        >
                            <p className="text-white">
                                Update Bank Informations
                            </p>
                        </Button>
                    </div>
                </div>
            </div>
            <UpdateBankProfil
                open={openModal}
                setOpen={setOpenModal}
                user={user}
                bankProfil={userInformations}
            />
        </div>
    );
};

export default BankProfil;

const UpdateBankProfil = ({ open, setOpen, bankProfil, user }) => {
    const [userInformations, setUserInformations] = useState(bankProfil);

    const notifySuccess = (message) =>
        toast(message, {
            hideProgressBar: true,
            type: "success",
        });

    const updateSuccessfull = (message) => {
        setOpen(false);
        notifySuccess(message);
        //  window.location.reload(true);
    };

    const updateUserInformations = async () => {
        const dataToSend = {
            user_id: user?.id,
            email: user?.email,
            username: user?.username,
            contact_number: user?.contact_number,
            user_bank_account: {
                bank_name: userInformations.bank_name,
                bank_code: userInformations.bank_code,
                account_holder_name: userInformations.account_holder_name,
                account_number: userInformations.account_number,
            },
        };
        const res = await postWithAxios("/api/update-profile", dataToSend);

        if (res.message == "updated successfully") {
            updateSuccessfull(res.message);
        }

        if (res.message != "updated successfully") {
            setOpen(false);
            toast("Invalid data submitted", {
                hideProgressBar: true,
                type: "error",
            });
        }
    };

    useEffect(() => {
        if (open) {
            setUserInformations(bankProfil);
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
                <div className="text-lg">Update Bank informations</div>
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
                                            Bank Name
                                        </Text>
                                        <input
                                            className="form-control"
                                            value={userInformations?.bank_name}
                                            onChange={(e) =>
                                                setUserInformations({
                                                    ...userInformations,
                                                    bank_name: e.target.value,
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
                                            Bank Code
                                        </Text>
                                        <input
                                            className="form-control"
                                            aria-label={"prenoms"}
                                            value={userInformations?.bank_code}
                                            onChange={(e) =>
                                                setUserInformations({
                                                    ...userInformations,
                                                    bank_code: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
                                    <div className="grid">
                                        <Text
                                            b
                                            className="text-sm ml-4 mb-2 text-gray-500 "
                                        >
                                            Account Holder Name
                                        </Text>
                                        <input
                                            className="form-control"
                                            placeholder={
                                                userInformations?.account_holder_name
                                            }
                                            aria-label={"email"}
                                            color={"primary"}
                                            value={
                                                userInformations?.account_holder_name
                                            }
                                            onChange={(e) =>
                                                setUserInformations({
                                                    ...userInformations,
                                                    account_holder_name:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="grid">
                                        <Text
                                            b
                                            className="text-sm ml-4 mb-2 text-gray-500 "
                                        >
                                            Account Number
                                        </Text>
                                        <input
                                            className="form-control"
                                            placeholder={
                                                userInformations?.account_number
                                            }
                                            value={
                                                userInformations?.account_number
                                            }
                                            onChange={(e) =>
                                                setUserInformations({
                                                    ...userInformations,
                                                    account_number:
                                                        e.target.value,
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
                                color={"success"}
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
