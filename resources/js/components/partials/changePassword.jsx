import { Button, Grid, Modal, Text } from "@nextui-org/react";
import { useContext, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { postWithAxios } from "../api/axios";
import { ToastContainer } from "react-toastify";

const UpdatePassword = ({ open, setOpen }) => {
    const { user, setUser } = useContext(UserContext);

    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();

    const [errors, setErrors] = useState();

    const navigate = useNavigate();

    const getPassword = (e) => {
        const value = e.target.value;
        setPassword(value);
    };

    const getNewPassword = (e) => {
        const value = e.target.value;
        setNewPassword(value);
    };

    const notifySuccess = () =>
        toast("Password updated successfully", {
            hideProgressBar: true,
            type: "success",
        });

   

    const UpdatePassword = async () => {
        const data = {
            old_password: password,
            new_password: newPassword
        };

        
        const res = await postWithAxios("/api/change-password", data);


        if (res.message == "Your password has been changed successfully!") {
            setOpen(false)
            notifySuccess();
            window.location.reload()
        }

        if(res.message)
        {
            setErrors(res)
            toast(res.message, {
                hideProgressBar: true,
                type: "error",
            });
        }

        
    };

    const returnBack = () => {
        navigate("/backoffice/mon_compte/informations_utilisateur");
    };

    return (
        <Modal open={open} onClose={() => setOpen(false)} closeButton preventClose >
            <Modal.Header>
                <div className="text-md">Update my account password</div>
            </Modal.Header>
            <Modal.Body>
                <div className="w-full ">
                    <div className="mt-6 w-full rounded-[20px]  p-4 ">
                        <div className="grid gap-8">
                            <div className="text-red-600">
                                {errors?.message}
                               
                            </div>
                            <div className="grid">
                                <Text
                                    b
                                    className="text-sm mb-2 text-black "
                                >
                                    {" "}
                                    New password
                                </Text>
                                <input
                                    className="form-control"
                                    placeholder={"new password"}
                                    onChange={getNewPassword}
                                    aria-label={"Nom"}
                                    color={"primary"}
                                    helperText={errors?.newPassword}
                                    helperColor="error"
                                    type={"password"}
                                />
                            </div>

                            <div className="grid">
                                <Text
                                    b
                                    className="text-sm mb-2 text-black "
                                >
                                    {" "}
                                    Confirm with current password{" "}
                                </Text>
                                <input
                                    className="form-control"
                                    placeholder={"current password"}
                                    onChange={getPassword}
                                    aria-label={"password"}
                                    color={"primary"}
                                    helperText={errors?.password}
                                    helperColor="error"
                                    type={"password"}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end items-center mt-4 w-full gap-4">
                           
                            <Button
                                auto
                                flat
                                type={null}
                                css={{ background: "#BF7B2A" }}
                                onPress={UpdatePassword}
                            >
                                <p className="text-white">Update password</p>
                            </Button>
                        </div>
                    </div>
                    
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default UpdatePassword;
