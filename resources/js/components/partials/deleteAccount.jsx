import { Button, Grid, Modal, Text } from "@nextui-org/react";
import { useContext, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { postWithAxios } from "../api/axios";
import { ToastContainer } from "react-toastify";

const DeleteAccount = ({ open, setOpen }) => {
    const { user, setUser } = useContext(UserContext);

    const [errors, setErrors] = useState();

    const navigate = useNavigate();

    const notifySuccess = () =>
        toast("Password updated successfully", {
            hideProgressBar: true,
            type: "success",
        });

    const deleteAccount = async () => {
        const data = {
            id: user?.id,
        };

        const res = await postWithAxios("/api/delete-user", data);

        if (res.message) {
            setOpen(false);
            toast(res.message, {
                hideProgressBar: true,
                type: "infos",
            });

            window.location.reload();
        }
    };

    /* const returnBack = () => {
        navigate("/backoffice/mon_compte/informations_utilisateur");
    }; */

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            closeButton
            preventClose
        >
            <Modal.Header>
                <div className="text-md font-bold text-lg">Delete Account</div>
            </Modal.Header>
            <Modal.Body>
                <div className="w-full font-bold text-lg">
                    <div className=" w-full rounded-[20px]  p-4 ">
                        <div className="grid gap-8">
                            <div>
                                You are about to delete your account.
                                <span className="text-red-700"> Confirm ?</span>
                            </div>
                        </div>
                        <div className="flex justify-end items-center mt-4 w-full gap-4">
                            <Button
                                auto
                                type={null}
                                color={"error"}
                                onPress={deleteAccount}
                            >
                                <p className="text-white">Yes, delete</p>
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default DeleteAccount;
